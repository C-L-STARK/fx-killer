//+------------------------------------------------------------------+
//|                                           FXKiller_DataSync.mq5  |
//|                                  Copyright 2024, FX Killer Team  |
//|                                       https://www.fxkiller.com   |
//+------------------------------------------------------------------+
#property copyright "Copyright 2024, FX Killer Team"
#property link      "https://www.fxkiller.com"
#property version   "1.00"

//--- Input Parameters
input string SupabaseURL = "https://wlksiulicosdnerzhkdl.supabase.co"; // Supabase Project URL
input string SupabaseKey = "YOUR_SERVICE_ROLE_KEY_HERE"; // Supabase Service Role Key
input string APIEndpoint = "/rest/v1/rpc/upsert_trading_order"; // RPC Endpoint for smart upsert
input int MagicNumber = 0; // Magic Number (0 = all orders)
input bool EnableLogging = true; // Enable Detailed Logging

//--- Global Variables
ulong g_tracked_tickets[];
int g_tracked_count = 0;
int g_tick_counter = 0; // Counter to reduce check frequency

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   Print("FXKiller DataSync EA Started (MT5)");
   Print("Supabase URL: ", SupabaseURL);
   Print("Account: ", AccountInfoInteger(ACCOUNT_LOGIN));
   
   // Initial scan of existing orders
   ScanExistingOrders();
   
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   Print("FXKiller DataSync EA Stopped. Reason: ", reason);
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   // Check every 10 ticks to reduce load
   g_tick_counter++;
   if(g_tick_counter < 10)
      return;
   
   g_tick_counter = 0;
   
   // Check for new orders
   CheckForNewOrders();
   
   // Check for closed orders
   CheckForClosedOrders();
}

//+------------------------------------------------------------------+
//| OnTrade event - called when trade operations are performed      |
//+------------------------------------------------------------------+
void OnTrade()
{
   // More efficient than checking on every tick
   CheckForNewOrders();
   CheckForClosedOrders();
}

//+------------------------------------------------------------------+
//| Scan existing orders and sync them                               |
//+------------------------------------------------------------------+
void ScanExistingOrders()
{
   int total = PositionsTotal();
   
   for(int i = 0; i < total; i++)
   {
      ulong ticket = PositionGetTicket(i);
      
      if(ticket > 0)
      {
         if(MagicNumber == 0 || PositionGetInteger(POSITION_MAGIC) == MagicNumber)
         {
            if(!IsTicketTracked(ticket))
            {
               SendOrderOpen(ticket);
               AddTrackedTicket(ticket);
            }
         }
      }
   }
}

//+------------------------------------------------------------------+
//| Check for new orders                                             |
//+------------------------------------------------------------------+
void CheckForNewOrders()
{
   int total = PositionsTotal();
   
   for(int i = 0; i < total; i++)
   {
      ulong ticket = PositionGetTicket(i);
      
      if(ticket > 0)
      {
         if(MagicNumber == 0 || PositionGetInteger(POSITION_MAGIC) == MagicNumber)
         {
            if(!IsTicketTracked(ticket))
            {
               SendOrderOpen(ticket);
               AddTrackedTicket(ticket);
            }
         }
      }
   }
}

//+------------------------------------------------------------------+
//| Check for closed orders                                          |
//+------------------------------------------------------------------+
void CheckForClosedOrders()
{
   HistorySelect(TimeCurrent() - 86400 * 7, TimeCurrent()); // Last 7 days
   int total = HistoryDealsTotal();
   
   for(int i = total - 1; i >= 0 && i >= total - 50; i--) // Check last 50 history deals
   {
      ulong ticket = HistoryDealGetTicket(i);
      
      if(ticket > 0)
      {
         ulong position_id = HistoryDealGetInteger(ticket, DEAL_POSITION_ID);
         
         if(IsTicketTracked(position_id))
         {
            ENUM_DEAL_ENTRY entry = (ENUM_DEAL_ENTRY)HistoryDealGetInteger(ticket, DEAL_ENTRY);
            
            if(entry == DEAL_ENTRY_OUT || entry == DEAL_ENTRY_OUT_BY)
            {
               SendOrderClose(position_id, ticket);
               RemoveTrackedTicket(position_id);
            }
         }
      }
   }
}

//+------------------------------------------------------------------+
//| Send order open data to Supabase                                 |
//+------------------------------------------------------------------+
void SendOrderOpen(ulong ticket)
{
   if(!PositionSelectByTicket(ticket))
      return;
   
   string json = BuildOrderJSON(ticket, false, 0);
   string url = SupabaseURL + APIEndpoint;
   
   if(EnableLogging)
      Print("Sending OPEN order: ", ticket);
   
   SendHTTPRequest(url, json, "POST", false); // false = insert mode
}

//+------------------------------------------------------------------+
//| Send order close data to Supabase                                |
//+------------------------------------------------------------------+
void SendOrderClose(ulong position_id, ulong deal_ticket)
{
   if(!HistoryDealSelect(deal_ticket))
      return;
   
   string json = BuildOrderJSON(position_id, true, deal_ticket);
   // Use POST with upsert instead of PATCH for better MT5 compatibility
   string url = SupabaseURL + APIEndpoint;
   
   if(EnableLogging)
      Print("Sending CLOSE order: ", position_id);
   
   SendHTTPRequest(url, json, "POST", true); // true = upsert mode
}

//+------------------------------------------------------------------+
//| Convert MT5 time to ISO 8601 format                              |
//+------------------------------------------------------------------+
string TimeToISO(long time)
{
   // Convert YYYY.MM.DD HH:MM:SS to YYYY-MM-DD HH:MM:SS
   string timeStr = TimeToString((datetime)time, TIME_DATE|TIME_SECONDS);
   StringReplace(timeStr, ".", "-");
   return timeStr;
}

//+------------------------------------------------------------------+
//| Build JSON payload for order                                     |
//+------------------------------------------------------------------+
string BuildOrderJSON(ulong position_id, bool is_closed, ulong deal_ticket)
{
   string order_type;
   string status;
   string broker = AccountInfoString(ACCOUNT_COMPANY);
   
   if(is_closed && deal_ticket > 0)
   {
      // For closed orders, get type from deal
      long deal_type = HistoryDealGetInteger(deal_ticket, DEAL_TYPE);
      order_type = (deal_type == DEAL_TYPE_BUY) ? "BUY" : "SELL";
      
      // Check if it was a pending order
      long deal_entry = HistoryDealGetInteger(deal_ticket, DEAL_ENTRY);
      long deal_reason = HistoryDealGetInteger(deal_ticket, DEAL_REASON);
      
      // If deal was cancelled or deleted, mark as CANCELLED
      if(deal_reason == DEAL_REASON_CANCEL)
      {
         status = "CANCELLED";
      }
      else
      {
         status = "CLOSED";
      }
   }
   else
   {
      // For open positions, get type from position
      long pos_type = PositionGetInteger(POSITION_TYPE);
      order_type = (pos_type == POSITION_TYPE_BUY) ? "BUY" : "SELL";
      status = "OPEN";
   }
   
   string json = "{";
   json += "\"platform\":\"MT5\",";
   json += "\"account_number\":\"" + IntegerToString(AccountInfoInteger(ACCOUNT_LOGIN)) + "\",";
   json += "\"broker\":\"" + broker + "\",";
   json += "\"ticket_id\":" + IntegerToString(position_id) + ",";
   json += "\"symbol\":\"" + PositionGetString(POSITION_SYMBOL) + "\",";
   json += "\"order_type\":\"" + order_type + "\",";
   json += "\"lots\":" + DoubleToString(PositionGetDouble(POSITION_VOLUME), 2) + ",";
   json += "\"open_price\":" + DoubleToString(PositionGetDouble(POSITION_PRICE_OPEN), 5) + ",";
   json += "\"open_time\":\"" + TimeToISO((datetime)PositionGetInteger(POSITION_TIME)) + "\",";
   json += "\"stop_loss\":" + DoubleToString(PositionGetDouble(POSITION_SL), 5) + ",";
   json += "\"take_profit\":" + DoubleToString(PositionGetDouble(POSITION_TP), 5) + ",";
   json += "\"magic_number\":" + IntegerToString(PositionGetInteger(POSITION_MAGIC)) + ",";
   json += "\"comment\":\"" + PositionGetString(POSITION_COMMENT) + "\",";
   json += "\"status\":\"" + status + "\"";
   
   if(is_closed && deal_ticket > 0)
   {
      json += ",\"close_price\":" + DoubleToString(HistoryDealGetDouble(deal_ticket, DEAL_PRICE), 5);
      json += ",\"close_time\":\"" + TimeToISO((datetime)HistoryDealGetInteger(deal_ticket, DEAL_TIME)) + "\"";
      json += ",\"commission\":" + DoubleToString(HistoryDealGetDouble(deal_ticket, DEAL_COMMISSION), 2);
      json += ",\"swap\":" + DoubleToString(HistoryDealGetDouble(deal_ticket, DEAL_SWAP), 2);
      json += ",\"profit\":" + DoubleToString(HistoryDealGetDouble(deal_ticket, DEAL_PROFIT), 2);
   }
   
   json += "}";
   
   return json;
}

//+------------------------------------------------------------------+
//| Send HTTP Request to Supabase RPC                                |
//+------------------------------------------------------------------+
void SendHTTPRequest(string url, string json, string method, bool upsert = false)
{
   char post[];
   char result[];
   string headers;
   
   // Prepare headers for RPC call
   headers = "Content-Type: application/json\r\n";
   headers += "apikey: " + SupabaseKey + "\r\n";
   headers += "Authorization: Bearer " + SupabaseKey + "\r\n";
   headers += "Prefer: return=representation\r\n";
   
   // Wrap JSON in order_data parameter for RPC function
   string rpc_payload = "{\"order_data\":" + json + "}";
   
   // Convert JSON to char array
   StringToCharArray(rpc_payload, post, 0, WHOLE_ARRAY, CP_UTF8);
   ArrayResize(post, ArraySize(post) - 1); // Remove null terminator
   
   // Reset last error
   ResetLastError();
   
   // Send request with reduced timeout
   int timeout = 2000; // Reduced to 2 seconds
   int res = WebRequest(method, url, headers, timeout, post, result, headers);
   
   if(res == -1)
   {
      int error = GetLastError();
      Print("WebRequest Error: ", error);
      Print("Make sure URL is added to allowed list in Tools->Options->Expert Advisors");
      Print("URL: ", url);
   }
   else if(EnableLogging)
   {
      Print("Request sent successfully. Response code: ", res);
      if(ArraySize(result) > 0)
      {
         string response = CharArrayToString(result, 0, WHOLE_ARRAY, CP_UTF8);
         Print("Response: ", response);
      }
   }
}

//+------------------------------------------------------------------+
//| Get order type as string                                         |
//+------------------------------------------------------------------+
string GetOrderTypeString(ENUM_POSITION_TYPE type)
{
   switch(type)
   {
      case POSITION_TYPE_BUY: return "BUY";
      case POSITION_TYPE_SELL: return "SELL";
      default: return "UNKNOWN";
   }
}

//+------------------------------------------------------------------+
//| Check if ticket is being tracked                                 |
//+------------------------------------------------------------------+
bool IsTicketTracked(ulong ticket)
{
   for(int i = 0; i < g_tracked_count; i++)
   {
      if(g_tracked_tickets[i] == ticket)
         return true;
   }
   return false;
}

//+------------------------------------------------------------------+
//| Add ticket to tracked list                                       |
//+------------------------------------------------------------------+
void AddTrackedTicket(ulong ticket)
{
   ArrayResize(g_tracked_tickets, g_tracked_count + 1);
   g_tracked_tickets[g_tracked_count] = ticket;
   g_tracked_count++;
}

//+------------------------------------------------------------------+
//| Remove ticket from tracked list                                  |
//+------------------------------------------------------------------+
void RemoveTrackedTicket(ulong ticket)
{
   for(int i = 0; i < g_tracked_count; i++)
   {
      if(g_tracked_tickets[i] == ticket)
      {
         // Shift array
         for(int j = i; j < g_tracked_count - 1; j++)
         {
            g_tracked_tickets[j] = g_tracked_tickets[j + 1];
         }
         g_tracked_count--;
         ArrayResize(g_tracked_tickets, g_tracked_count);
         break;
      }
   }
}
//+------------------------------------------------------------------+

//+------------------------------------------------------------------+
//|                                           FXKiller_DataSync.mq4  |
//|                                  Copyright 2024, FX Killer Team  |
//|                                       https://www.fxkiller.com   |
//+------------------------------------------------------------------+
#property copyright "Copyright 2024, FX Killer Team"
#property link      "https://www.fxkiller.com"
#property version   "1.00"
#property strict

//--- Input Parameters
input string SupabaseURL = "https://wlksiulicosdnerzhkdl.supabase.co"; // Supabase Project URL
input string SupabaseKey = "YOUR_SERVICE_ROLE_KEY_HERE"; // Supabase Service Role Key
input string APIEndpoint = "/rest/v1/rpc/upsert_trading_order"; // RPC Endpoint for smart upsert
input int MagicNumber = 0; // Magic Number (0 = all orders)
input bool EnableLogging = true; // Enable Detailed Logging

//--- Global Variables
int TickCounter = 0;
int SentOpenOrders[];      // Array to track sent open orders
int SentClosedOrders[];    // Array to track sent closed orders
string g_tracked_tickets[];
int g_tracked_count = 0;
int g_tick_counter = 0; // Counter to reduce check frequency

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   Print("FXKiller DataSync EA Started");
   Print("Supabase URL: ", SupabaseURL);
   Print("Account: ", AccountNumber());
   
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
   // Check every 10 ticks to reduce load (about once per second in active market)
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
//| Scan existing orders and sync them                               |
//+------------------------------------------------------------------+
void ScanExistingOrders()
{
   int total = OrdersTotal();
   
   for(int i = 0; i < total; i++)
   {
      if(OrderSelect(i, SELECT_BY_POS, MODE_TRADES))
      {
         if(MagicNumber == 0 || OrderMagicNumber() == MagicNumber)
         {
            int ticket = OrderTicket();
            
            if(!IsTicketTracked(ticket))
            {
               // Send order data to Supabase
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
   int total = OrdersTotal();
   
   for(int i = 0; i < total; i++)
   {
      if(OrderSelect(i, SELECT_BY_POS, MODE_TRADES))
      {
         if(MagicNumber == 0 || OrderMagicNumber() == MagicNumber)
         {
            int ticket = OrderTicket();
            
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
   int total = OrdersHistoryTotal();
   
   for(int i = total - 1; i >= 0 && i >= total - 50; i--) // Check last 50 history orders
   {
      if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY))
      {
         if(MagicNumber == 0 || OrderMagicNumber() == MagicNumber)
         {
            int ticket = OrderTicket();
            
            if(IsTicketTracked(ticket))
            {
               SendOrderClose(ticket);
               RemoveTrackedTicket(ticket);
            }
         }
      }
   }
}

//+------------------------------------------------------------------+
//| Check if order was already sent                                  |
//+------------------------------------------------------------------+
bool IsOrderSent(int ticket, bool is_closed)
{
   int arr[];
   if(is_closed)
      ArrayCopy(arr, SentClosedOrders);
   else
      ArrayCopy(arr, SentOpenOrders);
   
   for(int i = 0; i < ArraySize(arr); i++)
   {
      if(arr[i] == ticket)
         return true;
   }
   return false;
}

//+------------------------------------------------------------------+
//| Mark order as sent                                               |
//+------------------------------------------------------------------+
void MarkOrderAsSent(int ticket, bool is_closed)
{
   if(is_closed)
   {
      int size = ArraySize(SentClosedOrders);
      ArrayResize(SentClosedOrders, size + 1);
      SentClosedOrders[size] = ticket;
   }
   else
   {
      int size = ArraySize(SentOpenOrders);
      ArrayResize(SentOpenOrders, size + 1);
      SentOpenOrders[size] = ticket;
   }
}

//+------------------------------------------------------------------+
//| Send order open data to Supabase                                 |
//+------------------------------------------------------------------+
void SendOrderOpen(int ticket)
{
   if(!OrderSelect(ticket, SELECT_BY_TICKET))
      return;
   
   // Skip if already sent
   if(IsOrderSent(ticket, false))
      return;
   
   string json = BuildOrderJSON(ticket, false);
   string url = SupabaseURL + APIEndpoint;
   
   if(EnableLogging)
      Print("Sending OPEN order: ", ticket);
   
   SendHTTPRequest(url, json, "POST", false); // false = insert mode
   MarkOrderAsSent(ticket, false);
}

//+------------------------------------------------------------------+
//| Send order close data to Supabase                                |
//+------------------------------------------------------------------+
void SendOrderClose(int ticket)
{
   if(!OrderSelect(ticket, SELECT_BY_TICKET, MODE_HISTORY))
      return;
   
   // Skip if already sent
   if(IsOrderSent(ticket, true))
      return;
   
   string json = BuildOrderJSON(ticket, true);
   // Use POST with upsert instead of PATCH for better MT4 compatibility
   string url = SupabaseURL + APIEndpoint;
   
   if(EnableLogging)
      Print("Sending CLOSE order: ", ticket);
   
   SendHTTPRequest(url, json, "POST", true); // true = upsert mode
   MarkOrderAsSent(ticket, true);
}

//+------------------------------------------------------------------+
//| Convert MT4 time to ISO 8601 format                              |
//+------------------------------------------------------------------+
string TimeToISO(datetime time)
{
   // Convert YYYY.MM.DD HH:MM:SS to YYYY-MM-DD HH:MM:SS
   string timeStr = TimeToString(time, TIME_DATE|TIME_SECONDS);
   StringReplace(timeStr, ".", "-");
   return timeStr;
}

//+------------------------------------------------------------------+
//| Build JSON payload for order                                     |
//+------------------------------------------------------------------+
string BuildOrderJSON(int ticket, bool is_closed)
{
   string order_type = GetOrderTypeString(OrderType());
   string broker = AccountCompany();
   
   // Determine status: CANCELLED for deleted pending orders, CLOSED for executed orders
   string status;
   if(is_closed)
   {
      // Check if it's a pending order type
      bool is_pending = (OrderType() == OP_BUYLIMIT || OrderType() == OP_SELLLIMIT || 
                         OrderType() == OP_BUYSTOP || OrderType() == OP_SELLSTOP);
      
      // If pending order and profit/commission/swap are all 0, it was cancelled (not executed)
      if(is_pending && OrderProfit() == 0 && OrderCommission() == 0 && OrderSwap() == 0)
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
      status = "OPEN";
   }
   
   string json = "{";
   json += "\"platform\":\"MT4\",";
   json += "\"account_number\":\"" + IntegerToString(AccountNumber()) + "\",";
   json += "\"broker\":\"" + broker + "\",";
   json += "\"ticket_id\":" + IntegerToString(ticket) + ",";
   json += "\"symbol\":\"" + OrderSymbol() + "\",";
   json += "\"order_type\":\"" + order_type + "\",";
   json += "\"lots\":" + DoubleToString(OrderLots(), 2) + ",";
   json += "\"open_price\":" + DoubleToString(OrderOpenPrice(), 5) + ",";
   json += "\"open_time\":\"" + TimeToISO(OrderOpenTime()) + "\",";
   json += "\"stop_loss\":" + DoubleToString(OrderStopLoss(), 5) + ",";
   json += "\"take_profit\":" + DoubleToString(OrderTakeProfit(), 5) + ",";
   json += "\"magic_number\":" + IntegerToString(OrderMagicNumber()) + ",";
   json += "\"comment\":\"" + OrderComment() + "\",";
   json += "\"status\":\"" + status + "\"";
   
   if(is_closed)
   {
      json += ",\"close_price\":" + DoubleToString(OrderClosePrice(), 5);
      json += ",\"close_time\":\"" + TimeToISO(OrderCloseTime()) + "\"";
      json += ",\"commission\":" + DoubleToString(OrderCommission(), 2);
      json += ",\"swap\":" + DoubleToString(OrderSwap(), 2);
      json += ",\"profit\":" + DoubleToString(OrderProfit(), 2);
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
   int timeout = 2000; // Reduced to 2 seconds to avoid blocking
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
string GetOrderTypeString(int type)
{
   switch(type)
   {
      case OP_BUY: return "BUY";
      case OP_SELL: return "SELL";
      case OP_BUYLIMIT: return "BUY_LIMIT";
      case OP_SELLLIMIT: return "SELL_LIMIT";
      case OP_BUYSTOP: return "BUY_STOP";
      case OP_SELLSTOP: return "SELL_STOP";
      default: return "UNKNOWN";
   }
}

//+------------------------------------------------------------------+
//| Check if ticket is being tracked                                 |
//+------------------------------------------------------------------+
bool IsTicketTracked(int ticket)
{
   for(int i = 0; i < g_tracked_count; i++)
   {
      if(StringToInteger(g_tracked_tickets[i]) == ticket)
         return true;
   }
   return false;
}

//+------------------------------------------------------------------+
//| Add ticket to tracked list                                       |
//+------------------------------------------------------------------+
void AddTrackedTicket(int ticket)
{
   ArrayResize(g_tracked_tickets, g_tracked_count + 1);
   g_tracked_tickets[g_tracked_count] = IntegerToString(ticket);
   g_tracked_count++;
}

//+------------------------------------------------------------------+
//| Remove ticket from tracked list                                  |
//+------------------------------------------------------------------+
void RemoveTrackedTicket(int ticket)
{
   string ticket_str = IntegerToString(ticket);
   
   for(int i = 0; i < g_tracked_count; i++)
   {
      if(g_tracked_tickets[i] == ticket_str)
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

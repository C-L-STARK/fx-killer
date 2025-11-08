// Economic Calendar Types

export type EventImportance = 'high' | 'medium' | 'low';

export interface EconomicEvent {
  id: string;
  date: string;
  time: string;
  country: string;
  countryCode: string; // ISO 2-letter code for flag
  currency: string;
  event: string;
  importance: EventImportance;
  actual: string | null;
  forecast: string | null;
  previous: string | null;
  impact?: string; // Positive/Negative/Neutral
}

export interface CalendarDay {
  date: string;
  events: EconomicEvent[];
}

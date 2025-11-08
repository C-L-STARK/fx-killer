// API Route to fetch economic calendar data
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

interface RawEconomicEvent {
  title: string;
  country: string;
  date: string;
  impact: string;
  forecast: string;
  previous: string;
}

export async function GET() {
  try {
    const response = await fetch('https://nfs.faireconomy.media/ff_calendar_thisweek.json', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch calendar data');
    }

    const data: RawEconomicEvent[] = await response.json();

    // Transform data to our format
    const transformedData = data
      .filter(event => event.impact !== 'Holiday') // Filter out holidays
      .map((event, index) => ({
        id: `event-${index}`,
        event: event.title,
        country: mapCountryCode(event.country),
        countryCode: event.country,
        currency: event.country,
        date: new Date(event.date).toISOString().split('T')[0],
        time: new Date(event.date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        importance: mapImpact(event.impact),
        forecast: event.forecast || null,
        previous: event.previous || null,
        actual: null
      }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching economic calendar:', error);
    return NextResponse.json(
      { error: 'Failed to fetch economic calendar data' },
      { status: 500 }
    );
  }
}

function mapCountryCode(code: string): string {
  const countryMap: Record<string, string> = {
    'USD': 'United States',
    'EUR': 'Eurozone',
    'GBP': 'United Kingdom',
    'JPY': 'Japan',
    'CHF': 'Switzerland',
    'CAD': 'Canada',
    'AUD': 'Australia',
    'NZD': 'New Zealand',
    'CNY': 'China',
  };
  return countryMap[code] || code;
}

function mapImpact(impact: string): 'high' | 'medium' | 'low' {
  const normalized = impact.toLowerCase();
  if (normalized === 'high') return 'high';
  if (normalized === 'medium') return 'medium';
  return 'low';
}

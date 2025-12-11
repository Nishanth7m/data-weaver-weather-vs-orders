'use client';

import type { ChartDataPoint } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThermometerSun } from 'lucide-react';
import { WeatherCardSkeleton } from './skeletons';

interface WeatherSummaryCardProps {
  data: ChartDataPoint[];
  isLoading: boolean;
  city: string;
}

export default function WeatherSummaryCard({ data, isLoading, city }: WeatherSummaryCardProps) {
  const averageTemp = data.length > 0 ? data.reduce((sum, row) => sum + row.temperature, 0) / data.length : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Summary</CardTitle>
        <CardDescription>Simulated, not real weather.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <WeatherCardSkeleton />
          </div>
        ) : (
          <div className="space-y-4">
            {averageTemp !== null ? (
              <>
                <div className="flex items-center gap-4">
                  <ThermometerSun className="w-10 h-10 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">{city}</p>
                    <p className="text-2xl font-bold">{averageTemp.toFixed(1)}°C</p>
                    <p className="text-xs text-muted-foreground">Avg. for selected period</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pt-4">
                  Note: Temperature is deterministically simulated based on city and date. No external APIs are used.
                </p>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>No weather data to display.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

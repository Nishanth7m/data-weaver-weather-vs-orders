'use client';

import type { ChartDataPoint } from '@/types';
import { Bar, BarChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { ChartSkeleton } from './skeletons';

const chartConfig = {
  orders: {
    label: 'Orders',
    color: 'hsl(var(--primary))',
  },
  temperature: {
    label: 'Temperature',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

interface OrdersWeatherChartProps {
  data: ChartDataPoint[];
  isLoading: boolean;
}

export default function OrdersWeatherChart({ data, isLoading }: OrdersWeatherChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders vs. Temperature</CardTitle>
        <CardDescription>A dual-axis chart comparing total daily orders and simulated temperature.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <ChartSkeleton /> : 
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke={chartConfig.orders.color}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={chartConfig.temperature.color}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<ChartTooltipContent 
                indicator="dot"
                labelFormatter={(label, payload) => {
                  if (payload && payload.length) {
                    return new Date(payload[0].payload.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  }
                  return label;
                }}
              />}
            />
            <Legend />
            <Bar dataKey="temperature" yAxisId="right" fill={chartConfig.temperature.color} name="Temperature (°C)" radius={4} />
            <Line
              dataKey="orders"
              yAxisId="left"
              type="monotone"
              stroke={chartConfig.orders.color}
              strokeWidth={2}
              dot={{
                fill: chartConfig.orders.color,
              }}
              activeDot={{
                r: 6,
              }}
            />
          </BarChart>
        </ChartContainer>
        }
      </CardContent>
    </Card>
  );
}

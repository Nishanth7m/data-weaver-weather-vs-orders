'use client';

import type { ChartDataPoint } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableSkeleton } from './skeletons';

interface OrdersTableCardProps {
  data: ChartDataPoint[];
  isLoading: boolean;
}

export default function OrdersTableCard({ data, isLoading }: OrdersTableCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order and Weather Data</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <ScrollArea className="h-[300px] w-full">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Sim. Temp (°C)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((row) => (
                    <TableRow key={row.order_id}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell className="text-right">{row.orders}</TableCell>
                      <TableCell className="text-right">{row.temperature.toFixed(1)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No data available for the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export function PageSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <header>
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="h-5 w-1/3 mt-2" />
      </header>

      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid w-full max-w-xs items-center gap-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      <Skeleton className="h-px w-full" />
      
      <ChartSkeleton />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <TableSkeleton />
        </div>
        <div>
          <WeatherCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-80 mt-2" />
            </CardHeader>
            <CardContent>
                <div className="min-h-[300px] w-full flex items-center justify-center">
                    <Skeleton className="h-64 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export function TableSkeleton() {
  return (
     <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function WeatherCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
            </CardContent>
        </Card>
    );
}

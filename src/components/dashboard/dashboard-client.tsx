'use client';

import { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import type { Order, ChartDataPoint } from '@/types';
import { simulateTemperature } from '@/ai/flows/simulate-temperature';
import { PageSkeleton } from './skeletons';
import FiltersCard from './filters-card';
import OrdersWeatherChart from './orders-weather-chart';
import OrdersTableCard from './orders-table-card';
import WeatherSummaryCard from './weather-summary-card';
import { Separator } from '@/components/ui/separator';

export default function DashboardClient() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<string[]>([]);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch('/data/mock_orders.csv');
        const text = await response.text();
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        
        const ordersData: Order[] = (result.data as any[]).map(r => ({
          order_id: Number(r.order_id),
          city: r.city,
          date: r.date,
          orders: Number(r.orders),
        }));

        setAllOrders(ordersData);

        const uniqueCities = [...new Set(ordersData.map(o => o.city))].sort();
        setCities(uniqueCities);
        
        if (uniqueCities.length > 0) {
          setSelectedCity(uniqueCities[0]);
        }
        
        const dates = ordersData.map(r => r.date).sort();
        if (dates.length) {
          setStartDate(dates[0]);
          setEndDate(dates[dates.length - 1]);
        }

      } catch (error) {
        console.error("Failed to load or parse CSV:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredOrders = useMemo(() => {
    if (!selectedCity) return [];
    return allOrders
      .filter(o => 
        o.city === selectedCity &&
        (!startDate || o.date >= startDate) &&
        (!endDate || o.date <= endDate)
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [allOrders, selectedCity, startDate, endDate]);

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (filteredOrders.length === 0) {
      setChartData([]);
      return;
    }
    
    const simulateAllTemperatures = async () => {
      setIsSimulating(true);
      const dataWithTemps = await Promise.all(
        filteredOrders.map(async (order) => {
          try {
            const { temperature } = await simulateTemperature({ city: order.city, date: order.date });
            return { ...order, temperature };
          } catch(e) {
            console.error("Failed to simulate temperature", e);
            return {...order, temperature: 0};
          }
        })
      );
      setChartData(dataWithTemps);
      setIsSimulating(false);
    };

    simulateAllTemperatures();
  }, [filteredOrders]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Weaver</h1>
        <p className="text-muted-foreground">Orders vs. Simulated Weather Analysis</p>
      </header>

      <FiltersCard 
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <Separator />

      <OrdersWeatherChart data={chartData} isLoading={isSimulating} />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <OrdersTableCard data={chartData} isLoading={isSimulating} />
        </div>
        <div>
          <WeatherSummaryCard data={chartData} isLoading={isSimulating} city={selectedCity}/>
        </div>
      </div>
    </div>
  );
}

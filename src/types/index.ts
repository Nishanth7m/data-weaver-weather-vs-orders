export type Order = {
  order_id: number;
  city: string;
  date: string;
  orders: number;
};

export type ChartDataPoint = Order & {
  temperature: number;
};

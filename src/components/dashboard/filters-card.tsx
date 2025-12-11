'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface FiltersCardProps {
  cities: string[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export default function FiltersCard({
  cities,
  selectedCity,
  setSelectedCity,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: FiltersCardProps) {
  return (
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="grid flex-1 items-center gap-1.5">
          <Label htmlFor="city">City</Label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger id="city" className="w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full md:w-auto items-center gap-1.5">
          <Label htmlFor="start-date">Start Date</Label>
          <Input 
            type="date" 
            id="start-date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="grid w-full md:w-auto items-center gap-1.5">
          <Label htmlFor="end-date">End Date</Label>
          <Input 
            type="date" 
            id="end-date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
  );
}
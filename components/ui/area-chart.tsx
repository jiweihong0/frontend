'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface DataPoint {
  [key: string]: string | number;
}

interface AreaChartProps {
  title: string;
  data: DataPoint[];
  areas: Array<{
    dataKey: string;
    stroke: string;
    fill: string;
    name: string;
  }>;
  xAxisDataKey?: string;
}

export function CustomAreaChart({
  title,
  data,
  areas,
  xAxisDataKey = "name"
}: AreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {areas.map((area, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={area.dataKey}
                  stroke={area.stroke}
                  fill={area.fill}
                  fillOpacity={0.3}
                  name={area.name}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 
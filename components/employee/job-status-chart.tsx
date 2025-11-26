"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { JobStatusBreakdown } from "@/types/employee-dashboard";

const COLORS = {
  open: "hsl(var(--chart-1))",
  closed: "hsl(var(--chart-2))",
  filled: "hsl(var(--chart-3))",
};

interface JobStatusChartProps {
  data: JobStatusBreakdown[] | undefined;
}

export function JobStatusChart({ data }: JobStatusChartProps) {
  const chartData = data?.map((item) => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Status Breakdown</CardTitle>
        <CardDescription>Distribution of job postings by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

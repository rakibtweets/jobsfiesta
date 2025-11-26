"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApplicationStatusBreakdown } from "@/types/employee-dashboard";

interface ApplicationStatusChartProps {
  data: ApplicationStatusBreakdown[] | undefined;
}

export function ApplicationStatusChart({ data }: ApplicationStatusChartProps) {
  const chartData = data?.map((item) => ({
    name: item._id
      .split(/(?=[A-Z])/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    count: item?.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status Distribution</CardTitle>
        <CardDescription>Breakdown of all applications by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

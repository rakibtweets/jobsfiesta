"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmployeeBarChartData } from "@/types/employee-dashboard";

interface ApplicationsPerJobChartProps {
  data: EmployeeBarChartData[] | undefined;
}

export function ApplicationsPerJobChart({ data }: ApplicationsPerJobChartProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Applications per Job</CardTitle>
        <CardDescription>Number of applications received for each job posting</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jobTitle" angle={-45} textAnchor="end" height={100} interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

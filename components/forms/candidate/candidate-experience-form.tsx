"use client";

import { type } from "os";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const experienceSchema = z.object({
  experiences: z.object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    startDate: z
      .date({
        error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
      })
      .optional(),
    endDate: z
      .date({
        error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
      })
      .optional(),
    description: z.string().optional(),
  }),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

const defaultExperiences: ExperienceFormValues = {
  experiences: {
    position: "",
    company: "",
    startDate: undefined,
    endDate: undefined,
    description: "",
  },
};

export function CandidateExperienceForm() {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: defaultExperiences,
  });

  const onSubmit = (data: ExperienceFormValues) => {
    console.log(data.experiences);
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-green-400/50">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`experiences.position`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Position</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experiences.company`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Company</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`experiences.startDate`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Start Date</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`experiences.endDate`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">End Date</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 space-y-2">
            <FormField
              control={form.control}
              name={`experiences.description`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your responsibilities and achievements..."
                      className="border-border/50 bg-card/50 hover:border-border focus:ring-ring min-h-20 w-full resize-none rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" size="sm">
              <Save size={14} /> Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-red-600/30 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

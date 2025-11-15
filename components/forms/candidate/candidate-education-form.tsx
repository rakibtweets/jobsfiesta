"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const educationSchema = z.object({
  education: z.object({
    school: z.string().min(1, "School/University is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    graduationYear: z.string().min(4, "Graduation year is required"),
  }),
});

type EducationFormValues = z.infer<typeof educationSchema>;

const defaultEducation: EducationFormValues = {
  education: {
    school: "",
    degree: "",
    fieldOfStudy: "",
    graduationYear: "",
  },
};

export function CandidateEducationForm() {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: defaultEducation,
  });

  const onSubmit = (data: EducationFormValues) => {
    console.log("Form data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-purple-400/50">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`education.school`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">School/University</FormLabel>
                  <FormControl>
                    <input
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
              name={`education.degree`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Degree</FormLabel>
                  <FormControl>
                    <input
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
              name={`education.fieldOfStudy`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Field of Study</FormLabel>
                  <FormControl>
                    <input
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
              name={`education.graduationYear`}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-foreground text-sm font-semibold">Graduation Year</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="number"
                      className="bg-card/50 border-border/50 hover:border-border focus:ring-ring w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
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
            <Button type="button" size="sm" variant="destructive">
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

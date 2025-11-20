"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EducationFormValues, educationSchema } from "@/lib/validations/candidate.validate";

type Education = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear?: string | undefined;
};
interface IEducationFromProps {
  type: "add" | "edit";
  education?: Education;
}

export function CandidateEducationForm({ type, education }: IEducationFromProps) {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: education?.institution || "",
      degree: education?.degree || "",
      fieldOfStudy: education?.fieldOfStudy || "",
      graduationYear: education?.graduationYear || "",
    },
  });

  const onSubmit = async (data: EducationFormValues) => {
    console.log("Form data:", data);
    if (type == "add") {
      //todo: add data
    } else {
      //todo: update data
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-purple-400/50">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name={`institution`}
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
              name={`degree`}
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
              name={`fieldOfStudy`}
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
              name={`graduationYear`}
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
            <Button type="submit" size="default">
              <Save size={14} /> Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

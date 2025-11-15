"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email(),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(1, "Bio is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: ProfileFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
};

export function CandidateProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstName" className="text-foreground font-semibold">
                  First Name
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    id="firstName"
                    className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastName" className="text-foreground font-semibold">
                  Last Name
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    id="lastName"
                    className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email" className="text-foreground flex items-center gap-2 font-semibold">
                  <Mail size={16} /> Email
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    id="email"
                    type="email"
                    className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone" className="text-foreground flex items-center gap-2 font-semibold">
                  <Phone size={16} /> Phone
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    id="phone"
                    className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="location" className="text-foreground font-semibold">
                Location
              </FormLabel>
              <FormControl>
                <input
                  {...field}
                  id="location"
                  className="bg-card/50 border-border/50 hover:border-border focus:ring-ring mt-1 w-full rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="bio" className="text-foreground font-semibold">
                Professional Bio
              </FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  id="bio"
                  className="border-border/50 bg-card/50 hover:border-border focus:ring-ring mt-1 min-h-24 w-full resize-none rounded-md border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full shadow-lg transition-all hover:opacity-90 hover:shadow-xl sm:w-auto">
          <Save size={16} className="mr-2" /> Save Changes
        </Button>
      </form>
    </Form>
  );
}

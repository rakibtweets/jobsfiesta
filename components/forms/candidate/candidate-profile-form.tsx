"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocationSelector from "@/components/ui/location-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { genders } from "@/constants/data";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email(),
  phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  gender: z.string(),
  dateOfBirth: z.date().optional(),
  location: z.tuple([
    z.string().min(1, { message: "Country is required" }),
    z.string().optional(), // State name, optional
  ]),
  bio: z.string().min(1, "Bio is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultValues: ProfileFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: undefined,
  location: ["", undefined],
  bio: "",
};

export function CandidateProfileForm() {
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit = (data: ProfileFormValues) => {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
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
                  <Input
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
                  <Input
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectGroup>
                      {genders.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <DateInput value={field.value} onChange={field.onChange} />
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
                  <Input
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
                  <PhoneInput
                    international
                    defaultCountry="BD"
                    className="py-2"
                    placeholder="Enter a phone number"
                    {...field}
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
                Location(Country,State)
              </FormLabel>
              <FormControl>
                <FormItem className="flex flex-col flex-wrap">
                  <LocationSelector
                    onCountryChange={(country) => {
                      setCountryName(country?.name || "");
                      form.setValue(field.name, [country?.name || "", stateName || ""]);
                    }}
                    onStateChange={(state) => {
                      setStateName(state?.name || "");
                      form.setValue(field.name, [countryName || "", state?.name || ""]);
                    }}
                  />
                  <FormDescription>Please select state after selecting your country</FormDescription>
                  <FormMessage />
                </FormItem>
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
                <Textarea
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

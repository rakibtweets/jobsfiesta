"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

import SearchInput from "../ui/search-input";

export default function TalentFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || "";
  const slevel = searchParams.get("slevel") || "";
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    skillLevel: "",
    experience: "",
    skills: "",
  });

  const skillLevels = ["Entry Level", "Junior", "Mid-Level", "Senior", "Expert"];
  const locations = ["Remote", "San Francisco, CA", "New York, NY", "Boston, MA", "Austin, TX", "Los Angeles, CA"];
  const experienceRanges = [
    { label: "0-2 years", value: "0-2" },
    { label: "2-5 years", value: "2-5" },
    { label: "5-10 years", value: "5-10" },
    { label: "10+ years", value: "10+" },
  ];

  const handleReset = () => {
    const newUrl = removeKeysFromUrlQuery({
      params: searchParams.toString(),
      keysToRemove: ["search", "country", "skill", "experience", "location", "slevel"],
    });

    router.push(newUrl, { scroll: false });
  };

  const handleUpdateParams = (value: string, updatedvalue: string, path: string) => {
    if (value === updatedvalue) {
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: [path],
      });

      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: String(path),
        value,
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="sticky top-20 space-y-6">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <X size={16} className="mr-1" />
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label className="mb-2 block">Search</Label>
            <SearchInput query="search" placeholder="Enter name or title..." route={pathname} />
          </div>

          {/* Location */}
          <div>
            <Label className="mb-3 block font-semibold">Location</Label>
            <div className="space-y-2">
              {locations.map((loc) => (
                <div key={loc} className="flex items-center">
                  <Checkbox
                    id={`loc-${loc}`}
                    checked={country === loc}
                    onCheckedChange={() => {
                      handleUpdateParams(loc, country, "country");
                    }}
                  />
                  <Label htmlFor={`loc-${loc}`} className="ml-2 cursor-pointer font-normal">
                    {loc}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <Label className="mb-3 block font-semibold">Skill Level</Label>
            <div className="space-y-2">
              {skillLevels.map((level) => (
                <div key={level} className="flex items-center">
                  <Checkbox
                    id={level}
                    checked={slevel === level}
                    onCheckedChange={() => {
                      handleUpdateParams(level, slevel, "slevel");
                    }}
                  />
                  <Label htmlFor={level} className="ml-2 cursor-pointer font-normal">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <Label className="mb-3 block font-semibold">Experience</Label>
            <Select value={filters.experience} onValueChange={(value) => setFilters({ ...filters, experience: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div>
            <Label className="mb-2 block">Skills</Label>
            <SearchInput query="skill" placeholder="Enter skills tag..." route={pathname} />
          </div>
        </div>
      </Card>
    </div>
  );
}

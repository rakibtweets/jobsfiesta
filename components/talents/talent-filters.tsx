/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TalentFilters({ filters, setFilters }: any) {
  const skillLevels = ["Entry Level", "Junior", "Mid-Level", "Senior", "Expert"];
  const locations = ["Remote", "San Francisco, CA", "New York, NY", "Boston, MA", "Austin, TX", "Los Angeles, CA"];
  const experienceRanges = [
    { label: "0-2 years", value: "0-2" },
    { label: "2-5 years", value: "2-5" },
    { label: "5-10 years", value: "5-10" },
    { label: "10+ years", value: "10+" },
  ];

  const handleReset = () => {
    setFilters({
      search: "",
      location: "",
      skillLevel: "",
      experience: "",
      skills: "",
    });
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
            <Input
              placeholder="Name or title..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Location */}
          <div>
            <Label className="mb-3 block font-semibold">Location</Label>
            <div className="space-y-2">
              {locations.map((loc) => (
                <div key={loc} className="flex items-center">
                  <Checkbox
                    id={`loc-${loc}`}
                    checked={filters.location === loc}
                    onCheckedChange={() =>
                      setFilters({
                        ...filters,
                        location: filters.location === loc ? "" : loc,
                      })
                    }
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
                    checked={filters.skillLevel === level}
                    onCheckedChange={() =>
                      setFilters({
                        ...filters,
                        skillLevel: filters.skillLevel === level ? "" : level,
                      })
                    }
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
            <Input
              placeholder="e.g., React, Python..."
              value={filters.skills}
              onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

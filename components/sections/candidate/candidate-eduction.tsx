"use client";

import { Pencil, Trash2 } from "lucide-react";

import { CandidateEducationForm } from "@/components/forms/candidate/candidate-education-form";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Education = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear?: string | undefined;
};

type EducationDisplayListProps = {
  educations: Education[];
};

export function CandidateEducationDisplayList({ educations }: EducationDisplayListProps) {
  const serverAction = async () => {
    // Simulate a server action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: false, message: "Action Successful" };
  };
  return (
    <div className="space-y-4">
      {educations.map((edu, idx) => (
        <div
          key={idx}
          className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-purple-400/50"
        >
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-foreground text-sm font-semibold">School/University</p>
              <p className="mt-1">{edu.institution}</p>
            </div>

            <div>
              <p className="text-foreground text-sm font-semibold">Degree</p>
              <p className="mt-1">{edu.degree}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-foreground text-sm font-semibold">Field of Study</p>
              <p className="mt-1">{edu.fieldOfStudy}</p>
            </div>

            <div>
              <p className="text-foreground text-sm font-semibold">Graduation Year</p>
              <p className="mt-1">{edu.graduationYear ?? "Not provided"}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger>
                <Button type="button" size="default">
                  <Pencil size={14} /> Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Education</DialogTitle>
                </DialogHeader>
                <CandidateEducationForm type="edit" education={edu} />
              </DialogContent>
            </Dialog>

            <ActionButton
              action={serverAction}
              areYouSureDescription="This action cannot be undone."
              requireAreYouSure
              variant={"destructive"}
            >
              <Trash2 size={14} /> Delete
            </ActionButton>
          </div>
        </div>
      ))}
    </div>
  );
}

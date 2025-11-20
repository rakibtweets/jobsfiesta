"use client";

import { Pencil, Trash2 } from "lucide-react";

import { CandidateExperienceForm } from "@/components/forms/candidate/candidate-experience-form";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Experience = {
  position: string;
  company: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
};

type ExperienceListProps = {
  experiences: Experience[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
};

export function CandidateExperienceDisplayList({ experiences }: ExperienceListProps) {
  const serverAction = async () => {
    // Simulate a server action
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: false };
  };
  return (
    <div className="space-y-4">
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="border-border/50 hover:bg-card/50 bg-card/20 rounded-lg border p-5 transition-all duration-300 hover:border-green-400/50"
        >
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-foreground text-sm font-semibold">Position</p>
              <p className="mt-1">{exp.position}</p>
            </div>

            <div>
              <p className="text-foreground text-sm font-semibold">Company</p>
              <p className="mt-1">{exp.company}</p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-foreground text-sm font-semibold">Start Date</p>
              <p className="mt-1">{exp.startDate ? exp.startDate.toDateString() : "Not provided"}</p>
            </div>

            <div>
              <p className="text-foreground text-sm font-semibold">End Date</p>
              <p className="mt-1">{exp.endDate ? exp.endDate.toDateString() : "Till now"}</p>
            </div>
          </div>

          {exp.description && (
            <div className="mb-4">
              <p className="text-foreground text-sm font-semibold">Description</p>
              <p className="mt-1 whitespace-pre-line">{exp.description}</p>
            </div>
          )}

          <div className="flex gap-2">
            <div>
              <Dialog>
                <DialogTrigger>
                  <Button type="button" size="default">
                    <Pencil size={14} /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Experience</DialogTitle>
                  </DialogHeader>
                  <CandidateExperienceForm type="edit" experience={exp} />
                </DialogContent>
              </Dialog>
            </div>

            <ActionButton
              action={serverAction}
              areYouSureDescription="This task can not to revierse."
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

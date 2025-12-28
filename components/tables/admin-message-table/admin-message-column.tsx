"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";

import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IContact } from "@/database/contact.model";
import { deleteContactMessageById } from "@/lib/actions/contact.action";
import { formatDate } from "@/lib/utils";

export const adminMessageColumns: ColumnDef<IContact>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-muted-foreground">{row.original.email}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.original.subject}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return <div className="text-sm">{formatDate(row.original.createdAt)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original as IContact;

      return (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="View Details">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{`${contact.name}-${contact.email}`}</DialogTitle>
                <DialogDescription>{contact.message}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <ActionButton
            action={() => deleteContactMessageById(String(contact?._id))}
            areYouSureDescription="This action cannot be undone."
            requireAreYouSure
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive h-8 w-8"
            title="Delete Message"
          >
            <Trash2 className="h-4 w-4" />
          </ActionButton>
        </div>
      );
    },
  },
];

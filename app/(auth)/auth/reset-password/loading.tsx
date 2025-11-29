import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="bg-background w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-lg">
        {/* Title */}
        <Skeleton className="h-6 w-40" />

        {/* Description */}
        <Skeleton className="h-4 w-64" />

        {/* Password Input */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Button */}
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}

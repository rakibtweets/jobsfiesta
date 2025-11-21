"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formUrlQuery } from "@/lib/url";

interface Filter {
  name: string;
  value: string;
}
interface Props {
  filters: Filter[];
  filter?: string;
}

const FilterInput = ({ filters, filter }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsFilter = searchParams.get(filter || "");
  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: String(filter),
      value,
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <div>
      <Select onValueChange={handleUpdateParams} defaultValue={paramsFilter || undefined}>
        <SelectTrigger aria-label="Filter options">
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default FilterInput;

"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationBarProps {
  page: number;
  limit: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  isLoading?: boolean;
  className?: string;
}

export const PaginationBar = ({
  page,
  limit,
  totalCount,
  onPageChange,
  onLimitChange,
  isLoading = false,
  className = "",
}: PaginationBarProps) => {
  const pageCount = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <div className={`mt-4 flex items-center justify-end px-4 ${className}`}>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        {/* Rows per page */}
        <div className="hidden items-center gap-2 lg:flex">
          <Label
            htmlFor="rows-per-page"
            className="text-sm font-medium whitespace-nowrap"
          >
            Хуудаслалт
          </Label>
          <Select
            value={`${limit}`}
            onValueChange={(val) => onLimitChange(Number(val))}
            disabled={isLoading}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Хуудас {page} / {pageCount}
        </div>

        {/* Page navigation buttons */}
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={page === 1 || isLoading}
          >
            <ChevronsLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pageCount || isLoading}
          >
            <ChevronRight />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => onPageChange(pageCount)}
            disabled={page === pageCount || isLoading}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

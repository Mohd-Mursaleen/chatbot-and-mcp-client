"use client";
import { DefaultToolName } from "lib/ai/tools";
import { cn } from "lib/utils";
import {
  GlobeIcon,
  HardDriveUploadIcon,
  HammerIcon,
} from "lucide-react";
import { useMemo } from "react";

export function DefaultToolIcon({
  name,
  className,
}: { name: DefaultToolName; className?: string }) {
  return useMemo(() => {
    if (name === DefaultToolName.WebSearch) {
      return <GlobeIcon className={cn("size-3.5 text-blue-400", className)} />;
    }
    if (name === DefaultToolName.WebContent) {
      return <GlobeIcon className={cn("size-3.5 text-blue-400", className)} />;
    }
    if (name === DefaultToolName.Http) {
      return (
        <HardDriveUploadIcon
          className={cn("size-3.5 text-blue-300", className)}
        />
      );
    }

    return <HammerIcon className={cn("size-3.5", className)} />;
  }, [name]);
}

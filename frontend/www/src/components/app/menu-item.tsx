"use client";

import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  icon?: React.FC<{ className?: string }>;
  label: string;
  children?: MenuItem[];
}

interface MenuItemProps {
  item: MenuItem;
  isChild?: boolean;
}

export const MenuItem = ({ item, isChild = false }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.children) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "w-full flex items-center transition-colors justify-between p-2 rounded-lg cursor-pointer hover:bg-zinc-900 hover:text-white",
            isChild && "pl-7"
          )}
        >
          <div className="flex items-center">
            {item.icon && <item.icon className="w-4 h-4 mr-3" />}
            <span className={clsx("font-medium", isChild && "text-sm")}>
              {item.label}
            </span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-2">
            {item.children.map((child, index) => (
              <MenuItem key={index} item={child} isChild={true} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center p-2 rounded-lg cursor-pointer transition-colors hover:bg-zinc-900 hover:text-white",
        isChild && "pl-7"
      )}
    >
      {item.icon && <item.icon className="w-4 h-4 mr-3" />}
      <span className={clsx("font-medium", isChild && "text-sm")}>
        {item.label}
      </span>
    </div>
  );
};

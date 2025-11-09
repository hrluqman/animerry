"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

type dataSelection = {
    value: string;
    label: string;    
}

type CheckboxDropdownProps = {
  title: string;
  data?: dataSelection[];
};

const CheckboxDropdown = ({ title, data = [] }: CheckboxDropdownProps) => {

  return (
    <div className="w-full">
      <p className="text-light text-sm font-bold mb-2">{title}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Input placeholder="Any" className="input-theme text-light text-left shadow-none" defaultValue={"Any"} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-theme-secondary-dark text-light w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg">
          {data.map((item, index) => (
            <DropdownMenuCheckboxItem key={index}>{item.label}</DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CheckboxDropdown;

"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

type DataSelection = { value: string; label: string };

type CheckboxDropdownProps = {
  title: string;
  data?: DataSelection[];
  value: string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
};

const CheckboxDropdown = ({
  title,
  data = [],
  value,
  onChange,
  multiple = true,
}: CheckboxDropdownProps) => {
  const isChecked = (v: string) => value.includes(v);

  const toggleMulti = (v: string, checked: boolean | "indeterminate") => {
    const on = checked === true;
    onChange(on ? [...value, v] : value.filter((x) => x !== v));
  };

  const selectedSingle = value[0] ?? ""; // when multiple=false

  const display = (() => {
    if (multiple) {
      return value.length
        ? data
            .filter((d) => value.includes(d.value))
            .map((d) => d.label)
            .join(", ")
        : "Any";
    } else {
      const found = data.find((d) => d.value === selectedSingle);
      return found ? found.label : "Any";
    }
  })();

  return (
    <div className="w-full">
      <p className="text-light text-sm font-bold mb-2">{title}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Input
            readOnly
            value={display.length > 15 ? `${display.slice(0, 15)}...` : display}
            className="input-theme text-light text-left shadow-none cursor-pointer truncate"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-theme-secondary-dark text-light w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg">
          {multiple ? (
            // Multiple: checkbox list
            <>
              {data.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item.value}
                  checked={isChecked(item.value)}
                  onCheckedChange={(c) => toggleMulti(item.value, c)}
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              ))}
            </>
          ) : (
            // Single: radio group with "Any" to clear selection
            <DropdownMenuRadioGroup
              value={selectedSingle || "__ANY__"}
              onValueChange={(v) => {
                if (v === "__ANY__") onChange([]);
                else onChange([v]);
              }}
            >
              <DropdownMenuRadioItem value="__ANY__">Any</DropdownMenuRadioItem>
              {data.map((item) => (
                <DropdownMenuRadioItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CheckboxDropdown;

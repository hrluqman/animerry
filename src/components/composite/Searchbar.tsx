import { cn } from "../../lib/utils";
import { Input } from "../ui/input";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  hideTitle?: boolean;
  className?: string;
}

const SearchBar = ({ value, onChange, hideTitle = false, className }: SearchBarProps) => {
  return (
    <div className="w-full">
      {hideTitle == false && <p className="text-light text-sm font-bold mb-2">Search</p>}
      <Input
        placeholder="Search by keyword..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("input-theme text-light", className)}
      />
    </div>
  );
};

export default SearchBar;

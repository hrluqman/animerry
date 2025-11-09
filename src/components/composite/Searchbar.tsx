import { Input } from "../ui/input";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="w-full">
      <p className="text-light text-sm font-bold mb-2">Search</p>
      <Input
        placeholder="Search by keyword..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-theme text-light"
      />
    </div>
  );
}
 
export default SearchBar;

import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../../app/slice/searchSlice";
import { useDebounce } from "../../hooks/useDebounce";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 500); // waits 500ms after typing stops

  useEffect(() => {
    dispatch(setQuery(debounced.trim()));
    console.log("searching", debounced);
  }, [debounced, dispatch]);

  return (
    <div className="w-full">
      <p className="text-light text-sm font-bold mb-2">Search</p>
      <Input
        placeholder="Search anime…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-theme text-light"
      />
    </div>
  );
}

import "./index.css";
import {
  Search
} from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <div className="search-box">
      <span className="search-icon"><Search size={16}/></span>
      

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
      />

      {value && (
        <button
          type="button"
          className="clear-search"
          onClick={() => onChange("")}
        >
          ×
        </button>
      )}
    </div>
  );
}
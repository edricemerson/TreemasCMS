import type { ChangeEvent } from "react";

type SearchbarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Searchbar({ value, onChange }: SearchbarProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-xl bg-gray-200">
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 text-gray-400 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        />
      </svg>

      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="outline-none w-full text-base"
      />
    </div>
  );
}

export default Searchbar;
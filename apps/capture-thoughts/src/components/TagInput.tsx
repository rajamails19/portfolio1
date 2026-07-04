import { X } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

export function TagInput({
  tags,
  onChange,
  placeholder = "Add tag and press Enter",
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [val, setVal] = useState("");
  const commit = () => {
    const v = val.trim().replace(/^#/, "");
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setVal("");
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && !val && tags.length) {
      onChange(tags.slice(0, -1));
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs text-foreground"
        >
          #{t}
          <button onClick={() => onChange(tags.filter((x) => x !== t))} className="opacity-60 hover:opacity-100">
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={onKey}
        onBlur={commit}
        placeholder={placeholder}
        className="min-w-[8rem] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

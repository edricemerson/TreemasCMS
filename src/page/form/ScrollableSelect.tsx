import { useState, useRef, useEffect } from 'react';
import Button from '../Button';

interface ScrollableSelectProps {
    id: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    onBlur: () => void;
    hasError?: boolean;
}

export default function ScrollableSelect({
    id,
    value,
    options,
    onChange,
    onBlur,
    hasError = false,
}: ScrollableSelectProps) {
    const [open, setOpen] = useState(false);
    const [listReady, setListReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const placeholder = options[0] ?? 'Pilih';
    const displayValue = value || placeholder;
    const isPlaceholder = !value;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                onBlur();
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [open, onBlur]);

    useEffect(() => {
        if (open) {
            setListReady(false);
            const raf = requestAnimationFrame(() => {
                requestAnimationFrame(() => setListReady(true));
            });
            return () => cancelAnimationFrame(raf);
        } else {
            setListReady(false);
        }
    }, [open]);

    function handleSelect(opt: string) {
        const isFirst = opt === options[0];
        onChange(isFirst ? '' : opt);
        setOpen(false);
        onBlur();
    }

    return (
        <div ref={containerRef} className="relative w-full">
            <Button
                type="button"
                id={id}
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm border rounded-lg bg-white text-slate-900 transition
          ${isPlaceholder ? 'text-slate-400' : ''}
          ${hasError ? 'border-red-600' : 'border-slate-300 hover:border-slate-400'}
          focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200`}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{displayValue}</span>
                <span className="text-xs text-slate-500 ml-2">▼</span>
            </Button>

            {open && (
                <ul
                    className={`absolute z-50 top-full mt-1 w-full max-h-52 overflow-y-auto bg-white border border-slate-300 rounded-lg shadow-lg py-1
            transform transition-all duration-200
            ${listReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                    role="listbox"
                >
                    {options.map((opt) => {
                        const selected = value === opt || (opt === options[0] && !value);
                        return (
                            <li
                                key={opt}
                                onClick={() => handleSelect(opt)}
                                className={`px-3 py-2 text-sm cursor-pointer transition
                  ${selected ? 'bg-sky-100 text-sky-700' : 'text-slate-900'}
                  hover:bg-slate-100`}
                            >
                                {opt}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
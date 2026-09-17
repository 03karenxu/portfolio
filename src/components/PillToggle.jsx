export default function PillToggle({ options, value, onChange }) {
  return (
    <div className="flex w-fit gap-4">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`border-b-2 text-sm font-semibold transition-colors ${
              isActive
                ? "border-aqua text-charcoal"
                : "text-charcoal/50 border-transparent"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

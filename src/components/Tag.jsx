function Tag({ children, className = "" }) {
  return (
    <div
      className={`font-poppins text-charcoal border-light-gray flex w-fit items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm font-medium shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function TagList({ items, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}

export { Tag, TagList };

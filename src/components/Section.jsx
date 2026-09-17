export default function Section({
  id,
  children,
  ref = null,
  containerRef = null,
  className = "",
  containerClassName = "",
}) {
  return (
    <section
      ref={ref}
      id={id}
      className={`flex h-screen w-full snap-center items-center justify-center overflow-hidden ${className}`}
    >
      <div
        ref={containerRef}
        className={`flex w-[80vw] max-w-4xl flex-col ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

export function GridLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] hidden lg:flex justify-between px-20 max-w-[1450px] mx-auto left-0 right-0">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-px h-full bg-rust/8" />
      ))}
    </div>
  );
}

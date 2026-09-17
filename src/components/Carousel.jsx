import { useRef, useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import { HorizontalTagList } from "./Tag";

export default function Carousel({ projects }) {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const scrollLeft = containerRef.current.scrollLeft;
    const index = Math.round(scrollLeft / width);
    setCurrent(index);
  };

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-center gap-4">
      <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-between gap-4">
        <button
          onClick={() =>
            scrollToIndex((current - 1 + projects.length) % projects.length)
          }
          aria-label="Previous project"
          className="hover:text-aqua absolute -left-20 hidden p-2 transition-all duration-200 ease-out hover:-translate-x-1 md:block"
        >
          <ArrowIcon className="size-12 -rotate-180" />
        </button>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex h-full flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-light-gray grid h-full w-full min-w-0 shrink-0 snap-center grid-rows-2 md:grid-rows-[6fr_5fr]"
            >
              <div className="overflow-hidden">
                <img src={project.img} className="h-full w-full object-cover" />
              </div>
              <div className="flex min-w-0 flex-col gap-2 px-6 py-5 lg:px-10 lg:py-8">
                <a href={project.url} target="_blank">
                  <h3 className="transition-color hover:text-aqua w-fit duration-200 ease-out">
                    {project.title}
                  </h3>
                </a>
                <HorizontalTagList items={project.skills} className="mb-2" />
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollToIndex((current + 1) % projects.length)}
          aria-label="Next project"
          className="hover:text-aqua absolute -right-20 hidden p-2 transition-all duration-200 ease-out hover:translate-x-1 md:block"
        >
          <ArrowIcon className="size-12" />
        </button>
      </div>

      <div className="flex gap-2">
        {projects.map((project, index) => (
          <button
            key={project.title}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`hover:bg-aqua/60 size-2.5 rounded-full transition-all duration-200 ease-out ${
              current === index ? "bg-aqua" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

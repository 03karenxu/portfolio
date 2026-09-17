import { useEffect, useRef, useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import { HorizontalTagList } from "./Tag";

const GAP = 16;

export default function Carousel({ projects }) {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardsPerView(3);
      else if (width >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const getCardWidth = () => {
    if (!containerRef.current?.firstElementChild) return 0;
    return containerRef.current.firstElementChild.offsetWidth + GAP;
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const cardWidth = getCardWidth();
    if (!cardWidth) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrent(index);
  };

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const cardWidth = getCardWidth();
    const maxIndex = Math.max(0, projects.length - cardsPerView);
    const clamped = Math.min(Math.max(index, 0), maxIndex);
    containerRef.current.scrollTo({
      left: cardWidth * clamped,
      behavior: "smooth",
    });
  };

  const maxIndex = Math.max(0, projects.length - cardsPerView);
  const needsCarousel = maxIndex > 0;

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-center gap-5">
      <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-between gap-4">
        {needsCarousel && (
          <button
            onClick={() => scrollToIndex(current - 1)}
            aria-label="Previous project"
            className="hover:text-aqua focus-visible:text-aqua absolute -left-20 hidden rounded-full p-2 transition-all duration-200 ease-out hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-20 md:block"
            disabled={current === 0}
          >
            <ArrowIcon className="size-12 -rotate-180" />
          </button>
        )}

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex h-full flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-xl"
        >
          {projects.map((project, index) => {
            const isActive = index >= current && index < current + cardsPerView;

            return (
              <div
                key={project.title}
                className={`bg-light-gray grid h-full w-full min-w-0 shrink-0 snap-center grid-rows-2 overflow-hidden rounded-xl transition-opacity duration-300 ease-out md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid min-w-0 grid-rows-[2rem_auto_1fr] gap-2 px-6 py-5 lg:px-8 lg:py-6">
                  <a href={project.url} target="_blank" rel="noreferrer">
                    <h3 className="hover:text-aqua focus-visible:text-aqua w-fit truncate transition-colors duration-200 ease-out">
                      {project.title}
                    </h3>
                  </a>
                  <HorizontalTagList
                    items={project.skills}
                    className="flex-wrap overflow-hidden"
                  />
                  <p className="line-clamp-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {needsCarousel && (
          <button
            onClick={() => scrollToIndex(current + 1)}
            aria-label="Next project"
            className="hover:text-aqua focus-visible:text-aqua absolute -right-20 hidden rounded-full p-2 transition-all duration-200 ease-out hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-20 md:block"
            disabled={current === maxIndex}
          >
            <ArrowIcon className="size-12" />
          </button>
        )}
      </div>

      {needsCarousel && (
        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index}
              className={`focus-visible:outline-2 focus-visible:outline-offset-2 ${
                current === index
                  ? "bg-aqua h-2.5 w-6 rounded-full"
                  : "hover:bg-aqua/60 size-2.5 rounded-full bg-gray-300"
              } transition-all duration-200 ease-in-out`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

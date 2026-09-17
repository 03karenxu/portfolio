import { useRef } from "react";
import Section from "../components/Section";
import ArrowIcon from "@/components/ArrowIcon";
import SquigglyArrow from "../components/SquigglyArrow";

export default function Home({ ready }) {
  const gridRef = useRef(null);
  const headlineRef = useRef(null);
  const photoRef = useRef(null);

  return (
    <Section
      id="home"
      containerRef={gridRef}
      containerClassName="relative gap-8 md:grid md:grid-cols-2 md:gap-4 pl-4 md:pl-0 md:max-w-4xl"
    >
      <img
        id="home-img-cell"
        ref={photoRef}
        src={`${import.meta.env.BASE_URL}profile.png`}
        className="h-35 w-35 object-cover md:col-start-2 md:row-start-1 md:h-75 md:w-75 md:self-start md:justify-self-end"
      />

      <div
        id="home-text-cell"
        className="flex flex-col justify-center gap-12 md:col-start-1 md:row-start-1 md:mt-1"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-aqua">hi!</h2>
          <h1 ref={headlineRef} className="mb-4 w-fit pr-5">
            i'm karen
          </h1>
          <p>i like building things :-)</p>
        </div>
        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="group border-aqua hover:text-aqua inline-flex items-center gap-1 self-start border-b-3 font-semibold transition-all duration-200 ease-out md:mt-3.5 md:text-lg"
        >
          check out my cv
          <ArrowIcon className="size-6 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </a>
      </div>

      <SquigglyArrow
        className="text-aqua hidden md:block"
        containerRef={gridRef}
        startRef={headlineRef}
        endRef={photoRef}
        d="
          M 34.922782,113.49904
          C 34.922782,113.49904 46.946381,124.94123 70.76458,125.90582
          C 105,127.29228 105,100.13488 92.715591,100.80461
          C 80.571195,101.46671 82.925082,131.08109 124.10253,127.67468
          C 154.87947,125.12865 171.85747,102.47079 171.85747,102.47079
        "
        ready={ready}
      />
    </Section>
  );
}

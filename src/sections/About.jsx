import { useState } from "react";
import Section from "../components/Section";
import PillToggle from "../components/PillToggle";
import ScrollCard from "../components/ScrollCard";
import { Tag, TagList } from "@/components/Tag";

const researchInterests = [
  "AI in Health Informatics",
  "Knowledge Representation + Retrieval",
  "Human-AI Interaction",
];

const personalInterests = [
  "Drawing + Painting",
  "Making Playlists",
  "Game + App Dev",
];

const skills = ["Python", "React", "Git", "JavaScript", "HTML", "PyTorch"];

const mobileTabs = [
  { label: "skills", value: "skills" },
  { label: "interests", value: "interests" },
];

const interestTabs = [
  { label: "research", value: "research" },
  { label: "personal", value: "personal" },
];

function InterestTags({ activeTab }) {
  const interests =
    activeTab === "personal" ? personalInterests : researchInterests;

  return <TagList items={interests} />;
}

function Interests() {
  const [activeTab, setActiveTab] = useState("research");

  return (
    <div
      id="about-desktop-interests-cell"
      className="flex flex-col gap-4 px-2 py-5 lg:px-8 lg:py-6"
    >
      <div className="flex flex-row items-center justify-between">
        <h4>interests</h4>
        <div className="min-w-40">
          <PillToggle
            options={interestTabs}
            value={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>
      <InterestTags activeTab={activeTab} />
    </div>
  );
}

function Skills() {
  return (
    <ScrollCard
      id="about-desktop-skills-cell"
      background="var(--color-white)"
      className="flex flex-col px-2 py-5 lg:px-8 lg:py-6"
    >
      <h4>skills</h4>
      <TagList items={skills} className="pb-1" />
    </ScrollCard>
  );
}

function BioCell() {
  return (
    <ScrollCard
      id="about-bio-cell"
      background="var(--color-light-gray)"
      className="z-10 flex flex-col gap-4 px-6 py-5 lg:px-10 lg:py-8"
    >
      <Tag>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-aqua size-5"
        >
          <path
            fillRule="evenodd"
            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Vancouver, BC</span>
      </Tag>

      <div className="space-y-4">
        <p>
          I'm a recent Computer Science graduate from the University of
          Victoria. I like working with data, and I like building the tools that
          let other people work with data too.
        </p>

        <p>
          I'm currently doing research @ UVic, exploring how knowledge graphs
          and RAG can help biomedical researchers navigate large volumes of
          scientific literature more easily. This work involves building
          knowledge graphs from biomedical papers using agentic pipelines, and
          finding better ways to evaluate RAG systems.
        </p>
      </div>
    </ScrollCard>
  );
}

function MobileLayout() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <ScrollCard
      id="about-mobile-cell"
      className="flex flex-col px-6 py-5 md:hidden"
    >
      <PillToggle
        options={mobileTabs}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "interests" ? (
        <InterestTags activeTab="research" />
      ) : (
        <TagList items={skills} />
      )}
    </ScrollCard>
  );
}

export default function About() {
  return (
    <Section id="about" containerClassName="h-[75vh] md:h-120 gap-4">
      <h3 className="w-fit">about me...</h3>

      <div
        id="about-main-grid"
        className="grid min-h-0 flex-1 grid-rows-[5fr_4fr] gap-4 md:grid-cols-[5fr_4fr] md:grid-rows-1"
      >
        <BioCell />
        <MobileLayout />
        <div className="hidden min-h-0 flex-col md:flex">
          <Interests />
          <Skills />
        </div>
      </div>
    </Section>
  );
}

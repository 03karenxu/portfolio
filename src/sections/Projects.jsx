import Section from "../components/Section";
import Carousel from "@/components/Carousel";
const projects = [
  {
    title: "bioQuery",
    description:
      "A RAG-based application for accelerating biomedical literature review (NSERC USRA research project)",
    skills: [
      "RAG",
      "Python",
      "DSPy/LiteLLM",
      "Docker",
      "JavaScript",
      "Milvus",
      "Memgraph",
    ],
    url: "https://github.com/03karenxu/bio-rag",
  },
  {
    title: "chef's choice",
    description:
      "A data-driven way to discover restaurants that won't break the bank.",
    skills: [
      "React",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
    ],
    url: "https://github.com/03karenxu/chefs-choice",
  },
  {
    title: "sort it out!",
    description:
      "A simple game that teaches you how to properly sort your garbage in Vancouver",
    skills: ["JavaScript", "HTML", "CSS", "React"],
    url: "https://github.com/03karenxu/sort-it-out",
  },
];

export default function Projects() {
  return (
    <Section id="projects" containerClassName="h-[75vh] md:h-140 gap-4">
      <h3 id="projects-header" className="w-fit">
        projects...
      </h3>
      <div className="h-full">
        <Carousel projects={projects} />
      </div>
    </Section>
  );
}

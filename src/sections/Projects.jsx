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
    img: `${import.meta.env.BASE_URL}bioQuery.png`,
    url: "https://github.com/03karenxu/bio-rag",
  },
  {
    title: "chef's choice",
    description:
      "A data-driven way to find restaurants (that won't break the bank)",
    skills: [
      "React",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
    ],
    img: `${import.meta.env.BASE_URL}chefs_choice.png`,
    url: "https://github.com/03karenxu/chefs-choice",
  },
  {
    title: "sort it out!",
    description:
      "A simple game that teaches you how to properly sort your garbage in Vancouver",
    skills: ["JavaScript", "HTML", "CSS", "React"],
    img: `${import.meta.env.BASE_URL}sort_it_out.png`,
    url: "https://github.com/03karenxu/sort-it-out",
  },
];

export default function Projects() {
  return (
    <Section
      id="projects"
      containerClassName="h-[75vh] md:h-140 gap-4 items-center justify-center"
    >
      <div className="flex h-full w-full flex-col gap-4 md:w-[90%]">
        <h3 id="projects-header">projects...</h3>
        <Carousel projects={projects} />
      </div>
    </Section>
  );
}

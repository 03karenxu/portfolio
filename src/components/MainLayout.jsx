import Navbar from "./Navbar";
import Home from "@/sections/Home";
import About from "@/sections/About";
import Projects from "@/sections/Projects";

export default function MainLayout({ ready }) {
  return (
    <>
      <Navbar />
      <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
        <Home ready={ready} />
        <About />
        <Projects />
      </main>
    </>
  );
}

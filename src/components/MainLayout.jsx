import Navbar from "./Navbar";
import Home from "@/sections/Home";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Footer from "./Footer";

export default function MainLayout({ ready }) {
  return (
    <>
      <Navbar />
      <main className="relative h-screen snap-y snap-mandatory overflow-y-scroll">
        <Home ready={ready} />
        <About />
        <Projects />
        <Footer />
      </main>
    </>
  );
}

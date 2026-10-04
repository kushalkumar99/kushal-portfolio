import "../styles/home.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Snapshot from "../components/Snapshot";
import About from "../components/About";
import Work from "../components/Work";
import Experience from "../components/Experience";
import TechStack from "../components/TechStack";
import Contact from "../components/Contact";

function Home() {
  return (
    <main className="home" id="home">
      <Navbar />
      <Hero />
      <Snapshot />
      <About />
      <Work />
      <Experience />
      <TechStack />
      <Contact />
    </main>
  );
}

export default Home;
import Hero from "../components/Hero";
import GlowBackground from "../components/GlowBackground";

const HeroContainer = () => {
  return (
    <main className="h-screen relative overflow-hidden">
      <GlowBackground className="absolute top-0 left-0 translate-y-[-50%] z-10" />
      <Hero />
    </main>
  );
};

export default HeroContainer;

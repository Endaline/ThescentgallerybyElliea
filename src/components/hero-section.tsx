"use client";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/images/perf-5.jpg')`,
          filter: "brightness(0.6) contrast(1.1)",
          transform: `translate(${mousePosition.x * -0.02}px, ${
            mousePosition.y * -0.02
          }px) scale(1.05)`,
        }}
      />

      {/* Gradient Overlay with Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-purple-900/20 to-black/50" />

      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <Star className="w-4 h-4 text-white" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 text-center text-primary-foreground max-w-5xl mx-auto px-6 transition-all duration-1500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Main Heading with Staggered Animation */}
        <div className="space-y-4 mb-8">
          <h1
            className={`text-4xl md:text-6xl xl:text-8xl font-black leading-none transition-all duration-1000 delay-300 ${
              isVisible ?
                "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
            }`}
          >
            <span className="block text-white mb-2">Discover Your</span>
            <span className="block relative">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent animate-gradient-x">
                Signature
              </span>
            </span>
            <span className="block text-white/90 text-5xl md:text-7xl xl:text-8xl mt-2">
              Scent
            </span>
          </h1>
        </div>

        {/* Description */}
        <p
          className={`text-xl md:text-2xl xl:text-3xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Immerse yourself in our meticulously curated collection of the
          world&apos;s most
          <span className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
            {" "}
            exquisite fragrances
          </span>
          , each one crafted to tell your unique story.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            onClick={() => router.push("/products")}
            size="lg"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10 flex items-center">
              Explore Collection
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button
            onClick={() => router.push("/contact")}
            size="lg"
            variant="outline"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Contact us
          </Button>
        </div>
      </div>

      {/* Side Decorative Elements */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-4 text-white/30">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
          <div className="text-xs writing-mode-vertical-rl transform rotate-180 tracking-widest">
            THESCENTGALLERYBYELLIEA
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
        </div>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col gap-4 text-white/30">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
          <div className="text-xs writing-mode-vertical-rl tracking-widest">
            SINCE 2024
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .writing-mode-vertical-rl {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

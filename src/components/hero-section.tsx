"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/pef-5.jpeg')`,
          filter: "brightness(0.7)",
        }}
      />

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-800 opacity-80" /> */}

      {/* Content */}
      <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-accent mr-3" />
          <span className="text-accent font-medium text-lg">
            Luxury Fragrances
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Your
          <span className="block bg-gradient-accent bg-clip-text text-transparent">
            Signature Scent
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
          Explore our curated collection of the world&apos;s finest perfumes,
          crafted to express your unique personality and style.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="group">
            Shop Collection
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
          >
            Discover More
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <div className="w-3 h-3 bg-accent rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-32 right-16 animate-pulse delay-1000">
          <div className="w-2 h-2 bg-primary-glow rounded-full opacity-80" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full p-1">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

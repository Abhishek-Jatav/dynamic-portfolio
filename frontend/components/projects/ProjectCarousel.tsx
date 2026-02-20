"use client";

import { useEffect, useState } from "react";
import { getAllProjects } from "@/lib/api/projects/getAllProjects";
import type { Project } from "@/lib/types/project";
import ProjectCard from "./ProjectCard";
import CarouselControls from "./CarouselControls";

export default function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  if (!projects.length) return null;

  const prev = () => {
    setDirection("left");
    setIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const next = () => {
    setDirection("right");
    setIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="flex justify-center items-center min-h-[500px] px-4">
      <div className="relative w-full max-w-7xl">
        {/* Project Card */}
        <div
          key={index}
          className={`transition-all duration-500 ${
            direction === "right"
              ? "animate-slide-in-right"
              : "animate-slide-in-left"
          }`}>
          <ProjectCard project={projects[index]} />
        </div>

        {/* Controls - Bottom Right of CARD */}
        <div className="absolute  -bottom-10 right-17">
          <CarouselControls onPrev={prev} onNext={next} />
        </div>
      </div>
    </section>
  );
}

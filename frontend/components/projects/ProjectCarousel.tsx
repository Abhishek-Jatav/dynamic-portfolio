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
    <section className="relative flex justify-center items-center min-h-[450px] sm:min-h-[500px] px-2 sm:px-4">
      <div
        key={index}
        className={`transition-all duration-500 ${
          direction === "right"
            ? "animate-slide-in-right"
            : "animate-slide-in-left"
        }`}>
        <ProjectCard project={projects[index]} />
      </div>

      <CarouselControls onPrev={prev} onNext={next} />
    </section>
  );
}

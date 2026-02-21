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
    async function load() {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects");
      }
    }
    load();
  }, []);

  if (!projects.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No projects available.
      </div>
    );
  }

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
  };

  const next = () => {
    setDirection("right");
    setIndex((i) => (i === projects.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="flex flex-col items-center min-h-[500px] px-4">
      <div className="relative w-full max-w-7xl">
        <div
          key={index}
          className={`transition-all duration-500 ${
            direction === "right"
              ? "animate-slide-in-right"
              : "animate-slide-in-left"
          }`}>
          <ProjectCard project={projects[index]} />
        </div>

        <div className="flex justify-end mt-8">
          <CarouselControls onPrev={prev} onNext={next} />
        </div>
      </div>
    </section>
  );
}

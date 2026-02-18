import type { Project } from "@/lib/types/project";
import ProjectLinks from "./ProjectLinks";
import ProjectStructure from "./ProjectStructure";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white dark:bg-black/40 backdrop-blur border dark:border-gray-800 rounded-3xl shadow-xl p-6 sm:p-10 transition">
      <h3 className="text-2xl font-bold">{project.name}</h3>

      <p className="text-sm text-gray-500 mt-1">
        📅 {new Date(project.startDate).toDateString()}
      </p>

      <p className="mt-4 text-gray-600 dark:text-gray-400">
        {project.description}
      </p>

      <ProjectLinks
        live={project.liveLink}
        repo={project.repoLink}
        demo={project.demoLink}
      />

      <ProjectStructure folders={project.folderStructure} />
    </div>
  );
}

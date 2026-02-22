"use client";

import CreateProjectForm from "../../../components/projects/admin/CreateProjectForm";
import ProjectList from "../../../components/projects/admin/ProjectList";
import GetProjectByIdComponent from "../../../components/projects/admin/GetProjectById";
import GetProjectByNameComponent from "../../../components/projects/admin/GetProjectByName";

export default function AdminProjectsPanel() {
  return (
    <div className="space-y-14 p-4 sm:p-6 lg:p-8">
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Create Project
        </h2>
        <CreateProjectForm />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Search Project By ID
        </h2>
        <GetProjectByIdComponent />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Search / Delete By Name
        </h2>
        <GetProjectByNameComponent />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          All Projects
        </h2>
        <ProjectList />
      </section>
    </div>
  );
}

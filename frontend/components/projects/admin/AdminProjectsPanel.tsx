"use client";

import CreateProjectForm from "../../../components/projects/admin/CreateProjectForm";
import ProjectList from "../../../components/projects/admin/ProjectList";
import GetProjectByIdComponent from "../../../components/projects/admin/GetProjectById";
import GetProjectByNameComponent from "../../../components/projects/admin/GetProjectByName";

export default function AdminProjectsPanel() {
  return (
    <div className="space-y-12 p-6">
      {/* CREATE */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Create Project</h2>
        <CreateProjectForm />
      </section>

      {/* GET BY ID */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Search Project By ID</h2>
        <GetProjectByIdComponent />
      </section>

      {/* GET BY NAME + DELETE BY NAME */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Search / Delete By Name</h2>
        <GetProjectByNameComponent />
      </section>

      {/* ALL PROJECTS (Update + Delete + Feature Toggle) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Projects</h2>
        <ProjectList />
      </section>
    </div>
  );
}

const ProjectStructure = () => {
  return (
    <div className="relative group inline-block">
      {/* Trigger */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-2xl shadow-lg cursor-pointer flex items-center gap-3 hover:scale-105 transition">
        📁 <span className="font-semibold">Project Structure</span>
      </div>

      {/* Dropdown Panel */}
      <div className="absolute left-0 mt-3 w-72 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
        <ul className="p-5 space-y-2 text-sm font-mono text-gray-700 dark:text-gray-300">
          <li>📁 src</li>
          <li className="pl-4">📁 app</li>
          <li className="pl-8">📄 layout.tsx</li>
          <li className="pl-8">📄 page.tsx</li>
          <li className="pl-4">📁 components</li>
          <li className="pl-8">📁 projects</li>
          <li className="pl-12">📄 AdminProjects.tsx</li>
          <li className="pl-12">📄 ProjectForm.tsx</li>
          <li className="pl-12">📄 ProjectTable.tsx</li>
          <li className="pl-4">📁 lib</li>
          <li className="pl-8">📁 api</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectStructure;

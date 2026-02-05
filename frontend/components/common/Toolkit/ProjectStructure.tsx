const ProjectStructure = () => {
  return (
    <div className="relative group inline-block">
      {/* Trigger */}
      <div className="bg-white py-2 px-4 rounded-md shadow-lg cursor-pointer flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 14"
          height="25"
          width="25">
          <path
            fill="#FFA000"
            d="M16.2 1.75H8.1L6.3 0H1.8C0.81 0 0 0.7875 0 1.75V12.25C0 13.2125 0.81 14 1.8 14H15.165L18 9.1875V3.5C18 2.5375 17.19 1.75 16.2 1.75Z"
          />
          <path
            fill="#FFCA28"
            d="M16.2 2H1.8C0.81 2 0 2.77143 0 3.71429V12.2857C0 13.2286 0.81 14 1.8 14H16.2C17.19 14 18 13.2286 18 12.2857V3.71429C18 2.77143 17.19 2 16.2 2Z"
          />
        </svg>

        <p className="font-medium text-gray-700">Project Structure</p>
      </div>

      {/* Tooltip */}
      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
        <ul className="p-4 space-y-1 text-sm text-gray-700">
          <li>📁 src</li>
          <li className="pl-4">📁 app</li>
          <li className="pl-8">📄 layout.js</li>
          <li className="pl-8">📄 page.js</li>
          <li className="pl-4">📁 components</li>
          <li className="pl-8">📄 header.js</li>
          <li className="pl-8">📄 footer.js</li>
          <li className="pl-4">📁 styles</li>
          <li className="pl-8">📄 globals.css</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectStructure;

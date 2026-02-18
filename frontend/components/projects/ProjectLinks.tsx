interface Props {
  live?: string;
  repo?: string;
  demo?: string;
}

export default function ProjectLinks({ live, repo, demo }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {live && (
        <a
          href={live}
          target="_blank"
          className="px-5 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:scale-105 transition">
          🚀 Live
        </a>
      )}

      {repo && (
        <a
          href={repo}
          target="_blank"
          className="px-5 py-2 text-sm rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          💻 Repo
        </a>
      )}

      {demo && (
        <a
          href={demo}
          target="_blank"
          className="px-5 py-2 text-sm rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          🎥 Demo
        </a>
      )}
    </div>
  );
}

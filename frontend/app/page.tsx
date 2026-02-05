import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Navbar */}
      <nav className="w-full bg-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white bg-red-500 px-4 py-2 rounded">
          MyApp
        </h1>

        <div className="flex gap-6 text-white">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </nav>
      <div className="bg-red-500 text-white p-10">TAILWIND SHOULD WORK NOW</div>

      {/* Page Content */}
      <div className="p-6 text-black dark:text-white">Hello, World!</div>
    </main>
  );
}

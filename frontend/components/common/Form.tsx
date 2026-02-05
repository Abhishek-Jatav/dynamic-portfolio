import React from "react";

const Form: React.FC = () => {
  return (
    <div
      id="login"
      className="w-64 h-80 bg-indigo-50 rounded shadow flex flex-col justify-between p-3">
      <form className="text-indigo-500" action="" method="post">
        <fieldset className="border-4 border-dotted border-indigo-500 p-5">
          <legend className="px-2 italic -mx-2">Welcome again!</legend>

          <label
            htmlFor="email"
            className="text-xs font-bold after:content-['*'] after:text-red-400">
            Mail
          </label>

          <input
            id="email"
            type="email"
            required
            className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
          />

          <label
            htmlFor="password"
            className="text-xs font-bold after:content-['*'] after:text-red-400">
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
          />

          <a href="#" className="block text-right text-xs text-indigo-500 mb-4">
            Forgot Password?
          </a>

          <button
            type="submit"
            className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400">
            Log In
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;

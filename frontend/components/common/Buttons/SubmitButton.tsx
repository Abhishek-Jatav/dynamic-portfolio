"use client";

import React from "react";

type AnimatedButtonProps = {
  text?: string;
};

const SubmitButton : React.FC<AnimatedButtonProps> = ({
  text = "Subscribe",
}) => {
  return (
    <>
      <button className="animated-btn">
        <p>{text}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={4}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>

      <style jsx>{`
        .animated-btn {
          --primary-color: #111;
          --hovered-color: #c84747;

          padding: 0;
          margin: 0;
          border: none;
          background: none;
          cursor: pointer;

          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 20px;
        }

        .animated-btn p {
          margin: 0;
          position: relative;
          color: var(--primary-color);
        }

        .animated-btn::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -7px;
          width: 0;
          height: 2px;
          background: var(--hovered-color);
          transition: 0.3s ease-out;
        }

        .animated-btn p::before {
          content: "${text}";
          position: absolute;
          inset: 0;
          width: 0%;
          color: var(--hovered-color);
          overflow: hidden;
          transition: 0.3s ease-out;
        }

        .animated-btn:hover::after {
          width: 100%;
        }

        .animated-btn:hover p::before {
          width: 100%;
        }

        .animated-btn svg {
          width: 15px;
          color: var(--primary-color);
          transition: 0.2s;
          transition-delay: 0.2s;
        }

        .animated-btn:hover svg {
          transform: translateX(4px);
          color: var(--hovered-color);
        }
      `}</style>
    </>
  );
};

export default SubmitButton;

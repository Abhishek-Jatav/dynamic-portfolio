'use client';

import React from "react";

type AnimatedNavProps = {
  items?: string[];
};

const Navbar: React.FC<AnimatedNavProps> = ({
  items = ["Home", "Contact", "About", "FAQ"],
}) => {
  return (
    <div className="navbar-wrapper ">
      <div className="nav ">
        <div className="container">
          {items.map((item, index) => (
            <div className="btn" key={index}>
              {item}
            </div>
          ))}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 60"
            height={60}
            width={400}
            overflow="visible"
            className="outline"
          >
            <rect
              strokeWidth={5}
              fill="transparent"
              height={60}
              width={400}
              x={0}
              y={0}
              pathLength={100}
              className="rect"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .nav {
          position: relative;
          width: 400px;
          height: 60px;
          border-radius: 40px;
        }

        .container {
          position: absolute;
          inset: 0;
          background: rgba(16, 16, 16, 0.4);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0.5em;
        }

        .outline {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .rect {
          stroke: #e4ae0b;
          stroke-dashoffset: 5;
          stroke-dasharray: 0 0 10 40 10 40;
          transition: 0.5s;
        }

        .container:hover .outline .rect {
          transition: 999999s;
          stroke-dashoffset: 1;
          stroke-dasharray: 0;
        }

        .btn {
          padding: 0.5em 1.5em;
          color: #fff;
          cursor: pointer;
          transition: 0.1s;
          z-index: 1;
        }

        .btn:hover {
          background: #e4ae0b;
          border-radius: 10px;
        }

        /* Hover positions */
        .btn:nth-child(1):hover ~ svg .rect {
          stroke-dasharray: 0 2 8 73.3 8 10.7;
        }

        .btn:nth-child(2):hover ~ svg .rect {
          stroke-dasharray: 0 12.6 9.5 49.3 9.5 31.6;
        }

        .btn:nth-child(3):hover ~ svg .rect {
          stroke-dasharray: 0 24.5 8.5 27.5 8.5 55.5;
        }

        .btn:nth-child(4):hover ~ svg .rect {
          stroke-dasharray: 0 34.7 6.9 10.2 6.9 76;
        }

        .btn:hover ~ .outline .rect {
          stroke-dashoffset: 0;
          transition: 0.5s !important;
        }
      `}</style>
    </div>
  );
};

export default Navbar;

"use client";

import React from "react";

type SendButtonProps = {
  onClick?: () => void;
};

const SendMessageButton: React.FC<SendButtonProps> = ({ onClick }) => {
  return (
    <>
      <button className="send-btn" onClick={onClick}>
        <div className="outline" />

        {/* DEFAULT STATE */}
        <div className="state state--default">
          <div className="icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63Z"
                  fill="currentColor"
                />
                <path
                  d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18L13.16 9.53"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>

          <p>
            {"SendMessage".split("").map((char, i) => (
              <span key={i} style={{ ["--i" as any]: i }}>
                {char}
              </span>
            ))}
          </p>
        </div>

        {/* SENT STATE */}
        <div className="state state--sent">
          <div className="icon">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75Z" />
              <path d="M10.5795 15.5801L7.21945 12.5301L10.5795 15.5801Z" />
            </svg>
          </div>

          <p>
            {"Sent".split("").map((char, i) => (
              <span key={i} style={{ ["--i" as any]: i + 5 }}>
                {char}
              </span>
            ))}
          </p>
        </div>
      </button>

      <style jsx>{`
        /* 🔥 FULL ORIGINAL CSS — UNTOUCHED BEHAVIOR */
        .send-btn {
          --primary: #ff5569;
          --neutral-1: #f7f8f7;
          --neutral-2: #e7e7e7;
          --radius: 14px;

          cursor: pointer;
          border-radius: var(--radius);
          border: none;
          min-width: 200px;
          height: 68px;
          padding: 20px;
          font-size: 18px;
          font-weight: 600;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .state {
          z-index: 2;
          display: flex;
          align-items: center;
          position: relative;
        }

        .state--sent {
          display: none;
        }

        .send-btn:focus .state--default {
          position: absolute;
        }

        .send-btn:focus .state--sent {
          display: flex;
        }

        .outline {
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .send-btn:hover .outline {
          opacity: 1;
        }

        .state p span {
          opacity: 0;
          animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default SendMessageButton;

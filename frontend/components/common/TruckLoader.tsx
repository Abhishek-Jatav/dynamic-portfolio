const TruckLoader = () => {
  return (
    <>
      <div className="loader">
        <div className="truckWrapper">
          <div className="truckBody">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 198 93"
              className="trucksvg">
              <path
                strokeWidth="3"
                stroke="#282828"
                fill="#F83D3D"
                d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
              />
              <path
                strokeWidth="3"
                stroke="#282828"
                fill="#7D7C7C"
                d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
              />
              <rect
                strokeWidth="3"
                stroke="#282828"
                fill="#DFDFDF"
                rx="2.5"
                height="90"
                width="121"
                y="1.5"
                x="6.5"
              />
            </svg>
          </div>

          <div className="truckTires">
            {[1, 2].map((i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                className="tiresvg">
                <circle
                  strokeWidth="3"
                  stroke="#282828"
                  fill="#282828"
                  r="13.5"
                  cx="15"
                  cy="15"
                />
                <circle fill="#DFDFDF" r="7" cx="15" cy="15" />
              </svg>
            ))}
          </div>

          <div className="road" />

          <svg viewBox="0 0 453.459 453.459" className="lampPost">
            <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954..." />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .truckWrapper {
          width: 200px;
          height: 100px;
          display: flex;
          flex-direction: column;
          position: relative;
          align-items: center;
          justify-content: flex-end;
          overflow-x: hidden;
        }

        .truckBody {
          width: 130px;
          margin-bottom: 6px;
          animation: motion 1s linear infinite;
        }

        @keyframes motion {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(3px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .truckTires {
          width: 130px;
          display: flex;
          justify-content: space-between;
          padding: 0 10px 0 15px;
          position: absolute;
          bottom: 0;
        }

        .tiresvg {
          width: 24px;
        }

        .road {
          width: 100%;
          height: 1.5px;
          background: #282828;
          border-radius: 3px;
          position: relative;
        }

        .road::before,
        .road::after {
          content: "";
          position: absolute;
          height: 100%;
          background: #282828;
          animation: roadAnimation 1.4s linear infinite;
        }

        .road::before {
          width: 20px;
          right: -50%;
          border-left: 10px solid white;
        }

        .road::after {
          width: 10px;
          right: -65%;
          border-left: 4px solid white;
        }

        .lampPost {
          position: absolute;
          bottom: 0;
          right: -90%;
          height: 90px;
          animation: roadAnimation 1.4s linear infinite;
        }

        @keyframes roadAnimation {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-350px);
          }
        }
      `}</style>
    </>
  );
};

export default TruckLoader;

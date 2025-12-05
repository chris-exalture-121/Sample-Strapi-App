import React from "react";

const Spinner = ({ size = 40, color = "#4caf50", backgroundColor = "#fff" }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <div
        style={{
          width: size,
          height: size,
          border: `4px solid ${backgroundColor}`,
          borderTop: `4px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;

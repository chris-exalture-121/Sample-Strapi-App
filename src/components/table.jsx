import React from "react";

const ReusableTable = ({ data, renderAction }) => {
  if (!Array.isArray(data) || data.length === 0) return <p style={{ color: "#fff" }}>No data found.</p>;

  const columns = Object.keys(data[0]);

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "Arial, sans-serif" }}>
      <thead>
        <tr style={{ backgroundColor: "#1f1f1f", color: "#fff" }}>
          {columns.map((col) => (
            <th
              key={col}
              style={{
                border: "1px solid #333",
                padding: "8px",
                textAlign: "left",
              }}
            >
              {col.toUpperCase()}
            </th>
          ))}
          {renderAction && (
            <th style={{ border: "1px solid #333", padding: "8px" }}>Action</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={row.id || JSON.stringify(row)}
            style={{ backgroundColor: idx % 2 === 0 ? "#2a2a2a" : "#232323", color: "#fff" }}
          >
            {columns.map((col) => (
              <td key={col} style={{ border: "1px solid #333", padding: "8px" }}>
                {row[col]}
              </td>
            ))}
            {renderAction && (
              <td style={{ border: "1px solid #333", padding: "8px" }}>{renderAction(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;

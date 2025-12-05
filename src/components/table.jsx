import React, { useState, useMemo } from "react";

const ReusableTable = ({ data, renderAction }) => {
  const [search, setSearch] = useState("");

  if (!Array.isArray(data) || data.length === 0)
    return (
      <p style={{ color: "#ccc", fontSize: "14px", padding: "20px" }}>
        No data found.
      </p>
    );

  const columns = Object.keys(data[0]).filter(
    (col) => typeof data[0][col] !== "object"
  );

  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!search) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col]).toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, data, columns]);

  return (
    <div style={{ height: "80vh", overflowY: "auto", background: "#111", padding: "0", margin: "0" }}>
      {/* Search box */}
      <div style={{ padding: "10px", background: "#181818", position: "sticky", top: 0, zIndex: 10 }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #333",
            background: "#1b1b1b",
            color: "#fff",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: "14px",
          color: "#f1f1f1",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  position: "sticky",
                  top: "42px", // below the search bar
                  background: "#181818",
                  padding: "14px 12px",
                  fontWeight: 600,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.6px",
                  borderBottom: "1px solid #2e2e2e",
                  zIndex: 5,
                }}
              >
                {col}
              </th>
            ))}

            {renderAction && (
              <th
                style={{
                  position: "sticky",
                  top: "42px", // below search bar
                  background: "#181818",
                  padding: "14px 12px",
                  fontWeight: 600,
                  fontSize: "13px",
                  borderBottom: "1px solid #2e2e2e",
                  zIndex: 5,
                }}
              >
                ACTION
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (renderAction ? 1 : 0)} style={{ padding: "20px", textAlign: "center", color: "#ccc" }}>
                No results found
              </td>
            </tr>
          ) : (
            filteredData.map((row, idx) => (
              <tr
                key={row.id || JSON.stringify(row)}
                style={{
                  background: idx % 2 === 0 ? "#1b1b1b" : "#161616",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    idx % 2 === 0 ? "#1b1b1b" : "#161616")
                }
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    style={{
                      padding: "12px 10px",
                      borderBottom: "1px solid #2b2b2b",
                      fontSize: "13px",
                      color: "#ddd",
                    }}
                  >
                    {row[col]}
                  </td>
                ))}

                {renderAction && (
                  <td
                    style={{
                      padding: "12px 10px",
                      borderBottom: "1px solid #2b2b2b",
                      fontSize: "13px",
                    }}
                  >
                    {renderAction(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;

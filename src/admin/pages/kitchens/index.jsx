import React, { useEffect, useState } from "react";
import ReusableTable from "../../../components/table";
import { useFetchClient } from "@strapi/admin/strapi-admin";
import Spinner from "../../../components/Spinner";

const normalizeOrders = (kitchens) => {
  return kitchens.map((k) => ({
    id: k.id,
    name: k.name,
    address: k.address,
    latitude: k.latitude ? Number(k.latitude) : null,
    longitude: k.longitude ? Number(k.longitude) : null,
    approvalStatus: k.approvalStatus,
    licenseNumber: k.licenseNumber,
    licenseProvider: k.licenseProvider ?? "",
    status: Boolean(k.status),
    averageRating: Number(k.averageRating ?? 0),
  }));
};

const KitchensPage = () => {
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(false);
  const { get, post } = useFetchClient();

  const loadKitchens = async () => {
    setLoading(true);
    try {
      const res = await get("/api/kitchen");
      setKitchens(normalizeOrders(res?.data.data || []));
    } catch (err) {
      console.error("Error loading kitchens:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (kitchen) => {
    const newStatus =
      kitchen.approvalStatus === "approved" ? "pending" : "approved";
    await post("/api/kitchen/update-approval-status", {
      kitchenId: kitchen.id,
      approvalStatus: newStatus,
    });
    loadKitchens();
  };

  useEffect(() => {
    loadKitchens();
  }, []);

  return (
    <div style={{ padding: "20px", height: "100vh", color: "#fff", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>Kitchens</h1>

      <div
        style={{
          height: "calc(100% - 100px)",
          overflowY: "hidden",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#1e1e1e",
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <ReusableTable
            data={kitchens}
            renderAction={(row) => (
              <button
                onClick={() => toggleApproval(row)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: row.approvalStatus === "approved" ? "#ff4d4f" : "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
                onMouseLeave={(e) => (e.target.style.opacity = 1)}
              >
                {row.approvalStatus === "approved" ? "Revoke" : "Approve"}
              </button>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default KitchensPage;

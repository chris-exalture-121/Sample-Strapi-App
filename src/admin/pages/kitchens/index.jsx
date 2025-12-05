import React, { useEffect, useState } from "react";
import  ReusableTable  from "../../../components/table";
import { useFetchClient } from "@strapi/admin/strapi-admin";

const KitchensPage = () => {
  const [kitchens, setKitchens] = useState([]);
  const { get, post } = useFetchClient();

  const loadKitchens = async () => {
    const res = await get("/api/kitchen");
    setKitchens(res?.data.data || []);
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
    <div style={{ padding: 20 }}>
      <h1>Kitchens</h1>
      <ReusableTable
        data={kitchens}
        renderAction={(row) => (
          <button
            onClick={() => toggleApproval(row)}
            style={{
              padding: "6px 12px",
              backgroundColor:
                row.approvalStatus === "approved" ? "#ff4d4f" : "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {row.approvalStatus === "approved" ? "Revoke" : "Approve"}
          </button>
        )}
      />
    </div>
  );
};

export default KitchensPage;

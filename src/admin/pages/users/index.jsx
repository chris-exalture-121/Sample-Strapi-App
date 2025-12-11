import React, { useEffect, useState } from "react";
import { useFetchClient } from "@strapi/admin/strapi-admin";
import ReusableTable from "../../../components/table";
import { DateTime } from "luxon";
import Spinner from "../../../components/Spinner"; // Make sure you have a Spinner component

const normalizeUsers = (users = []) => {
  return users.map((user) => {
    return {
      id: user.id,
      name: user.name || "-",
      email: user.email || "-",
      phone: user.phone || "-",
      role: user.role || "user",
      is_delivery_available: user.is_delivery_available || "-",
      created_at: DateTime.fromISO(user.createdAt).toFormat("LLL d, yyyy"),
      updated_at: DateTime.fromISO(user.updatedAt).toFormat("LLL d, yyyy"),
    };
  });
};

const UsersPage = () => {
  const { get, del } = useFetchClient();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await get("/api/users");
      const normalizedUsers = normalizeUsers(res?.data || []);
      setUsers(normalizedUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      await del(`/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user");
    }
  };

  const renderAction = (row) => (
    <button
      onClick={() => deleteUser(row.id)}
      style={{
        padding: "6px 12px",
        backgroundColor: "#ff4757",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: 600,
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff3838")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4757")}
    >
      Delete
    </button>
  );

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ padding: 20, height: "100vh", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: 20, fontSize: 28 }}>Users</h1>

      <div
        style={{
          maxHeight: "calc(100% - 60px)",
          overflowY: "auto",
          borderRadius: 8,
          backgroundColor: "#1f1f1f",
          padding: 10,
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <ReusableTable data={users} renderAction={renderAction} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;

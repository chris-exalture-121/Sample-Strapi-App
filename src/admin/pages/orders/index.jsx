import React, { useEffect, useState } from "react";
import { useFetchClient } from "@strapi/admin/strapi-admin";
import ReusableTable from "../../../components/table";
import { DateTime } from "luxon";
import Spinner from "../../../components/Spinner"; // Make sure you have a Spinner component

const normalizeOrders = (orders = []) => {
  return orders.map((order) => {
    const itemsSummary =
      order.orderItems
        ?.map((i) => `${i.menuItem?.item_name} x${i.quantity}`)
        .join(", ") || "";

    return {
      id: order.id,
      status: order.status,
      totalAmount: Number(order.totalAmount),
      createdAt: DateTime.fromISO(order.createdAt).toFormat("LLL d, yyyy"),
      scheduledAt: DateTime.fromISO(order.scheduledAt).toFormat("LLL d, yyyy"),
      customerName: order.user?.name || "",
      customerPhone: order.user?.phone || "",
      addressText: `${order.address?.label} - ${order.address?.address}`,
      kitchenName: order.kitchen?.name || "",
      kitchenAddress: order.kitchen?.address || "",
      itemsSummary,
      itemsCount: order.orderItems?.length || 0,
    };
  });
};

const OrdersPage = () => {
  const { get } = useFetchClient();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await get("/api/orders");
      const normalizedOrders = normalizeOrders(res?.data?.data);
      setOrders(normalizedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div style={{ padding: 20, height: "100vh", boxSizing: "border-box" }}>
      <h1 style={{ marginBottom: 20 }}>Orders</h1>

      <div
        style={{
          maxHeight: "calc(100% - 60px)",
          overflowY: "auto",
          borderRadius: 8,
          backgroundColor: "#1f1f1f",
          padding: 10,
        }}
      >
        {loading ? <Spinner /> : <ReusableTable data={orders} />}
      </div>
    </div>
  );
};

export default OrdersPage;

import React, { useEffect, useState } from "react";
import AdminWrapper from "@/components/shared/common/layouts/AdminWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setTrackingNumber(order.deliveryNumber || "");
    setShowTrackingModal(true);
  };

  const handleSubmitTracking = async () => {
    try {
      // Replace with your real API endpoint
      const res = await fetch("/api/update-tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          trackingNumber,
        }),
      });

      if (!res.ok) throw new Error("Failed to update tracking");

      // Close modal & optionally refresh state/UI
      setShowTrackingModal(false);
      console.log("Tracking updated!");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch stats data from API
    // fetch("/api/stats")
    //   .then((res) => res.json())
    //   .then((data) => setStats(data))
    //   .catch((err) => console.error("Failed to fetch stats:", err));

    const stats = [
      { label: "Total Orders", count: 630 },
      { label: "Cancel Orders", count: 241 },
      { label: "Delivered Orders", count: 490 },
      { label: "Order Delivering", count: 170 },
      { label: "Website visits", count: 608 },
    ];
    setStats(stats);

    // Fetch orders data from API
    // fetch("/api/orders")
    //   .then((res) => res.json())
    //   .then((data) => setOrders(data))
    //   .catch((err) => console.error("Failed to fetch orders:", err));

    const orders = [
      {
        id: "123",
        date: "12/02/2025",
        customer: "rohit kumar",
        total: "1200",
        paymentStatus: "paid",
        itemsCount: "3",
        deliveryNumber: "HHJEJ4J5J5HJ",
        deliveryStatus: "spipped",
      },
    ];
    setOrders(orders);
  }, []);

  return (
    <AdminWrapper title="Dashboard">
      <Dialog open={showTrackingModal} onOpenChange={setShowTrackingModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Update Tracking Number
            </DialogTitle>
            <DialogDescription>
              Enter the new tracking number for the shipment. Click submit to
              save your changes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Tracking Number</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowTrackingModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitTracking}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="text-center">
              <CardContent className="py-6">
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <select className="border rounded px-2 py-1 text-sm">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Order ID</th>
                  <th className="p-2">Created at</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Payment Status</th>
                  <th className="p-2">No. of Items</th>
                  <th className="p-2">Delivery Number</th>
                  <th className="p-2">Delivery Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 font-medium text-blue-600">
                      {order.id}
                    </td>
                    <td className="p-2">{order.date}</td>
                    <td className="p-2 text-orange-600 font-medium">
                      {order.customer}
                    </td>
                    <td className="p-2">{order.total}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          order.paymentStatus === "paid"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-2">{order.itemsCount}</td>
                    <td className="p-2">{order.deliveryNumber}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.deliveryStatus === "delivered"
                            ? "bg-green-500"
                            : order.deliveryStatus === "canceled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="p-2 space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(order)}
                      >
                        <Pencil size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
}

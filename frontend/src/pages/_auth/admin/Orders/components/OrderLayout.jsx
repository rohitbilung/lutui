import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const OrdersLayout = ({ orders = [], isLoading = false }) => {
  const [view, setView] = useState("list");

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-4 space-y-3">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order._id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-medium">₹{order.totalPrice}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">User</p>
              <p>{order.user?.name || "N/A"}</p>
            </div>
            <div>
              <Badge variant="outline">{order.delhiveryStatus}</Badge>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <Card key={order._id} className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Order</span>
            <Badge>{order.delhiveryStatus}</Badge>
          </div>
          <p className="text-lg font-semibold">{order._id}</p>
          <p className="text-sm">User: {order.user?.name || "N/A"}</p>
          <p className="text-sm">Amount: ₹{order.totalPrice}</p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(order.createdAt), "dd MMM yyyy, hh:mm a")}
          </p>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Orders</h2>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(val) => val && setView(val)}
        >
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {isLoading
        ? renderSkeleton()
        : orders.length === 0
        ? <p className="text-center text-muted-foreground">No orders found.</p>
        : view === "grid"
        ? renderGridView()
        : renderListView()}
    </div>
  );
};

export default OrdersLayout;

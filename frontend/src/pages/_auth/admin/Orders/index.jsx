import AdminWrapper from "@/components/shared/common/layouts/AdminWrapper";
import { useGetOrders } from "../../../../lib/queries/queries";
import OrdersLayout from "./components/OrderLayout";
import { PaginationControls } from "../../../../components/shared/common/PaginationControls";
import { useState } from "react";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const { data, isPending } = useGetOrders({
    limit: limit,
    page: page,
    userId: "",
    paymentStatus: "",
  });

  const totalPages = data?.pagination.total_pages || 1;

  return (
    <AdminWrapper title="Orders">
      <div className="flex flex-col gap-4">
        <OrdersLayout orders={data?.data || []} isLoading={isPending} />

        <div>
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(num) => setPage(num)}
          />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default Orders;

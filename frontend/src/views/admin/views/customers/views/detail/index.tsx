import {
  CustomerDetailHeader,
  CustomerInfoSidebar,
  CustomerOrders,
  CustomerOrderStatistics,
} from "./components";

const CustomerDetail = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <CustomerDetailHeader />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <CustomerOrderStatistics />
            <CustomerOrders />
          </div>

          <div className="space-y-6">
            <CustomerInfoSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;

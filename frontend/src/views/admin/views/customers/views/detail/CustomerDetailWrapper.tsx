import { FC, PropsWithChildren } from "react";
import CustomerDetailContext, {
  CustomerDetailContextValue,
} from "./CustomerDetailContext";
import { useParams } from "react-router-dom";
import useGetCustomerByIdQuery from "@/api/queries/useGetCustomerByIdQuery";
import ViewLoading from "@/components/common/ViewLoading";

const CustomerDetailWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { customerId } = useParams();
  const { data: customer, isPending } = useGetCustomerByIdQuery(
    Number(customerId || 0),
  );

  if (isPending || !customer) {
    return <ViewLoading />;
  }

  const value: CustomerDetailContextValue = {
    customer,
  };

  return (
    <CustomerDetailContext.Provider value={value}>
      {children}
    </CustomerDetailContext.Provider>
  );
};

export default CustomerDetailWrapper;

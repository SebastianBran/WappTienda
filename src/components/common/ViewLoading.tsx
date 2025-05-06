import Spinner from "./Spinner";

const ViewLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      Cargando
      <Spinner className="h-10 w-10 ml-5 text-green-500" />
    </div>
  );
};

export default ViewLoading;

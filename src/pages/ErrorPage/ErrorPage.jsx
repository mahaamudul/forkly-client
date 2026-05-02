import { Link, useRouteError } from "react-router-dom";
import notFound from "../../assets/404.gif";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-200 px-[10px] text-center">
      <img className="mb-8 max-w-md rounded-lg" src={notFound} alt="Page not found" />
      <h1 className="text-4xl font-bold">This page is not on the menu</h1>
      <p className="my-4 max-w-xl text-slate-600">
        {error?.statusText || error?.message || "The page you requested could not be found."}
      </p>
      <Link to="/" className="btn bg-orange-400 text-black">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

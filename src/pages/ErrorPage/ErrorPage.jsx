import { Link, useRouteError } from "react-router-dom";
import notFound from "../../assets/404.gif";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 py-16 text-center">
      <div className="content-shell">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <img className="mb-8 w-full max-w-md rounded-lg" src={notFound} alt="Page not found" />
          <h1 className="text-4xl font-bold">This page is not on the menu</h1>
          <p className="my-4 max-w-xl text-slate-600">
            {error?.statusText || error?.message || "The page you requested could not be found."}
          </p>
          <Link to="/" className="btn bg-orange-400 text-black">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

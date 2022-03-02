import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className=" h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>Page Not Found | Crave ~ Food</title>
    </Helmet>
    <h2 className=" font-semibold text-2xl mb-3">Page Not found</h2>
    <h4 className=" font-medium text-base mb-5">
      The page you are looking for does not exist
    </h4>
    <Link className="link" to="/">
      Go back home &rarr;{" "}
    </Link>
  </div>
);

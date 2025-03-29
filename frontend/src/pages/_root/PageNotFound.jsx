import React from "react";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../components/shared/common/layouts/PageContent";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <PageWrapper>
      <PageContent title="Page not found!" contentClass="flex flex-col items-center">
        <p>It seems the page you are looking for does not exist.</p>
        <p>
          <Link to="/" className="text-blue-600">
            Click here
          </Link>{" "}
          to go to the homepage.
        </p>
      </PageContent>
    </PageWrapper>
  );
};

export default PageNotFound;

import React from "react";
import { Link } from "react-router-dom";

import Page from "./Page";

function notFound() {
  return (
    <Page title="Not Found">
      <h2>Page not found.</h2>
      <p className="lead text-muted">
        Whoops...it seems this post doesn't exist. Go back to the{" "}
        <Link to="/">homepage</Link> to start again.
      </p>
    </Page>
  );
}

export default notFound;

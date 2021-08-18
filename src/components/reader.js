import React, { useEffect } from "react";
import Cookies from "js-cookie";

import ReaderLoad from "./BookReaderJSAdvanced";
function AdvanceLoad(params) {
  const token = Cookies.get("token");

  useEffect(() => {
    // Update the document title using the browser API
    ReaderLoad("#BookReader1", params, 100, token);
  });

  return <div id="BookReader1"> Loading Viewer... </div>;
}

export default AdvanceLoad;

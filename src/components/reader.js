import React, { useEffect } from "react";
import instantiateBookReader from "./BookReaderJSSimple";

import ReaderLoad from "./BookReaderJSAdvanced";
function ViewBooks() {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    instantiateBookReader("#BookReader1");
  });

  return <div id="BookReader1">BookReader1</div>;
}

function AdvanceLoad() {
  useEffect(() => {
    // Update the document title using the browser API
    ReaderLoad("#BookReader1");
  });

  return <div id="BookReader1">BookReader1</div>;
}

export default AdvanceLoad;

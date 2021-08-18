import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReaderLoad from "./components/BookReaderJSAdvanced";
import Cookies from "js-cookie";

function Reader() {
  const [slug, setSlug] = useState("");
  let params = useParams();

  useEffect(() => {
    let token = Cookies.get("token");
    setSlug(params.itemid);
    if (slug) {
      ReaderLoad("#BookReader1", slug, 10, token);
    }
  }, [params, slug]);

  return <div id="BookReader1"></div>;
}

export default Reader;

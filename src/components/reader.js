import React, { useEffect } from "react";
import instantiateBookReader from "./BookReaderJSSimple";
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';

import ReaderLoad from "./BookReaderJSAdvanced";
function ViewBooks(params) {
  const totalPage = useSelector(state => state.pageCount)
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    instantiateBookReader("#BookReader1", params, totalPage);
  });

  return <div id="BookReader1">BookReader1</div>;
}

function AdvanceLoad(params) {
  const totalPage = useSelector(state => state.pageCount)
  const token = Cookies.get('token')
  console.log(token)
  useEffect(() => {
    // Update the document title using the browser API
    ReaderLoad("#BookReader1", params, totalPage, token);
  });

  return <div id="BookReader1">BookReader1</div>;
}

export default AdvanceLoad;

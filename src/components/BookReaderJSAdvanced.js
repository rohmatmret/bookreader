//
// This file shows the minimum you need to provide to BookReader to display a book
//
// Copyright(c)2008-2009 Internet Archive. Software license AGPL version 3.

// Create the BookReader object
import axios from "axios";
import BookReader from "../BookReader";
import "../BookReader.css";
import "../BookReaderDemo.css";
let ready = false;
const GetImages = async (itemid, index, token) => {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}`;
  let getImage = [];
  await axios
    .get(`${baseUrl}items/${itemid}/web-reader/${index}.jpg`, {
      headers: { Authorization: token },
      responseType: "blob",
    })
    .then((response) => {
      let blob = window.URL.createObjectURL(response.data);
      getImage.push({
        uri: blob,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  const results = await Promise.all(getImage).then((results) => {
    return results;
  });
  return results;
};
const ReaderLoad = async (selector, itemId, pageCount, token) => {
  selector = selector || "BookReader1";

  const first = await GetImages(itemId, pageCount, token);

  var options = {
    data: [first],
    //enableChaptersPlugin: true,
    // Total number of leafs
    thumbMaxLoading: function () {
      return 1000;
    },
    getNumLeafs: function () {
      return parseInt(pageCount);
    },

    // Return the width of a given page.  Here we assume all images are 800 pixels wide
    getPageWidth: function (index) {
      return 800;
    },

    // Return the height of a given page.  Here we assume all images are 1200 pixels high
    getPageHeight: function (index) {
      return 1200;
    },
    // Return which side, left or right, that a given page should be displayed on
    getPageSide: function (index) {
      if (0 == (index & 0x1)) {
        return "R";
      } else {
        return "L";
      }
    },
    getNextPage: function (index) {
      console.log("page " + index);
    },
    getPageNum: function (index) {
      return index + 1;
    },
    // This function returns the left and right indices for the user-visible
    // spread that contains the given index.  The return values may be
    // null if there is no facing page or the index is invalid.
    getSpreadIndices: function (pindex) {
      var spreadIndices = [null, null];
      if ("rl" == this.pageProgression) {
        // Right to Left
        if (this.getPageSide(pindex) == "R") {
          spreadIndices[1] = pindex;
          spreadIndices[0] = pindex + 1;
        } else {
          // Given index was LHS
          spreadIndices[0] = pindex;
          spreadIndices[1] = pindex - 1;
        }
      } else {
        // Left to right
        if (this.getPageSide(pindex) == "L") {
          spreadIndices[0] = pindex;
          spreadIndices[1] = pindex + 1;
        } else {
          // Given index was RHS
          spreadIndices[1] = pindex;
          spreadIndices[0] = pindex - 1;
        }
      }

      return spreadIndices;
    },
    bookTitle: "BookReader Advanced Demo",
    bookUrl: "../index.html",
    bookUrlText: "Back to Home",
    bookUrlTitle: "This is the book URL title",
    metadata: [
      { label: "Title", value: "Open Library BookReader Presentation" },
      { label: "Author", value: "Gramedia" },
      {
        label: "Demo Info",
        value:
          "This demo shows how one could use BookReader with their own content.",
      },
    ],
    // This toggles the mobile drawer (not shown in 'embed' mode)
    enableMobileNav: false,
    mobileNavTitle: "BookReader demo",

    // Override the path used to find UI images
    //imagesBaseURL: "/images/",
    el: selector,
    ui: "full", // embed, full (responsive)
  };

  if (first.length > 0) {
    var br;
    br = new BookReader(options);
    br.init();
  }
};

export default ReaderLoad;

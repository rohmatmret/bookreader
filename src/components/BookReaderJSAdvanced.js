//
// This file shows the minimum you need to provide to BookReader to display a book
//
// Copyright(c)2008-2009 Internet Archive. Software license AGPL version 3.

// Create the BookReader object
import BookReader from "../BookReader";
import '../BookReader.css';
import '../BookReaderDemo.css';
import axios from 'axios';


export default async function ReaderLoad(selector,extraOptions, pageCount, token) {
  selector = selector || "BookReader1";
  extraOptions = Number(extraOptions.params) 

  const ImageItems = async (index) => {
    let Result = await axios.get(
      `https://dev.apps-foundry.com/scoopcor/api/v1/items/197200/web-reader/${index}.jpg`,
      { headers: { Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25zIjpbXSwidXNlcl9pZCI6MTg1NDgxOCwiZXhwIjoxNjI5MDAyMDQyLCJyb2xlcyI6WzldLCJpc3MiOiJTQ09PUCIsInNpZyI6ImIwNzI3NjdlYzU0ZGNkNWFkODU1MGFjMmNjODIzMWRjODlkMTg1NWEiLCJleHBpcmVfdGltZWRlbHRhIjowLCJ1c2VyX25hbWUiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZW1haWwiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZGV2aWNlX2lkIjpudWxsfQ.DNIoz8w-h1PpyLPkmziz9vzmc9tyDXJgamQZ7aQ0wdY' }, responseType: 'blob' }
    )
    let image = window.URL.createObjectURL(Result.data);
    return image
  };

  var abc = []
  var def = []
  var k;
  abc.push(
    await axios.get(`https://dev.apps-foundry.com/scoopcor/api/v1/items/197200/web-reader/1.jpg`,
    { headers: { Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25zIjpbXSwidXNlcl9pZCI6MTg1NDgxOCwiZXhwIjoxNjI5MDAyMDQyLCJyb2xlcyI6WzldLCJpc3MiOiJTQ09PUCIsInNpZyI6ImIwNzI3NjdlYzU0ZGNkNWFkODU1MGFjMmNjODIzMWRjODlkMTg1NWEiLCJleHBpcmVfdGltZWRlbHRhIjowLCJ1c2VyX25hbWUiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZW1haWwiOiJqYXRtaWtvLmRhdGFAZ21haWwuY29tIiwiZGV2aWNlX2lkIjpudWxsfQ.DNIoz8w-h1PpyLPkmziz9vzmc9tyDXJgamQZ7aQ0wdY' }, responseType: 'blob' }
    ).then(response => {
      // do something with response
      let image = window.URL.createObjectURL(response.data);
      def.push(image);
    })
  )

  Promise.all(abc).then(() => console.log(def));
  k = def;


  var options = {
    // Total number of leafs
    getNumLeafs: function () {
      return pageCount;
    },

    // Return the width of a given page.  Here we assume all images are 800 pixels wide
    getPageWidth: function (index) {
      return 800;
    },

    // Return the height of a given page.  Here we assume all images are 1200 pixels high
    getPageHeight: function (index) {
      return 1200;
    },

    // We load the images from archive.org -- you can modify this function to retrieve images
    // using a different URL structure
    getPageURI: function (index, reduce, rotate) {
      // reduce and rotate are ignored in this simple implementation, but we
      // could e.g. look at reduce and load images from a different directory
      // or pass the information to an image server
      // if(extraOptions !== 0){
      //   var url =`https://dev.apps-foundry.com/scoopcor/api/v1/items/${extraOptions}/ebook-reader/${index+1}.jpg`
      // }
      var url = Object.assign({}, k)
      return url[index];
    }, 

    // Return which side, left or right, that a given page should be displayed on
    getPageSide: function (index) {
      if (0 == (index & 0x1)) {
        return "R";
      } else {
        return "L";
      }
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

    // For a given "accessible page index" return the page number in the book.
    //
    // For example, index 5 might correspond to "Page 1" if there is front matter such
    // as a title page and table of contents.
    getPageNum: function (index) {
      return index + 1;
    },

    // Book title and the URL used for the book title link
    bookTitle: "BookReader Advanced Demo",
    bookUrl: "../index.html",
    bookUrlText: "Back to Home",
    bookUrlTitle: "This is the book URL title",
    // thumbnail is optional, but it is used in the info dialog
    thumbnail: extraOptions !== 0 && `https://dev.apps-foundry.com/scoopcor/api/v1/items/${extraOptions}/ebook-reader/1.jpg`,
    // Metadata is optional, but it is used in the info dialog
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
    // imagesBaseURL: "../BookReader/images/",

    // getEmbedCode: function (frameWidth, frameHeight, viewParams) {
    //   return "Embed code not supported in bookreader demo.";
    // },

    // Note previously the UI param was used for mobile, but it's going to be responsive
    // embed === iframe
    el: selector,
    ui: "full", // embed, full (responsive)
    loadWithAjax: true,
    getAjaxHeaders: {
      Authorization: token
    }
  };
  
  var br = new BookReader(options);

  // Let's go!
  br.init();
}

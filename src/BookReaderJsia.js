/**
 * This is a JavaScript script which contains functions for initing BookReader.
 * This is used by the public API, BookReaderJSIA.php.
 * There are clients who rely on BookReaderJSIA.php. So changes made, must be
 * backwards compatible. However, this file and the function BookReaderJSIAinit
 * are not advertised as part of the public API, so they can be decoupled.
 */

/*
Example Usage:

$(function() {
  $.getScript('//archive.org/bookreader/BookReaderJSIA.js')
  .done(function(script, textStatus) {
    $.ajax({
      url: '<JSIA DATA URL>',
      type: 'GET',
      dataType: 'jsonp'
    }).then(function(response) {
      BookReaderJSIAinit(response.data);
    });
  })
  .fail(function(jqxhr, settings, exception) {
    console.log('Error initializing bookreader');
  });
});
*/

/**
 * @param {data} JSIA payload
 */
window.BookReaderJSIAinit = (function () {
  /**
   * Builds options object used to instantiate BookReader
   * @param  {Object} data
   * @param  {Object} extraOptions
   * @gloabl brConfig - deprecated config object
   * @return {Object}
   */
  function buildOptions(data, initialOptions, extraOptions) {
    var options = initialOptions || {};

    // TODO check if the first true arg is correct.
    // It was recently removed from BookReader.js
    jQuery.extend(true, options, buildMetadataOptions(data));
    jQuery.extend(true, options, buildLendingInfoOptions(data));
    jQuery.extend(true, options, buildEmbedOptions(data));
    jQuery.extend(true, options, brConfigOptions());
    jQuery.extend(true, options, buildImageFetchingOptions(data));

    options.bookUrl = data.bookUrl;

    if (data.lendingInfo.isOpenLibraryLending) {
      options.bookUrlText =
        options.bookTitle + "<br>&larr; Back to book details on Open Library";
      options.bookUrlTitle = "Go to this book's page on Open Library";
      options.bookUrlMoreInfo = "More information on Open Library";
    } else {
      options.bookUrlText =
        options.bookTitle + "<br>&larr; Back to item details";
      options.bookUrlTitle = "Go to this book's page on Archive.org";
      options.bookUrlMoreInfo = "More information on Archive.org";
    }

    options.imagesBaseURL = "/bookreader/BookReader/images/";

    // For plugins
    options.olHost = data.olHost;

    // protected attempts to block downloading of images
    options.protected = data.lendingInfo.shouldProtectImages;
    options.thumbnail =
      "//archive.org/download/" + data.id + "/page/cover_t.jpg";
    options.enableExperimentalControls = true;
    options.enablePageResume = true;
    options.enableMobileNav = options.ui !== "embed";

    if (!isNaN(parseInt(options.defaultStartLeaf))) {
      // defaultStartLeaf takes precedence over the titleLeaf as the starting page.
      // Business logic determines whether it's Cover, Title, or another value.
      // Note that options.titleLeaf as used in BR really means "default leaf", whether
      // or not it's the title page leaf.
      options.titleLeaf = options.defaultStartLeaf;
    }

    if (extraOptions) {
      jQuery.extend(options, extraOptions);
    }

    return options;
  }

  /**
   * Builds medatadata which populates info window
   * @param  {Object} data
   * @return {Object} a subset of options
   */
  function buildMetadataOptions(data) {
    var options = {};

    var metadata = [];
    var bookTitle = Array(data.metadata.title).join(", ");
    if (bookTitle) {
      metadata.push({
        label: "Title",
        value: bookTitle,
        extraValueClass: "larger",
      });
    }
    if (data.metadata.creator) {
      metadata.push({
        label: "Author",
        value: Array(data.metadata.creator).join(", "),
        extraValueClass: "larger",
      });
    }
    if (data.metadata.publishDate) {
      metadata.push({
        label: "Publish Data",
        value: data.metadata.publishDate,
        extraValueClass: "",
      });
    }
    if (data.metadata.collection && data.metadata.collection.length > 0) {
      var colHtml = $.map(data.metadata.collection, function (v) {
        return '<a href="/details/' + v + '">' + v + "</a>";
      }).join(", ");
      metadata.push({
        label: "Collections",
        value: colHtml,
        extraValueClass: "",
      });
    }
    if (
      data.metadata.sponsor &&
      data.metadata.contributor &&
      data.metadata.sponsor == data.metadata.contributor
    ) {
      // Prevents redundant display
      metadata.push({
        label: "Sponsor &amp; Contributor",
        value: data.metadata.sponsor,
        extraValueClass: "",
      });
    } else {
      if (data.metadata.sponsor)
        metadata.push({
          label: "Sponsor",
          value: data.metadata.sponsor,
          extraValueClass: "",
        });
      if (data.metadata.contributor)
        metadata.push({
          label: "Contributor",
          value: data.metadata.contributor,
          extraValueClass: "",
        });
    }
    options.metadata = metadata;

    if (data.metadata.language) {
      var language =
        typeof data.metadata.language == "string"
          ? data.metadata.language
          : data.metadata[0]
          ? data.metadata[0]
          : null;
      options.bookLanguage = language;
    }

    return options;
  }

  /**
   * Builds lending info "options"
   * @param  {Object} data
   * @return {Object} a subset of options
   */
  function buildLendingInfoOptions(data) {
    var options = {};
    var lendingInfo = {};
    if (data.lendingInfo.loanId) {
      lendingInfo.loanId = data.lendingInfo.loanId;
    }
    options.lendingInfo = lendingInfo;
    return options;
  }

  /**
   * Builds the custom embed options
   * @param  {Object} data
   * @return {Object} an subset of options
   */
  function buildEmbedOptions(data) {
    var options = {};

    // getEmbedURL
    //________
    // Returns a URL for an embedded version of the current book
    var getEmbedURL = function (br, viewParams) {
      // We could generate a URL hash fragment here but for now we just leave at defaults
      var url = "https://" + window.location.host + "/stream/" + data.id;
      if (data.subPrefix != data.id) {
        // Only include if needed
        url += "/" + urlencodePath(data.subPrefix);
      }
      url += "?ui=embed";
      if (typeof viewParams != "undefined") {
        url += "#" + br.fragmentFromParams(viewParams);
      }
      return url;
    };

    // getEmbedCode
    //________
    // Returns the embed code HTML fragment suitable for copy and paste
    options.getEmbedCode = function (frameWidth, frameHeight, viewParams) {
      return (
        "<iframe src='" +
        getEmbedURL(this, viewParams) +
        "' width='" +
        frameWidth +
        "' height='" +
        frameHeight +
        "' frameborder='0' ></iframe>"
      );
    };
    return options;
  }

  /**
   * @globar brConfig
   * @return {Object}
   * @deprecated will go away soon
   */
  function brConfigOptions() {
    var options = {};

    // Check for config object
    // $$$ change this to use the newer params object
    if (typeof brConfig != "undefined") {
      if (typeof brConfig["ui"] != "undefined") {
        options.ui = brConfig["ui"];
      }

      if (brConfig["mode"] == 1) {
        options.mode = 1;
        if (typeof (brConfig["reduce"] != "undefined")) {
          options.reduce = brConfig["reduce"];
        }
      } else if (brConfig["mode"] == 2) {
        options.mode = 2;
      }
    }

    return options;
  }

  function buildImageFetchingOptions(data) {
    var options = [];

    // Augment image URI's with page scaling and rotating
    var builtInGetPageURI = BookReader.prototype.getPageURI;
    options.getPageURI = function (index, reduce, rotate) {
      if ("undefined" == typeof reduce) reduce = 1;
      if ("undefined" == typeof rotate) rotate = 0;
      // IA only supports power of 2 reduces
      reduce = Math.pow(2, Math.floor(Math.log2(Math.max(1, reduce))));
      var uri = builtInGetPageURI.call(this, index, reduce, rotate);
      if (!uri) {
        // This means that the search result "page number/index" is larger than the
        // preview sample set.
        // BR basically diffs search results against a full set of page leaves
        // This is the thing that makes the string "page N of N" in the desktop results pop up
        // It also uses the leaf info to draw the links of the results preview
        // so we will have to craft this
        return "";
      }
      uri = uri + (uri.indexOf("?") > -1 ? "&" : "?");
      uri = uri + "scale=" + reduce + "&rotate=" + rotate;
      return uri;
    };

    return options;
  }

  /**
   * Adds more features to BookReader prototype
   * @param {Object} data
   */
  function extendBookReaderPrototype(data) {
    // Override resume token, to take user into account
    // Get's the page resume value, for remembering reader's page
    var superGetResumeValue = BookReader.prototype.getResumeValue;
    BookReader.prototype.getResumeValue = function () {
      var val = null;
      if (data.lendingInfo.userid)
        val = BookReader.docCookies.getItem(
          "br-resume-" + data.lendingInfo.userid
        );
      if (val === null) val = superGetResumeValue.call(this);
      if (val !== null) val = parseInt(val);
      return val;
    };

    // Set's the page resume value, for remembering reader's page
    var superUpdateResumeValue = BookReader.prototype.updateResumeValue;
    BookReader.prototype.updateResumeValue = function (index) {
      var cookieName = data.lendingInfo.userid
        ? "br-resume-" + data.lendingInfo.userid
        : null;
      superUpdateResumeValue.call(this, index, cookieName);
    };

    /**
     * Extend buildInfoDiv to add more IA specific fields
     * @param JInfoDiv DOM element. Appends info to this element
     */
    var superBuildInfoDiv = BookReader.prototype.buildInfoDiv;
    BookReader.prototype.buildInfoDiv = function (jInfoDiv) {
      superBuildInfoDiv.apply(this, arguments);

      // add download URLS
      if (data.downloadUrls.length > 0 && this.iaHideOtherFormats === false) {
        var otherFormatsEl =
          '<div class="BRinfoOtherFormats">' +
          '<div class="BRinfoLabel">Other formats</div>';
        $.each(data.downloadUrls, function (index, row) {
          otherFormatsEl +=
            '<div class="BRinfoOtherFormatsFormat">' +
            '<a href="' +
            row[1] +
            '" target="_blank">' +
            row[0] +
            "</a>" +
            "</div>";
        });
        otherFormatsEl += "</div>";
        jInfoDiv.find(".BRinfoRightCol").append(otherFormatsEl);
      }

      // fill in footer
      jInfoDiv
        .find(".BRfloatFoot")
        .append(
          '  <a href="https://openlibrary.org/dev/docs/bookreader" target="_blank">' +
            "    About the BookReader" +
            "  </a>" +
            '  <span class="desktop-only">|&nbsp;&nbsp;</span>' +
            '  <a href="mailto:info@archive.org?subject=Book%20Reader%20Feedback" class="problem-icon" target="_blank">' +
            "    Report a problem" +
            "  </a>" +
            "</div>"
        );
    };
  }

  /**
   * Extends BookReader instance to add downloads to toolbar
   * @param {BookReader} br
   * @param {Object} data
   */
  function addDownloadsToToolbar(br, data) {
    /**
     * Decorate the desktop toolbar method
     */
    br.buildToolbarElement = (function (prevBuildToolbarElement) {
      var buildDownloadBody = function () {
        if (data.downloadUrls.length === 0) {
          return $(
            '<div class="pb10">We do not have a downloadable copy of this item available.</div>'
          );
        }
        var $downloadBody = $("<div/>");
        $downloadBody.append(
          '<div class="ph50-lg">Choose a format to begin your download. ' +
            "<br/><br/>" +
            "</div>"
        );
        // add download URLS
        var otherFormatsEl = '<div class="BRinfoOtherFormats">';
        $.each(data.downloadUrls, function (index, row) {
          otherFormatsEl +=
            '<div class="BRinfoOtherFormatsFormat">' +
            '<a href="' +
            row[1] +
            '" target="_blank">' +
            row[0] +
            "</a>" +
            "</div>";
        });
        otherFormatsEl += "</div>";
        $downloadBody.append(otherFormatsEl);
        return $downloadBody;
      };
      return function () {
        var $el = prevBuildToolbarElement.call(this);
        if (data.streamOnly) {
          return $el;
        }
        $el
          .find(".BRtoolbarRight")
          .prepend(
            "<span class='BRtoolbarSection BRtoolbarSectionDownload'>" +
              "  <button class='BRpill download js-tooltip' title='Download PDF/ePub'>" +
              "    <span class='hide-md'>PDF/ePub</span>" +
              "  </button>" +
              "</span>"
          );
        $el.find(".download").click(function () {
          showDialog({
            title: "Select Download Format",
            allowClose: true,
            body: buildDownloadBody(),
            foot: "",
          });
        });
        return $el;
      };
    })(br.buildToolbarElement);
  }

  function oldBookReaderDetected(options) {
    var el = options.el || "#BookReader";
    console.log(
      "Unsupported BookReader detected. Please upgrade. See https://github.com/internetarchive/bookreader"
    );

    $(el)
      .html(
        '<div>Unsupported BookReader detected. Please upgrade to enable embed. See <a href="https://github.com/internetarchive/bookreader">BookReader Github</a>.<br>This book can be viewed on <a href="https://archive.org/details/' +
          options.bookId +
          '">Archive.org</a>.</div>'
      )
      .css({
        textAlign: "center",
        padding: "10px",
      });
  }

  /**
   * emit custom event when JSIA completes
   * @param {Object} postInitOptions
   * @param {String} postInitOptions.brVersion
   * @param {Array} postInitOptions.downloadURLs
   * @param {Boolean} postInitOptions.isRestricted
   */
  function emitBRJSIAPostInit(postInitOptions) {
    if (!CustomEvent) {
      return;
    }

    var event = new CustomEvent("BRJSIA:PostInit", {
      bubbles: true,
      captures: true,
      detail: postInitOptions,
    });
    document.dispatchEvent(event);
  }

  /**
   * This function is called with the response from JSIA.
   * @param {Object} data
   * @param {Object} (optional) extraOptions
   */
  return function (jsiaResponseData, extraOptions) {
    var isBeta = extraOptions ? extraOptions.isBeta : false;
    var data = jsiaResponseData.data;
    // Ultimately, the brOptions will be passed from the server
    // and little to no processing should happen here in JS
    var brOptions = jsiaResponseData.brOptions;
    var lendingInfo = jsiaResponseData.lendingInfo;
    var metadata = jsiaResponseData.metadata;

    // Attach to data for convenience
    data.lendingInfo = lendingInfo;
    data.metadata = metadata;
    window.onerror = logError;

    var options = buildOptions(data, brOptions, extraOptions);

    if (!BookReader.version) {
      oldBookReaderDetected(options);
      return;
    }

    extendBookReaderPrototype(data);
    var br = new BookReader(options);
    window.br = br; // for legacy support and debugging

    var isBeta = extraOptions ? extraOptions.isBeta : false;

    // Lending toolbar should be visible in following cases:-
    // 1. if lendingInfo has isPrintDisabledOnly
    // 2. if book has isRestricted for some reason but not is_login_required status (As per WEBDEV-3414, if user has logged in and book is in is_login_required, user can freely access that book)
    // 3. if lendingInfo has isLendingRequired and isBrowserBorrowable
    var isLending =
      lendingInfo.isPrintDisabledOnly ||
      (data.isRestricted && !lendingInfo.lendingStatus.is_login_required) ||
      (lendingInfo.isLendingRequired && lendingInfo.isBrowserBorrowable);

    if (window.Sentry) {
      Sentry.setTag("br_version", BookReader.version);
      Sentry.setTag("borrowable_book", isLending);
    }

    if (!isLending && options.ui !== "embed") {
      addDownloadsToToolbar(
        br,
        data
      ); /** deprecate function when stream is redirected */
      var postInitOptions = {
        brVersion: BookReader.version,
        downloadURLs: data.downloadUrls,
        isRestricted: data.isRestricted,
      };
      emitBRJSIAPostInit(postInitOptions);
      // Wait until above event completed; otherwise BR's size will be incorrect,
      // and it will try to fetch really useless tiny images
      setTimeout(function () {
        br.init();
      }, 100);
      return;
    }

    var loadBR = function loadBR(error) {
      var tokenPoller = new ArchiveOrgTokenPoller();
      // If no search access token, disable search
      // Todo: make errorMessage a br.property constant here and in SearchInsideAccess.js
      if (
        error &&
        typeof error !== "undefined" &&
        error.errorMessage === "no access token"
      ) {
        br.options.enableSearch = false;
      }

      var lendingFlow = new LendingFlow(
        br,
        lendingInfo,
        tokenPoller,
        data.downloadUrls,
        data.isRestricted,
        isBeta
      );
      lendingFlow.init();
    };

    // allow search inside a borrowable book
    if (window.SearchInsideAccess) {
      this.searchInside = new SearchInsideAccess(
        br,
        metadata.identifier,
        loadBR
      );
      this.searchInside.init();
    } else {
      loadBR();
    }
  };
})();

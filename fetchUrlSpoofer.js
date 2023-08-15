(function (originalFetch) {
  const changeUrl = function (url) {
    console.log(url)
    if (url != "https://roblox.com") return
    console.log("Url found redirecting...")
    return "INSERT URL HERE";
  };
  window.fetch = function () {
    let a = Array.from(arguments);
    if (typeof (a[0]) === "string") {
      //Argument to fetch() call is a raw URL string
      a[0] = changeUrl(a[0]);
    } else if (a[0] && typeof (a[0].url) === "string") {
      //Argument to fetch() call is a request object
      //HACK: This replaces the entire request object with an URL
      //      because the Request.url property is readonly.
      //      This is appropriate for GET requests only.
      const changedUrl = changeUrl(a[0].url);
      if (changedUrl !== a[0].url) {
        a[0] = changedUrl;
      }
    }
    return originalFetch.apply(window, a);
  };
})(window.fetch);

(function () {
  function setAll(open) {
    document.querySelectorAll("details.sol").forEach(function (d) { d.open = open; });
  }
  var c = document.getElementById("collapse"), e = document.getElementById("expand");
  var nd = document.getElementById("navd");
  if (nd && window.matchMedia("(max-width:860px)").matches) nd.open = false;
  if (c) c.addEventListener("click", function () { setAll(false); });
  if (e) e.addEventListener("click", function () { setAll(true); });
  function render() {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false
      });
    }
  }
  if (document.readyState === "complete") render();
  else window.addEventListener("load", render);
})();

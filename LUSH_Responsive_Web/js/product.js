//Javascript
var didScroll;
//스크롤 이벤트
window.onscroll = function (e) {
  didScroll = true;
  hasScrolled();
  if (didScroll == true) {
  }
};

function hasScrolled() {
  var nowScrollTop = window.scrollY;
  if (nowScrollTop == 0) {
    document.getElementById("header_content").style.backgroundColor =
      "transparent";
  } else {
    document.getElementById("header_content").style.backgroundColor = "#000";
    document.getElementById("header_content").style.borderBottom = "none";
    document.getElementById("header_content").style.boxShadow = "none";
  }
}

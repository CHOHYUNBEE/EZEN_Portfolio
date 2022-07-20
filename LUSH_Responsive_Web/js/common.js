// list 이미지 클릭 시 이벤트
let count = 1;
function list_btn() {
  if (count % 2 == 1) {
    document.getElementById("header_content").innerHTML = `
      <div id="logo"><a href="">LUSH</a></div>
        <div id="gnb_content">
          <ul id="gnb">
            <li><a href="./html/productPage.html">PRODUCT</a></li>
            <li><a href="#">COMPANY</a></li>
            <li><a href="#">SHOP</a></li>
            <li><a href="#">SPA</a></li>
            <li><a href="#">EVENT</a></li>
          </ul>
        </div>
        <div id="login"><a href="#">LOGIN</a></div>
        <div id="list"  onclick="list_btn()">
          <img src="./images/icon/icons8-menu-90.png" alt="listicon" />
        </div>
        <ul id='listbox'>
          <li><a href="./html/productPage.html">PRODUCT</a></li>
          <li><a href="#">COMPANY</a></li>            
          <li><a href="#">SHOP</a></li>
          <li><a href="#">SPA</a></li>
          <li><a href="#">EVENT</a></li>
        </ul>`;
    document.getElementById("header_content").style.backgroundColor = "#000";
    document.getElementById("list").innerHTML =
      '<img src="./images/icon/icons8-cancel-64.png" alt="listicon" />';
    count++;
  } else {
    document.getElementById("listbox").style.animation =
      "list_close_ani 1s ease-in-out forwards 1";
    document.getElementById("list").innerHTML =
      '<img src="./images/icon/icons8-menu-90.png" alt="listicon" />';
    count--;
  }
}

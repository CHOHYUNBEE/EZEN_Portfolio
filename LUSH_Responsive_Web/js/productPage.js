window.onload = function () {
  let count = 1;
  temp = location.href.split("?");
  name = decodeURI(temp[1]);
  if (name == "undefined") {
    name = "배쓰";
    load_product_event(name);
    changebathProductlist();
  } else {
    load_product_event(name);
  }
};

function load_product_event(product) {
  const product_info = [
    {
      id: "bath",
      url: "../images/product_banner/bath_product.jpg",
      name: "배쓰",
      explanation: "당신에게 향기로운 입욕을 선물합니다.",
    },
    {
      id: "shower",
      url: "../images/product_banner/shower_product.jpg",
      name: "샤워",
      explanation: "일렁이는 향기와 함께 피부를 건강하세 지켜주세요",
    },
    {
      id: "body",
      url: "../images/product_banner/body_product.jpg",
      name: "바디",
      explanation: "늘 당신의 피부를 향긋하고 건강하게 빛내줄 거에요",
    },
    {
      id: "face",
      url: "../images/product_banner/face_product.jpg",
      name: "페이스",
      explanation: "신선한 재료로 만들어 믿을 수 있는 제품이에요",
    },
    {
      id: "hair",
      url: "../images/product_banner/hair_product.jpg",
      name: "헤어",
      explanation: "실리콘 성분 없이 건강한 재료만 담아 매일 더 싱그럽게",
    },
    {
      id: "makeup",
      url: "../images/product_banner/makeup_product.jpg",
      name: "메이크업",
      explanation: "다른 누구도 아닌, 가장 나다운 느낌을 표현해 보세요.",
    },
    {
      id: "purfume",
      url: "../images/product_banner/perfume_product.jpg",
      name: "퍼퓸",
      explanation: "자연과 음악, 시가 주는 영감으로 빚어낸 특별한 향기",
    },
  ];
  const find_url = product_info.find(function (data) {
    return data.name == `${product}`;
  });

  const btn_list = [
    "btnbath",
    "btnshower",
    "btnbody",
    "btnface",
    "btnhair",
    "btnmakeup",
    "btnperfume",
  ];

  for (let i = 0; i < 7; i++) {
    document.getElementById(`${btn_list[i]}`).style.border = "none";
  }

  document.getElementById(
    "main_banner"
  ).style.background = `url(${find_url.url})  no-repeat 50% 50% / cover`;
  document.getElementById("main_banner").innerHTML = `
      <div class="header_content_txt">
        <div id="content_txt">
          <h1>${find_url.name}</h1>
          <p>${find_url.explanation}</p>
        </div>
    </div>`;
  const find_product_list = product_list.find(function (data) {
    return data.id == `${product}`;
  });
  var txt = "";
  for (let i = 0; i < 8; i++) {
    txt += `<figure class="main_product">
          <img
            src=".${find_product_list.info[i].img}"
          />
          <figcaption>
            <span>${find_product_list.info[i].product_name}</span>
            <p>${find_product_list.info[i].explanation}</p>
            <p>${find_product_list.info[i].price}</p>
          </figcaption>
        </figure>`;
  }
  document.getElementById("main_product_list").innerHTML = txt;
}
function changebathProductlist() {
  const keyword_data = document.getElementById("btnbath").innerHTML;
  load_product_event(keyword_data);
  document.getElementById("btnbath").style.border = "2px solid #000";
}
function changeshowerProductlist() {
  const keyword_data = document.getElementById("btnshower").innerHTML;
  load_product_event(keyword_data);
  document.getElementById("btnshower").style.border = "2px solid #000";
}
function changebodyProductlist() {
  const keyword_data = document.getElementById("btnbody").innerHTML;
  load_product_event(keyword_data);
  document.getElementById("btnbody").style.border = "2px solid #000";
}
function changefaceProductlist() {
  const keyword_data = document.getElementById("btnface").innerHTML;
  load_product_event(keyword_data);
  document.getElementById("btnface").style.border = "2px solid #000";
}
function changehairProductlist() {
  const keyword_data = document.getElementById("btnhair").innerHTML;
  load_product_event(keyword_data);
  document.getElementById("btnhair").style.border = "2px solid #000";
}
function changemakeupProductlist() {
  const keyword_data = document.getElementById("btnmakeup").innerHTML;
  load_product_event(keyword_data);
  document.getElementById("btnmakeup").style.border = "2px solid #000";
}
function changeperfumeProductlist() {
  const keyword_data = document.getElementById("btnperfume").innerHTML;
  load_product_event(keyword_data);
  document.getElementById("btnperfume").style.border = "2px solid #000";
}

function list_btn() {
  if (count % 2 == 1) {
    document.getElementById("header_content").innerHTML = `
  <div id="logo"><a href="">LUSH</a></div>
    <div id="gnb_content">
      <ul id="gnb">
        <li><a href="#">PRODUCT</a></li>
        <li><a href="#">COMPANY</a></li>
        <li><a href="#">SHOP</a></li>
        <li><a href="#">SPA</a></li>
        <li><a href="#">EVENT</a></li>
      </ul>
    </div>
    <div id="login"><a href="#">LOGIN</a></div>
    <div id="list"  onclick="list_btn()">
      <img src="../images/icon/icons8-menu-90.png" alt="listicon" />
    </div>
    <ul id='listbox'>
      <li><a href="#">PRODUCT</a></li>
      <li><a href="#">COMPANY</a></li>            
      <li><a href="#">SHOP</a></li>
      <li><a href="#">SPA</a></li>
      <li><a href="#">EVENT</a></li>
    </ul>`;
    document.getElementById("header_content").style.backgroundColor = "#000";
    document.getElementById("list").innerHTML =
      '<img src="../images/icon/icons8-cancel-64.png" alt="listicon" />';
    count++;
  } else {
    document.getElementById("listbox").style.animation =
      "list_close_ani 1s ease-in-out forwards 1";
    document.getElementById("list").innerHTML =
      '<img src="../images/icon/icons8-menu-90.png" alt="listicon" />';
    count--;
  }
}

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

function gobath() {
  var name = document.getElementById("btnbath").innerHTML.toString();
  change_product_list(name);
  document.getElementById("btnbath").style.background = "#fff";
  document.getElementById("btnbath").style.color = "#000";
}
function goshower() {
  var name = document.getElementById("btnshower").innerHTML.toString();
  change_product_list(name);
  document.getElementById("btnshower").style.background = "#fff";
  document.getElementById("btnshower").style.color = "#000";
}
function gobody() {
  var name = document.getElementById("btnbody").innerHTML.toString();
  // location.href = "./html/productPage.html?" + name;
  change_product_list(name);
  document.getElementById("btnbody").style.background = "#fff";
  document.getElementById("btnbody").style.color = "#000";
}
function goface() {
  var name = document.getElementById("btnface").innerHTML.toString();
  change_product_list(name);
  document.getElementById("btnface").style.background = "#fff";
  document.getElementById("btnface").style.color = "#000";
}
function gohair() {
  var name = document.getElementById("btnhair").innerHTML.toString();
  change_product_list(name);
  document.getElementById("btnhair").style.background = "#fff";
  document.getElementById("btnhair").style.color = "#000";
}
function gomakeup() {
  var name = document.getElementById("btnmakeup").innerHTML.toString();
  change_product_list(name);
  document.getElementById("btnmakeup").style.background = "#fff";
  document.getElementById("btnmakeup").style.color = "#000";
}
function goperfume() {
  var name = document.getElementById("btnperfume").innerHTML.toString();
  change_product_list(name);
  document.getElementById("btnperfume").style.background = "#fff";
  document.getElementById("btnperfume").style.color = "#000";
}

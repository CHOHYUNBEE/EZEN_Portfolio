// javascript
const enter_email = document.querySelector("#enter_email");
enter_email.addEventListener("click", () => {
  window.location = "mailto:vvv3349@naver.com";
});

// jQuery

//  nav list
$("#work_list_gnb,#gnb li:nth-child(2)").on("mouseover", function () {
  $("#work_list_gnb").addClass("line");
  $("header").addClass("line");
  $("#work_list_gnb li").addClass("line");
  $("#work_list_gnb li a").addClass("line");
  $("#work_list").addClass("line");
});
$("#work_list_gnb li").on("mouseover", function () {
  $(this).addClass("linestyle");
});
$("#work_list_gnb li").on("mouseout", function () {
  $(this).removeClass("linestyle");
});
$("#work_list_gnb,#gnb li:nth-child(2)").on("mouseout", function () {
  $("#work_list_gnb").removeClass("line");
  $("header").removeClass("line");
  $("#work_list_gnb li").removeClass("line");
  $("#work_list_gnb li a").removeClass("line");
  $("#work_list").removeClass("line");
});

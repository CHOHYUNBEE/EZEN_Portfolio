// jQuery

//  nav list
$("#work_list").on("mouseover", function () {
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
$("#work_list_gnb").on("mouseout", function () {
  $("#work_list_gnb").removeClass("line");
  $("header").removeClass("line");
  $("#work_list_gnb li").removeClass("line");
  $("#work_list_gnb li a").removeClass("line");
  $("#work_list").removeClass("line");
});

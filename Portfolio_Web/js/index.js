const work_list_table_tr = document.querySelectorAll(
  "#work_list_table tbody tr"
);
const main_work_list = document.querySelector("#main_work_list");

work_list_table_tr.forEach((tr) => {
  tr.addEventListener("mouseover", (e) => {
    const work_list =
      e.target.parentElement.parentElement.parentElement.parentElement;
    work_list_table_tr.forEach((item) => {
      item.removeAttribute("class");
    });
    if (e.currentTarget.id == "breakingnews") {
      document
        .querySelector(`#${work_list.id}`)
        .setAttribute("class", "breakingnews");
      document
        .querySelector(`#${e.currentTarget.id}`)
        .setAttribute("class", "breakingnews");
    } else if (e.currentTarget.id == "lushkorea") {
      document
        .querySelector(`#${work_list.id}`)
        .setAttribute("class", "lushkorea");
      document
        .querySelector(`#${e.currentTarget.id}`)
        .setAttribute("class", "lushkorea");
    } else {
      document.querySelector(`#${work_list.id}`).setAttribute("class", "more");
      document.querySelector(`#more`).setAttribute("class", "more");
      document.querySelector(`#more2`).setAttribute("class", "more");
      document.querySelector(`#more3`).setAttribute("class", "more");
    }
  });
});
main_work_list.addEventListener("mouseleave", () => {
  main_work_list.removeAttribute("class");
  work_list_table_tr.forEach((item) => {
    item.removeAttribute("class");
  });
});

// jQuery
$("#content_list_footer img").hover(
  function () {
    $(this).attr({
      src: "Portfolio_Web/images/arrow_white.png",
      alt: "arrow_white",
    });
  }, // 마우스를 올렸을 때
  function () {
    $(this).attr({ src: "Portfolio_Web/images/arrow.png", alt: "arrow_black" });
  } // 마우스가 벗어났을 때
);

$("#work_list_table tbody tr").on("click", function () {
  const sitename = $(this).attr("id");
  if (sitename === "lushkorea") {
    location.href = "Portfolio_Web/work_lush_page.html";
  }
});

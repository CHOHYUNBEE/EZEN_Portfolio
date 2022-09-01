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
    } else if (e.currentTarget.id == "itddaa") {
      document
        .querySelector(`#${work_list.id}`)
        .setAttribute("class", "itddaa");
      document
        .querySelector(`#${e.currentTarget.id}`)
        .setAttribute("class", "itddaa");
    } else if (e.currentTarget.id == "ditehelper") {
      document
        .querySelector(`#${work_list.id}`)
        .setAttribute("class", "ditehelper");
      document
        .querySelector(`#${e.currentTarget.id}`)
        .setAttribute("class", "ditehelper");
    } else {
      document.querySelector(`#${work_list.id}`).setAttribute("class", "more");
      document.querySelector(`#more`).setAttribute("class", "more");
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

$("#work_list_table tbody tr").on("click", function () {
  const sitename = $(this).attr("id");
  if (sitename === "lushkorea") {
    location.href = "Portfolio_Web/work_lush_page.html";
  }
  if (sitename === "itddaa") {
    location.href = "Portfolio_Web/work_itddaa_page.html";
  }
  if (sitename === "breakingnews") {
    location.href = "Portfolio_Web/work_breakingnews_app.html";
  }
  if (sitename === "ditehelper") {
    location.href = "Portfolio_Web/work_diethelper_page.html";
  }
});

var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-btn-list",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
});

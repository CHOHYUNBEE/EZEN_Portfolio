const work_list_table_tr = document.querySelectorAll(
  "#work_list_table tbody tr"
);
const main_work_list = document.querySelector("#main_work_list");
const enter_email = document.querySelector("#enter_email");

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
enter_email.addEventListener("click", () => {
  window.location = "mailto:vvv3349@naver.com";
});

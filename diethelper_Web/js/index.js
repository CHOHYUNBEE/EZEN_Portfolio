$(window).ready(function () {
  var ad_kcal = 0; // 1일 적정 칼로리량
  var make_food_list = [];
  $("#user_info_btn").click(function () {
    var gender = $("input[name='gender']:checked").val();
    var height = $(".info #user_height").val();
    var weight = $(".info #user_weight").val();
    var age = $(".info #user_age").val();
    var active = $("input[name='active']:checked").val();

    // 모든 정보가 입력 되었을 때
    if (check_info() != false) {
      // 기본 정보
      if (gender == "girl") {
        $("#user_info #info_gender").text("여자");
      } else {
        $("#user_info #info_gender").text("남자");
      }
      $("#user_info #info_age").text(age);
      $("#user_info #info_height").text(height + "cm");
      $("#user_info #info_weight").text(weight + "kg");
      $("#user_info #info_name").text($(".info #user_name").val());
      // 영양 정보
      // 영양정보 계산식

      //   기초대사량
      var Basal = 0;
      if (gender == "girl") {
        Basal = 655.1 + 9.56 * weight + 1.85 * height - 4.68 * age;
      } else {
        Basal = 66.47 + 13.75 * weight + 5 * height - 6.76 * age;
      }
      $("#nutrient_info #info_kcal").text(Basal.toFixed(0) + "kcal");

      //  BMI
      var bmi = weight / ((height / 100) * (height / 100));
      var bmi_check = "";
      if (bmi < 20) {
        bmi_check = "저체중";
      } else if (bmi >= 20 && bmi <= 24) {
        bmi_check = "정상";
      } else if (bmi >= 25 && bmi <= 29) {
        bmi_check = "과체중";
      } else {
        bmi_check = "비만";
      }
      $("#nutrient_info #info_bmi").text(bmi.toFixed(0) + `(${bmi_check})`);

      //   1일 적정량
      if (active == "level1") {
        ad_kcal = Basal * 1.2;
      } else if (active == "level2") {
        ad_kcal = Basal * 1.375;
      } else if (active == "level3") {
        ad_kcal = Basal * 1.55;
      } else if (active == "level4") {
        ad_kcal = Basal * 1.725;
      } else {
        ad_kcal = Basal * 1.9;
      }
      $("#nutrient_info #info_ad_kcal").text(ad_kcal.toFixed(0) + "kcal");

      // 탄수화물
      var carbohydrate = (ad_kcal * 0.5) / 4;
      $("#nutrient_info #info_car_kcal").text(carbohydrate.toFixed(0) + "g");

      // 단백질
      var protein = (ad_kcal * 0.3) / 4;
      $("#nutrient_info #info_pro_kcal").text(protein.toFixed(0) + "g");

      // 지방
      var fat = (ad_kcal * 0.2) / 9;
      $("#nutrient_info #info_fat_kcal").text(fat.toFixed(0) + "g");
    }
  });

  // 옵션 선택
  //  편의점 선택
  $("#select_store .store_box").click(function () {
    $("#select_store .store_box").css({ backgroundColor: "#fff" });
    $(this).css({ backgroundColor: "#76c6ff" });
    $(this).find("input").prop("checked", true);
  });

  //  추천받을 식사 시간 선택 이벤트
  $("#select_time .time_box label").click(function () {
    $(this).parent().toggleClass("active");
    $(this).prop("checked", true);
  });

  //  식단 생성 버튼
  $("#select_meal_btn").click(function () {
    var meal_time_arr = [];
    if (check_option() != false) {
      // 편의점 선택
      var store = $("input[name='store']:checked").val();
      var data_url = "";
      var select_meal = [];
      var random_num = Math.random();
      var meal_len = 0; // 식단 갯수
      // var make_food_list = []; // 적합한 식단 목록/
      var final_food_list = []; // 최종 식단 목록

      // 식사 시간 선택
      $("input[name='time']:checked").each(function (e) {
        meal_time_arr.push($(this).val());
      });

      //  식단 타입 선택
      var meal_type = $("input[name='meal_type']:checked").val();
      var diet_kcal = 0; // 타입에 따라 먹어야하는 칼로리량
      var diet_txt = "";
      if (meal_type == "low") {
        diet_kcal = ad_kcal * 0.9;
        diet_txt = "감량 칼로리";
        command_num = 1;
      } else if (meal_type == "medium") {
        diet_kcal = ad_kcal;
        diet_txt = "적정 칼로리";
        command_num = 2;
      } else {
        diet_kcal = ad_kcal * 1.1;
        diet_txt = "증량 칼로리";
        command_num = 3;
      }

      //   섭취 영양소 확인 영역
      //   영양소 그래프 데이터
      var make_kcal = diet_kcal.toFixed(0);
      var make_carbohydrate = ((diet_kcal * 0.5) / 4).toFixed(0);
      var make_protein = ((diet_kcal * 0.3) / 4).toFixed(0);
      var make_fat = ((diet_kcal * 0.2) / 9).toFixed(0);

      $(".graph_bar_content:nth-child(2) p:last-child").text(
        make_kcal + `kcal (${diet_txt})`
      );
      $(".graph_bar_content:nth-child(3) p:last-child").text(
        make_carbohydrate + "g"
      );
      $(".graph_bar_content:nth-child(4) p:last-child").text(
        make_protein + "g"
      );
      $(".graph_bar_content:nth-child(5) p:last-child").text(make_fat + "g");

      // 식단 생성
      if (store == "cu") {
        data_url = "dist/cu.json";
      } else if (store == "gs25") {
        data_url = "dist/gs25.json";
      } else {
        data_url = "dist/emart24.json";
      }

      fetch(data_url)
        .then((response) => {
          return response.json();
        })
        .then((jsondata) => {
          $.each(jsondata, function (key, value) {
            $.each(value, function (key, value_kcal) {
              if (key == "kcal" && value_kcal <= make_kcal / 3) {
                $.each(value, function (key, value_car) {
                  if (
                    key == "carbohydrate" &&
                    value_car <= make_carbohydrate / 3
                  ) {
                    $.each(value, function (key, value_pro) {
                      if (key == "protein" && value_pro <= make_protein / 3) {
                        $.each(value, function (key, value_fat) {
                          if (key == "fat" && value_fat <= make_fat / 3) {
                            make_food_list.push(value);
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          });
          meal_len = make_food_list.length;

          $("#loading").removeClass("nonactive"); // 로딩 중

          // 식단 랜덤 뽑기
          // 감량 식단 선택 시
          for (let j = 0; j < meal_time_arr.length; j++) {
            var check_select_meal = "";
            select_meal = [];
            var low_random_num = Math.floor(random_num * meal_len + 1);
            //2가지
            for (let i = 0; i < 2; i++) {
              random_num = Math.random();
              low_random_num = Math.floor(random_num * meal_len + 1);
              select_meal.push(make_food_list[low_random_num]);
            }
            check_select_meal = check_kcal(
              make_kcal,
              make_carbohydrate,
              make_protein,
              make_fat,
              make_food_list,
              meal_len,
              select_meal
            );
            final_food_list.push(check_select_meal);
          }

          var card_list = "";
          var total_kcal = 0;
          var img_url = "";
          var img_alt = "";
          var title = "";

          // 섭취영양소 데이터
          var final_total_kcal = 0;
          var final_total_carbohydrate = 0;
          var final_total_protein = 0;
          var final_total_fat = 0;

          $.each(final_food_list, function (key, value) {
            total_kcal = 0;
            var count = key;
            if (meal_time_arr[key] == "morning") {
              img_url = "./images/sun.png";
              img_alt = "sun";
              title = "아침";
            } else if (meal_time_arr[key] == "lunch") {
              img_url = "./images/sunny.png";
              img_alt = "sunny";
              title = "점심";
            } else {
              img_url = "./images/moon.png";
              img_alt = "moon";
              title = "저녁";
            }
            card_list += `<div class="meal_card">
              <div class="meal_card_title">
                <img src="${img_url}" alt="${img_alt}" />
                <h1>${title}</h1>
              </div>
              <div class="line"></div>
              <div class="meal_card_content_list">
              `;
            $.each(value, function (key, value) {
              total_kcal += Number(value.kcal);
              final_total_kcal += Number(value.kcal);
              final_total_carbohydrate += Number(value.carbohydrate);
              final_total_protein += Number(value.protein);
              final_total_fat += Number(value.fat);
              card_list += `
                <div class="meal_card_content" id="${meal_time_arr[count]}product${key}${key}">
                  <input type="radio" name="meal" value="${meal_time_arr[count]}product${key}" id="${meal_time_arr[count]}product${key}" />
                  <label for="${meal_time_arr[count]}product${key}">
                    <p>제품명 : <span>${value.food_name}</span></p>
                    <p>중량 : ${value.weight}g</p>
                    <p>칼로리 : ${value.kcal}kcal</p>
                    <p>탄수화물 : ${value.carbohydrate}g</p>
                    <p>단백질 : ${value.protein}g</p>
                    <p>지방 : ${value.fat}g</p>
                  </label>
                </div>
            `;
            });
            card_list += `
            </div>
              <div class="total_kcal">총 섭취 칼로리 : ${total_kcal}kcal</div>
              <div class="meal_card_footer">
                <div class="delete_meal">삭제</div>
                <div class="h_line"></div>
                <div class="new_meal">식단 재생성</div>
              </div>
            </div>`;
          });
          $("#meal_card_list").html(card_list);
          $("#loading").addClass("nonactive"); // 로딩 중
          //  섭취 영양소 그래프
          // 칼로리
          $(".graph_bar_content:nth-child(2) .color_bar").text(
            final_total_kcal.toFixed(0)
          );
          $(".graph_bar_content:nth-child(2) .color_bar").css({
            width: `${((final_total_kcal / make_kcal) * 100).toFixed(0)}%`,
            backgroundColor: "#76c6ff",
          });
          // 탄수화물
          $(".graph_bar_content:nth-child(3) .color_bar").text(
            final_total_carbohydrate.toFixed(0)
          );
          $(".graph_bar_content:nth-child(3) .color_bar").css({
            width: `${(
              (final_total_carbohydrate / make_carbohydrate) *
              100
            ).toFixed(0)}%`,
            backgroundColor: "#76c6ff",
          });
          // 단백질
          $(".graph_bar_content:nth-child(4) .color_bar").text(
            final_total_protein.toFixed(0)
          );
          $(".graph_bar_content:nth-child(4) .color_bar").css({
            width: `${((final_total_protein / make_protein) * 100).toFixed(
              0
            )}%`,
            backgroundColor: "#76c6ff",
          });
          // 지방
          $(".graph_bar_content:nth-child(5) .color_bar").text(
            final_total_fat.toFixed(0)
          );
          $(".graph_bar_content:nth-child(5) .color_bar").css({
            width: `${((final_total_fat / make_fat) * 100).toFixed(0)}%`,
            backgroundColor: "#76c6ff",
          });

          // 섭취 영양소 탄단지 비율
          // 칼로리 기준 탄단지 비율
          var ratio_carbohydrate = (
            ((final_total_carbohydrate.toFixed(0) * 4) /
              final_total_kcal.toFixed(0)) *
            100
          ).toFixed(0);
          var ratio_protein = (
            ((final_total_protein.toFixed(0) * 4) /
              final_total_kcal.toFixed(0)) *
            100
          ).toFixed(0);
          var ratio_fat = (
            ((final_total_fat.toFixed(0) * 9) / final_total_kcal.toFixed(0)) *
            100
          ).toFixed(0);

          $("#nutrient_ratio_txt p:nth-child(1)").text(ratio_carbohydrate);
          $("#nutrient_ratio_txt p:nth-child(3)").text(ratio_protein);
          $("#nutrient_ratio_txt p:nth-child(5)").text(ratio_fat);

          var min_num = Math.min(ratio_carbohydrate, ratio_protein, ratio_fat);
          var max_num = Math.max(ratio_carbohydrate, ratio_protein, ratio_fat);
          var ratio_list = [ratio_carbohydrate, ratio_protein, ratio_fat];

          if (
            ratio_carbohydrate == ratio_protein ||
            ratio_carbohydrate == ratio_fat ||
            ratio_fat == ratio_protein
          ) {
            // 중복된 값 찾기
            ratio_list = ratio_list.filter(
              (item, index) => ratio_list.indexOf(item) !== index
            );
          } else {
            ratio_list = ratio_list.filter(function (item) {
              return Number(item) !== min_num && Number(item) !== max_num;
            });
          }

          $("#nutrient_raito .pie-chart").css({
            background: `conic-gradient(
              #8b22ff 0% ${min_num}%,
              #ffc33b ${min_num}% ${Number(min_num) + Number(ratio_list)}%,
              #21f3d6 ${Number(min_num) + Number(ratio_list)}% 100%`,
          });
        });
    }
  });

  // 삭제 버튼 클릭시 이벤트
  $(document).on("click", ".delete_meal", function () {
    var element = $("input[name='meal']");
    var moring_cnt = 0;
    var lunch_cnt = 0;
    var dinner_cnt = 0;
    // 현재 식단 개수 구하기
    $.each(element, function (key, value) {
      if (value.value.startsWith("morning")) {
        moring_cnt++;
      } else if (value.value.startsWith("lunch")) {
        lunch_cnt++;
      } else {
        dinner_cnt++;
      }
    });
    var select_element = $("input[name='meal']:checked");
    var select_element_parent = $("input[name='meal']:checked").parent()[0].id;
    if (select_element.length != 0) {
      var select_element_name = select_element[0].defaultValue;

      if (select_element_name.startsWith("morning")) {
        if (moring_cnt < 2) {
          // 식단이 1개만 존재할 때
          alert(
            "최소 1개의 식단은 필요합니다. \n새로운 식단을 희망하신다면 식단 재생성을 눌러주세요."
          );
        } else {
          // 식단이 2개 일때
          var delConfirm = confirm(
            "식단 삭제 시 하루 필요 칼로리 및 영양소가 부족할 수 있습니다.\n그래도 삭제하시겠습니까?"
          );
          if (delConfirm) {
            $(`#${select_element_parent}`).remove();
            alert("식단이 삭제되었습니다.");
          } else {
            alert("식단 삭제가 취소되었습니다.");
          }
        }
      } else if (select_element_name.startsWith("lunch")) {
        if (lunch_cnt < 2) {
          // 식단이 1개만 존재할 때
          alert(
            "최소 1개의 식단은 필요합니다. \n새로운 식단을 희망하신다면 식단 재생성을 눌러주세요."
          );
        } else {
          // 식단이 2개 일때
          var delConfirm = confirm(
            "식단 삭제 시 하루 필요 칼로리 및 영양소가 부족할 수 있습니다.\n그래도 삭제하시겠습니까?"
          );
          if (delConfirm) {
            $(`#${select_element_parent}`).remove();
            alert("식단이 삭제되었습니다.");
            lunch_cnt--;
          } else {
            alert("식단 삭제가 취소되었습니다.");
          }
        }
      } else {
        if (dinner_cnt < 2) {
          // 식단이 1개만 존재할 때
          alert(
            "최소 1개의 식단은 필요합니다. \n새로운 식단을 희망하신다면 식단 재생성을 눌러주세요."
          );
        } else {
          // 식단이 2개 일때
          var delConfirm = confirm(
            "식단 삭제 시 하루 필요 칼로리 및 영양소가 부족할 수 있습니다.\n그래도 삭제하시겠습니까?"
          );
          if (delConfirm) {
            $(`#${select_element_parent}`).remove();
            alert("식단이 삭제되었습니다.");
            dinner_cnt--;
          } else {
            alert("식단 삭제가 취소되었습니다.");
          }
        }
      }
    } else {
      alert("삭제 할 식단을 선택해주세요");
    }
  });
  // 메뉴 재생성

  $(document).on("click", ".new_meal", function () {
    console.log("재생성");
    var element = $("input[name='meal']");
    var select_element = $("input[name='meal']:checked"); // 현재 선택된 식단
    var select_element_parent = $("input[name='meal']:checked").parent()[0].id; // 선택 된 식단의 부모 id
    var moring_cnt = 0;
    var lunch_cnt = 0;
    var dinner_cnt = 0;

    // 현재 식단 개수 구하기
    $.each(element, function (key, value) {
      if (value.value.startsWith("morning")) {
        moring_cnt++;
      } else if (value.value.startsWith("lunch")) {
        lunch_cnt++;
      } else {
        dinner_cnt++;
      }
    });

    if (select_element.length != 0) {
      var select_element_name = select_element[0].defaultValue;

      if (select_element_name.startsWith("morning")) {
        if (moring_cnt < 2) {
        } else {
          // 식단이 2개인 경우
          // 선택된 식단 이외의 칼로리 구하기
          remake_meal(select_element_parent);
        }
      } else if (select_element_name.startsWith("lunch")) {
        if (lunch_cnt < 2) {
        } else {
          remake_meal(select_element_parent);
        }
      } else {
        if (dinner_cnt < 2) {
        } else {
          remake_meal(select_element_parent);
        }
      }
    }
  });
});

// 정보 입력 입력값 체크 함수
function check_info() {
  if ($(".info #user_name").val() == "") {
    alert("이름을 입력해주세요.");
    return false;
  } else if ($("input[name='gender']:checked").val() == undefined) {
    alert("성별을 선택해주세요.");
    return false;
  } else if ($(".info #user_height").val() == "") {
    alert("키를 입력해주세요.");
    return false;
  } else if ($(".info #user_weight").val() == "") {
    alert("몸무게을 입력해주세요.");
    return false;
  } else if ($("input[name='active']:checked").val() == undefined) {
    alert("활동량을 선택해주세요.");
    return false;
  } else {
    return true;
  }
}
// 옵션 선택 체크 함수
function check_option() {
  if ($("#info_ad_kcal").text() == "") {
    alert("기본 정보를 먼저 입력해주세요");
    return false;
  } else if ($("input[name='store']:checked").val() == undefined) {
    alert("편의점을 선택해주세요.");
    return false;
  } else if ($("input[name='time']:checked").val() == "") {
    alert("추천 식사 시간을 1개 이상 선택해주세요.");
    return false;
  } else if ($("input[name='meal_type']:checked").val() == "") {
    alert("식단 타입을 선택해주세요.");
    return false;
  } else {
    return true;
  }
}

// 최소 칼로리 체크 함수
function check_kcal(
  make_kcal,
  make_carbohydrate,
  make_protein,
  make_fat,
  data_list,
  meal_len,
  data
) {
  var random_num = Math.random();
  var low_random_num = Math.floor(random_num * meal_len + 1);
  var sum_kcal = 0;
  var sum_carbohydrate = 0;
  var sum_protein = 0;
  var sum_fat = 0;
  var meal_list = data;

  for (let i = 0; i < data.length; i++) {
    sum_kcal += Number(data[i].kcal);
    sum_carbohydrate += Number(data[i].carbohydrate);
    sum_protein += Number(data[i].protein);
    sum_fat += Number(data[i].fat);
  }
  if (
    sum_kcal > make_kcal / 3 ||
    sum_kcal < (make_kcal / 3) * 0.8 ||
    sum_kcal < 800 / 3 ||
    sum_carbohydrate > make_carbohydrate / 3 ||
    sum_carbohydrate < (make_carbohydrate / 3) * 0.8 ||
    sum_protein > make_protein / 3 ||
    sum_protein < (make_protein / 3) * 0.8 ||
    sum_fat > make_fat / 3 ||
    sum_fat < (make_fat / 3) * 0.8
  ) {
    meal_list = [];
    for (let i = 0; i < data.length; i++) {
      random_num = Math.random();
      low_random_num = Math.floor(random_num * meal_len + 1);
      if (data_list[low_random_num] != undefined) {
        meal_list.push(data_list[low_random_num]);
      } else {
        random_num = Math.random();
        low_random_num = Math.floor(random_num * meal_len + 1);
        meal_list.push(data_list[low_random_num]);
      }
    }
    meal_list = check_kcal(
      make_kcal,
      make_carbohydrate,
      make_protein,
      make_fat,
      data_list,
      meal_len,
      meal_list
    );
    return meal_list;
  } else {
    return meal_list;
  }
}

function remake_meal(select_element_parent) {
  var sub_txt = "";
  var sub_kcal = 0;
  var sub_car = 0; // 탄수화물
  var sub_pro = 0; // 단백질
  var sub_fat = 0; // 지방

  var main_kcal = $(".graph_bar_content:nth-child(2) .color_bar").text(); //칼로리
  var main_car = $(".graph_bar_content:nth-child(3) .color_bar").text(); //탄수화물
  var main_pro = $(".graph_bar_content:nth-child(4) .color_bar").text(); //단백질
  var main_fat = $(".graph_bar_content:nth-child(5) .color_bar").text(); //지방

  var kcal = 0;
  var car = 0;
  var pro = 0;
  var fat = 0;

  var meal_len = make_food_list.length;
  var check_select_meal = "";
  var random_num = Math.random();
  var low_random_num = Math.floor(random_num * meal_len + 1);
  var select_meal = [];

  sub_txt = $(`#${select_element_parent}`).siblings().children("label").text();

  sub_kcal = sub_txt.split("칼로리 :")[1].split("kcal")[0];
  sub_car = sub_txt.split("탄수화물 :")[1].split("g")[0];
  sub_pro = sub_txt.split("단백질 :")[1].split("g")[0];
  sub_fat = sub_txt.split("지방 :")[1].split("g")[0];

  kcal = Number(main_kcal) - Number(sub_kcal);
  car = Number(main_car) - Number(sub_car);
  pro = Number(main_pro) - Number(sub_pro);
  fat = Number(main_fat) - Number(sub_fat);

  console.log(kcal);
  console.log(car);
  console.log(pro);
  console.log(fat);
  console.log(make_food_list);

  select_meal.push(make_food_list[low_random_num]);

  console.log(random_num);
  console.log(low_random_num);
  console.log(select_meal);

  check_select_meal = check_kcal(
    kcal,
    car,
    pro,
    make_fat,
    fat,
    meal_len,
    select_meal
  );
  console.log(check_select_meal);
}

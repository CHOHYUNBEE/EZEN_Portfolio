$(window).ready(function () {
  var ad_kcal = 0; // 1일 적정 칼로리량
  var meal_time_arr = [];

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

    var meal_type = "low";
    var store = $("input[name='store']:checked").val();
    var data_url = "";
    var make_kcal = 1479;
    var make_carbohydrate = 222;
    var make_protein = 92;
    var make_fat = 49;
    var select_meal = [];
    var random_num = Math.random();
    var command_num = 1; // 추천 음식 가지수
    var meal_len = 0; // 식단 갯수
    var make_food_list = []; // 적합한 식단 목록

    if (store == "cu") {
      data_url = "./cu.json";
    } else if (store == "gs25") {
      data_url = "./gs25.json";
    } else {
      data_url = "./emart24.json";
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
        // 식단 랜덤 뽑기
        // 감량 식단 선택 시
        if (meal_type == "low") {
          var low_random_num = Math.floor(random_num * meal_len + 1);
          select_meal = make_food_list[low_random_num];
        }
      });

    console.log(make_food_list);
  });

  //  추천받을 식사 시간 선택 이벤트
  $("#select_time .time_box label").click(function () {
    $(this).parent().toggleClass("active");
  });

  //  식단 생성 버튼
  $("#select_meal_btn").click(function () {
    if (check_option() != false) {
      // 편의점 선택
      var store = $("input[name='store']:checked").val();
      var data_url = "";
      var select_meal = [];
      var random_num = Math.random();
      var command_num = 0; // 추천 음식 가지수
      var meal_len = 0; // 식단 갯수

      // 식사 시간 선택
      $("input[name='time']:checked").each(function (e) {
        meal_time_arr.push($(this).val());
      });

      //  식단 타입 선택
      var meal_type = $("input[name='meal']:checked").val();
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
        data_url = "./cu.json";
      } else if (store == "gs25") {
        data_url = "./gs25.json";
      } else {
        data_url = "./emart24.json";
      }

      fetch(data_url)
        .then((response) => {
          return response.json();
        })
        .then((jsondata) => {
          var make_food_list = []; // 적합한 식단 목록
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
        });
      meal_len = make_food_list.length;
      console.log(meal_len);
      // 식단 랜덤 뽑기
      // 감량 식단 선택 시
      if (meal_type == "low") {
        var low_random_num = Math.floor(random_num * meal_len + 1);
        console.log(low_random_num);

        select_meal = make_food_list[random_num];
        console.log(select_meal);
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
  } else if ($("input[name='meal']:checked").val() == "") {
    alert("식단 타입을 선택해주세요.");
    return false;
  } else {
    return true;
  }
}

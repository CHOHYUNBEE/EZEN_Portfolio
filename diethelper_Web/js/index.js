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
  });

  //  추천받을 식사 시간 선택 이벤트
  $("#select_time .time_box label").click(function () {
    $(this).parent().toggleClass("active");
  });

  //  식단 생성 버튼
  $("#select_meal_btn").click(function () {
    if (check_option() != false) {
      // 식사 시간 선택
      $("input[name='time']:checked").each(function (e) {
        meal_time_arr.push($(this).val());
      });

      //  식단 타입 선택
      var meal_type = $("input[name='meal']:checked").val();
      var diet_kcal = 0; // 타입에 따라 먹어야하는 칼로리량
      var diet_txt = ""; // 타입에 따라 먹어야하는 칼로리량
      if (meal_type == "low") {
        diet_kcal = ad_kcal * 0.9;
        diet_txt = "감량 칼로리";
      } else if (meal_type == "medium") {
        diet_kcal = ad_kcal;
        diet_txt = "적정 칼로리";
      } else {
        diet_kcal = ad_kcal * 1.1;
        diet_txt = "증량 칼로리";
      }

      //   섭취 영양소 확인 영역
      //   영양소 그래프 데이터
      $(".graph_bar_content:nth-child(2) p:last-child").text(
        `${diet_kcal.toFixed(0)}` + `kcal (${diet_txt})`
      );
      $(".graph_bar_content:nth-child(3) p:last-child").text(
        `${((diet_kcal * 0.5) / 4).toFixed(0)}` + "g"
      );
      $(".graph_bar_content:nth-child(4) p:last-child").text(
        `${((diet_kcal * 0.3) / 4).toFixed(0)}` + "g"
      );
      $(".graph_bar_content:nth-child(5) p:last-child").text(
        `${((diet_kcal * 0.2) / 9).toFixed(0)}` + "g"
      );
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

$(document).ready(function () {
  // 마우스 이벤트
  var vertical_content = $("#vertical_content_text_big img").width();

  $("html").on("wheel", function (e) {
    //mousewheel
    var _scrollTop = window.scrollY || document.documentElement.scrollTop; // 현재 스크롤 위치
    var img_width = $("#wemake_img").width();

    // 스크롤 이벤트
    // we make svg 그려지기 이벤튼
    if (_scrollTop >= 1400 && _scrollTop <= 2700) {
      $("#layer1").addClass("active");
      $("#layer2").addClass("active");
      $("#layer3").addClass("active");
    } else if (_scrollTop <= 2700) {
      $("#layer1").removeClass("active");
      $("#layer2").removeClass("active");
      $("#layer3").removeClass("active");
    }
    if (_scrollTop < 8100) {
      $("#itddaaSvg").removeClass("active");
      $("#arrowup").removeClass("active");
    } else if (_scrollTop >= 8100) {
      $("#itddaaSvg").addClass("active");
      $("#arrowup").addClass("active");
    }
    if (_scrollTop >= 8900) {
      $("#creativesvg").addClass("active");
      $("#flowsvg").addClass("active");
    } else if (_scrollTop < 8900) {
      $("#creativesvg").removeClass("active");
      $("#flowsvg").removeClass("active");
    }

    if (_scrollTop >= 10000) {
      $("#twistarrow").addClass("active");
    } else if (_scrollTop < 10000) {
      $("#twistarrow").removeClass("active");
    }
    // logo, gnb이벤트
    if (_scrollTop < 1700) {
      $("#logo_img *").css({ fill: "#000" });
      $("#gnb li a").css({ color: "#000" });
    } else if (_scrollTop > 1700) {
      $("#logo_img *").css({ fill: "#fff" });
      $("#gnb li a").css({ color: "#fff" });
    }

    if (_scrollTop > 4300) {
      $("#logo_img *").css({ fill: "#000" });
      $("#gnb li a").css({ color: "#000" });
    }
    if (_scrollTop > 5300) {
      $("#logo_img *").css({ fill: "#fff" });
      $("#gnb li a").css({ color: "#fff" });
    }
    if (_scrollTop > 6300) {
      $("#logo_img *").css({ fill: "#000" });
      $("#gnb li a").css({ color: "#000" });
    }
    if (_scrollTop > 7300) {
      $("#logo_img *").css({ fill: "#fff" });
      $("#gnb li a").css({ color: "#fff" });
    }
    var wheelDelta = e.originalEvent.wheelDelta;
    if (wheelDelta > 0) {
      //마우스 올림
      if (_scrollTop <= 3000) {
        $("#people span").animate({ width: "30%" }, 1000);
      }
    } else {
      // 마우스 내림
      if (_scrollTop >= 3000) {
        $("#people span").animate({ width: 0 }, 2000);
      }
    }
  });

  $("#contact_circle").hover(
    function () {
      $("#contact_us").css({ backgroundColor: "red" });
      $("#contactme").css({ fill: "red" });
    },
    function () {
      $("#contact_us").css({ backgroundColor: "#000" });
      $("#contactme").css({ fill: "#fff" });
    }
  );
});

const web_list = () => {
  var liTimeLine;
  var imgTimeLine;
  var imgtxtTimeLine;
  ScrollTrigger.matchMedia({
    "(min-width: 1025px)": function () {
      imgTimeLine = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: "main #vertical_container",
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
        },
      });

      imgTimeLine.to(
        $("main #vertical_content_text_big img"),
        { xPercent: -28 },
        "mylabel4"
      );

      imgtxtTimeLine = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: "main #we_make_container #wemake_img img",
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
        },
      });

      imgtxtTimeLine.to($("main #wemake_img img"), { scale: 1.5 });

      liTimeLine = gsap.timeline({
        defaults: {
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: "main #web_site_list_container ul.port",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        },
      });

      liTimeLine
        .set(
          $("main #web_site_list_container ul.port > li:nth-of-type(1) .img1"),
          { y: "0vh" }
        )

        .to(
          $("main #web_site_list_container ul.port > li:nth-of-type(1)"),
          { yPercent: -100 },
          "mylabel"
        )
        .to(
          $(
            "main #web_site_list_container ul.port > li:nth-of-type(1) .img_list"
          ),
          { yPercent: 100 },
          "mylabel"
        )

        .to(
          $("main #web_site_list_container ul.port > li:nth-of-type(2)"),
          { yPercent: -100 },
          "mylabel2"
        )
        .to(
          $(
            "main #web_site_list_container ul.port > li:nth-of-type(2) .img_list"
          ),
          { yPercent: 100 },
          "mylabel2"
        )

        .to(
          $("main #web_site_list_container ul.port > li:nth-of-type(3)"),
          { yPercent: -100 },
          "mylabel3"
        )
        .to(
          $(
            "main #web_site_list_container ul.port > li:nth-of-type(3) .img_list"
          ),
          { yPercent: 100 },
          "mylabel3"
        );
    },
  });
};

web_list();

// li 이미지 커서 이벤트
$("main #introduce_content ul#itroduce_list > li").mousemove(function (e) {
  $(this)
    .find($(".fixed_img"))
    .css({
      top: e.offsetY + "px",
      left: e.offsetX + "px",
      opacity: 1,
    });
});
$("main #introduce_content ul#itroduce_list > li").mouseleave(function () {
  $(this).find($(".fixed_img")).css({
    opacity: 0,
  });
});
// 커서 이벤트
function corsorInit() {
  $(window).mousemove(function (e) {
    var x = e.clientX;
    var y = e.clientY;
    $("#cusur_event").css({
      top: y + "px",
      left: x + "px",
    });
  });
}

// 스크립트 샐행
corsorInit();

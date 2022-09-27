$ = jQuery;

// Homepage Product Slider
function triggerNextClick() {
  $(".carousel-navigation.carousel-nav-next").trigger("click");
}
function triggerPrevClick() {
  $(".carousel-navigation.carousel-nav-prev").trigger("click");
}

function customSlider() {
  $(".slider--next button i").on("click", () => {
    triggerNextClick();
  });
  $(".slider--prev button i").on("click", () => {
    triggerPrevClick();
  });
}

function setSliderControlsHeight() {
  var productThumbHeight = $(".product-item-thumb").height();
  $(
    "#shopify-section-1550222669998 .slider--next, #shopify-section-1550222669998 .slider--prev"
  ).css({
    height: productThumbHeight,
    "margin-top": "5px",
  });
}

// Custom Content
function resizeCustomContentHeight() {
  var customContentHeight = $(
    ".custom-content .grid-container > div:nth-child(2) img"
  ).height();
  $(
    ".custom-content .grid-container > div:nth-child(4) > div, .custom-content .grid-container > div:nth-child(1) > div"
  ).css("height", customContentHeight);
}

// Creating the Add to Cart Buttons for Homepage
$(".products-grid .product-elemet").each(function () {
  var cartLink = $(this).find(".product-item-buttons a").attr("href");
  $(this)
    .find(".product-item")
    .append('<a class="product-btn" href="' + cartLink + '">Add to Cart</a>');
});

// DEAD FUNCTION
function fucktheSwiper() {
  // Doing the Math
  var slideWidth = $(".product-slider .swiper-slide-duplicate").width();
  var totalSlides = $(".product-slider .swiper-slide-duplicate").length / 2;
  var loopWidth = slideWidth * totalSlides;

  // Product Thumbnail Slider
  function fuckSwiper() {
    $(".template-product .product-slider .swiper-wrapper").attr(
      "style",
      "transform:translate3d(0px, 0px, 0px)"
    );
  }
  fuckSwiper();

  // Clicks Swiper Slider Controls
  $(
    ".product-thumbnail-nav-next, .product-gallery.carousel .carousel-nav-next, .product-thumbnail-nav-prev, .product-gallery.carousel .carousel-nav-prev"
  ).on("click", function () {
    var loopOneActive = $(".product-slider .swiper-wrapper > div")
      .eq(totalSlides)
      .hasClass("swiper-slide-active");
    var loopTwoActive = $(".product-slider .swiper-wrapper > div")
      .eq(totalSlides * 2)
      .hasClass("swiper-slide-active");
    // if(loopOneActive || loopTwoActive) {
    //   loopOneEnds();
    //   console.log('activated');
    // }
  });

  setTimeout(function () {
    // Swiper API
    var swiper = new Swiper(".product-slider .swiper-container", {
      slidesPerView: "auto",
      direction: "horizontal",
      // Navigation arrows
      navigation: {
        nextEl:
          ".product-thumbnail-nav-next, .product-gallery.carousel .carousel-nav-next",
        prevEl:
          ".product-thumbnail-nav-prev, .product-gallery.carousel .carousel-nav-prev",
      },
      scrollbar: {
        el: ".product-slider .swiper-scrollbar-drag",
        draggable: false,
        dragSize: 100,
      },
      mousewheel: false,
      allowTouchMove: false,
    });
  }, 2000);

  // On Last Slide
  var totalSlides = $(".product-slider .swiper-slide").length / 3 - 1;
  var slideWidth = -$(".product-slider .swiper-slide").width();

  // On Next Click
  $(
    ".product-thumbnail-nav-next, .product-gallery.carousel .carousel-nav-next"
  ).on("click", function () {
    var matrix = $(".product-slider .swiper-wrapper").css("transform");
    var matrixType = matrix.includes("3d") ? "3d" : "2d";

    var matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    if (matrixType === "2d") {
      var transX = matrixValues[4];
    }
    var currentSlideIndex = $(".product-slider .swiper-slide-active").attr(
      "data-swiper-slide-index"
    );

    console.log("next", transX);

    if (currentSlideIndex == totalSlides) {
      setTimeout(function () {
        $(".product-slider .swiper-wrapper").attr(
          "style",
          "transform: translate3d(" + transX - 208 + "px, 0px, 0px)"
        );
      }, 1200);
      console.log("activated");
    }
  });
}
fucktheSwiper();

// scroll to next section
function scrollnext() {
  $(".go-to-next-section button").on("click", function () {
    var thisButton = $(this).closest(".shopify-section");
    var nextSectionOffset = thisButton.next().offset().top;
    var menuHeight = $("header").height();
    var scrollHeight = nextSectionOffset - menuHeight;
    $("body, html").animate(
      {
        scrollTop: scrollHeight,
      },
      600
    );
  });
}
scrollnext();

// Homepage Product Lists
$("body.template-index .product-item").each(function () {
  // Grabs the product link, creates a detail button and appends the grabbed link
  var productLink = $(this).find("a").attr("href");
  $(this)
    .find(".product-item-price")
    .after(
      '<div class="product-item-button"><a href="' +
        productLink +
        '">Detail</a></div>'
    );

  // Grabs the product title, creates a title attribute and appends the title there
  var productTitle = $(this).find(".product-item-title a").text();
  $(this).find(".product-item-title a").attr("title", productTitle);
});

// Window Resize Function
$(window).resize(function () {
  var windowWidth = $(this).width();
  resizeCustomContentHeight();

  if (windowWidth > 1400) {
    customSlider();
    setSliderControlsHeight();
  }
});

// Trigger Resize Once
setTimeout(() => $(window).trigger("resize"), 600);

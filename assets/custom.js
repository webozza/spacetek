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

// Swiper API -- Main Slider
var swiperGallery = new Swiper(".product-gallery .swiper-container", {
  navigation: {
    nextEl:
      ".product-gallery.carousel .carousel-nav-next",
    prevEl:
      ".product-gallery.carousel .carousel-nav-prev",
  },
});

// Swiper -- Thumbnail Slider
var swiperThumb = new Swiper(".product-slider .swiper-container", {
  slidesPerView: "auto",
  spaceBetween: 10,
  direction: "horizontal",
  navigation: {
    nextEl:
      ".product-thumbnail-nav-next, .product-gallery.carousel .carousel-nav-next",
    prevEl:
      ".product-thumbnail-nav-prev, .product-gallery.carousel .carousel-nav-prev",
  },
  scrollbar: {
    el: ".product-slider .swiper-scrollbar-drag",
    draggable: true,
  },
  mousewheel: false,
  allowTouchMove: true,
  slideToClickedSlide: true,
  loop: true,
});

$('.product-slider .swiper-slide').on('click', function() {
  var getIndex = $(this).attr('data-swiper-slide-index');
  console.log(swiperThumb.activeIndex);
});


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

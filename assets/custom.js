$ = jQuery;

// Price Range Slider Filter
$(function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 2000,
    values: [ 0, 2000 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " — $" + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " — $" + $( "#slider-range" ).slider( "values", 1 ) );
});

// Creates custom data attribute for price range
$('.collection-product-item').each(function() {
    var priceProduct = $(this);
    var str = priceProduct.find('span:first-child').text();
    var newstr = str.substr(1,str.length);
    $(this).closest('.collection-product-item').attr('data-price-range', newstr);
});

(function() {
  $('#slider-range').on('slidechange', function() {
    var selectedPriceMin = $("#slider-range").slider( "values", 0);
    var selectedPriceMax = $( "#slider-range" ).slider( "values", 1)
    console.log(selectedPriceMin, 'selected price min');
    console.log(selectedPriceMax, 'selected price max');

    // Initiate the Filter
    $('.collection-product-item[data-price-range]').filter(function() {
      return $(this).data('price-range') > selectedPriceMax || $(this).data('price-range') < selectedPriceMin
    }).fadeOut('slow');
    
    setTimeout(function() {
      $('.collection-product-item[data-price-range]').filter(function() {
        return $(this).data('price-range') <= selectedPriceMax && $(this).data('price-range') >= selectedPriceMin
      }).slideDown('slow');
    }, 600);
    
  });
})();

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
$("body.template-collection .collection-product-list > div .collection-product-item, .products-grid .product-elemet").each(function () {
  var cartLink = $(this).find(".group-button a").attr("href");
  var dataHandle = $(this).find('a.group-button-quickview').attr('data-handle');
  $(this)
    .find(".product-item")
    .append('<a class="product-btn" href="'+ cartLink+'" data-quick-view data-handle="'+dataHandle+'">Add to Cart</a>');
});

// Swiper API -- Main Slider
var swiperGallery = new Swiper(".product-gallery .swiper-container", {
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
    el: ".product-gallery .swiper-scrollbar-drag",
    draggable: true,
  },
  mousewheel: false,
  allowTouchMove: true,
  slideToClickedSlide: true,
  loop: true
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
  var clickedIndex = swiperThumb.clickedIndex;
  swiperGallery.slideTo(clickedIndex);
});

swiperThumb.on('slideChangeTransitionEnd', function () {
      var goToIndex = $('.product-slider .swiper-wrapper .swiper-slide-active').index();
      swiperGallery.slideTo(goToIndex);
});

swiperGallery.on('slideChangeTransitionEnd', function () {
      var goToIndex = $('.product-gallery .swiper-wrapper .swiper-slide-active').index();
      swiperThumb.slideTo(goToIndex); 
});

// When not enough slides 
var totalSlides = $('.product-slider .swiper-slide').length;
if(totalSlides <= 3) {
  $('.product-slider').hide();
  $('.product-gallery .swiper-slide:not(:first-child), .product-gallery.carousel .carousel-nav-next, .product-gallery.carousel .carousel-nav-prev').hide();
}

// Fix Gallery Slide Width & Height
function productDimensions() {
  setTimeout(function() {
    // var galleryHeight = $('.product-gallery .swiper-slide').outerHeight();
    // $('.product-gallery .swiper-container').attr('style', 'height: '+galleryHeight+'px');
    var containerWidth = $('.product-gallery .swiper-container').width();
    $('.product-gallery .swiper-slide').attr('style', 'width: '+containerWidth+'px');
  }, 600);
}


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
$("body.template-index .product-item, body.template-collection .product-item").each(function () {
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
  productDimensions();

  if (windowWidth > 1400) {
    customSlider();
    setSliderControlsHeight();
  }
  
});

// Trigger Resize Once
setTimeout(() => $(window).trigger("resize"), 600);

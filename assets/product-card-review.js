jQuery(document).ready(function ($) {
  $.ajax({
    url: "https://api.feefo.com/api/10/reviews/summary/service?merchant_identifier=aquacadabra",
    dataType: "json",
    success: function (data) {
      var rating = data.rating.rating;
      var total = data.rating.service.count;
  
      $("#feefo_review_count, .feefo_review_count").text(total);
  
      setTimeout(function () {
        $(".star-rating").find(".fa-star").css({ opacity: 1 });
      }, 500);
  
      $("#feefo_review_count").text(this.countNum);
  
      setTimeout(function () {
        $("#feefo_based_on").css({ opacity: 1 });
      }, 1000);
    }
  })

  if ($(".feefo-custom-holder").length) {
    $.each($(".feefo-custom-holder"), function (index, value) {
      var sku = "";
      var use_parent = false;
      if (typeof $(this).data("product-sku") != "undefined") {
        sku = $(this).data("product-sku");
      } else {
        sku = $(this).data("parent-product-sku");
        use_parent = true;
      }

      $(this).append("<iframe style='max-height: 30px; max-width: 100%;' id='feefo_iframe_" + sku + "'></iframe>");
      document
        .getElementById("feefo_iframe_" + sku)
        .contentWindow.document.write(
          '<html><head><script type="text/javascript" class="feefo-plugin-widget-bootstrap" src="//register.feefo.com/api/ecommerce/plugin/widget/merchant/aquacadabra" async></script></head><body><style>body{margin:0px;}feefowidget-logo-small{text-align: center;  display: block; padding: 0px;} feefowidget-logo-small .feefowidget-reviews-total{display: inline-block; color: #000;} feefowidget-container-floating-service, feefowidget-logo-small .feefowidget-logo {display:none}</style><div id="feefo-product-review-widgetId" class="feefo-review-widget-product" ' +
            (use_parent === true
              ? "data-parent-product-sku="
              : "data-product-sku=") +
            '"' +
            sku +
            '" style=\'display: none\'></div><div class="feefo-review-badge-wrapper-product"></div>\n</body></html>'
        );
      document.getElementById("feefo_iframe_" + sku).contentDocument.close();
    });
  }
});
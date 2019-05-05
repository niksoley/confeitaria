$(window).ready(function() {
  function carouselNormalization() {
    var items = $('.bannerItem'), //grab all slides
      heights = [], //create empty array to store height values
      smallest; //create variable to make note of the smallest slide

    if (items.length) {
      function normalizeHeights() {
        items.each(function() { //add heights to array
          heights.push($(this).height());
        });
        smallest = Math.min.apply(null, heights); //cache largest value
        items.each(function() {
          $(this).css('max-height', smallest + 'px');
        });
      };
      normalizeHeights();

      $(window).on('resize orientationchange', function() {
        smallest = 0,
        heights.length = 0; //reset vars
        items.each(function() {
          $(this).css('max-height', '0'); //reset min-height
        });
        normalizeHeights(); //run it again
      });
    }
  }

  carouselNormalization();
});

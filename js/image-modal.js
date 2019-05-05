// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("imgModal");

function reply_click(clicked_id) {

  $('.loader').css('display', 'block');

  modal.style.display = "flex";
  $("body").addClass("modal-open"); //block body scroll

  var srcString = String(document.getElementById(clicked_id).src);

  String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  var result = srcString.splice((srcString.length - 4), 0, "full");

  modalImg.src = result;

  $.get(result, {}, function() {
    $('#imgModal').css('display', 'flex');
    $('.loader').css('display', 'none');
  });

}

// When the user clicks on modalImg, close the modal
modalImg.onclick = function() {
  modal.style.display = "none";
  $("body").removeClass("modal-open"); //remove blocked scroll from body
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  $("body").removeClass("modal-open"); //remove blocked scroll from body
};

(function() {
  var _overlay = document.getElementById('myModal');
  var _clientY = null; // remember Y position on touch start

  _overlay.addEventListener('touchstart', function(event) {
    if (event.targetTouches.length === 1) {
      // detect single touch
      _clientY = event.targetTouches[0].clientY;
    }
  }, false);

  _overlay.addEventListener('touchmove', function(event) {
    if (event.targetTouches.length === 1) {
      // detect single touch
      disableRubberBand(event);
    }
  }, false);

  function disableRubberBand(event) {
    var clientY = event.targetTouches[0].clientY - _clientY;

    if (_overlay.scrollTop === 0 && clientY > 0) {
      // element is at the top of its scroll
      event.preventDefault();
    }

    if (isOverlayTotallyScrolled() && clientY < 0) {
      //element is at the top of its scroll
      event.preventDefault();
    }
  }

  function isOverlayTotallyScrolled() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
    return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
  }
}())

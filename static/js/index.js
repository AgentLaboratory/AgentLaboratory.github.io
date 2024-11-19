window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "https://storage.googleapis.com/nerfies-public/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;


var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Create a new Audio object with the path to your MP3 file
    //var audio = new Audio('resources/audio/lofi-jazzhop-chillhop-praga-262035.mp3');

    // Play the audio when the page loads
    //audio.play();

    // Create a new Audio object
    var audio = new Audio('resources/audio/lofi.mp3');
    audio.volume = 0.5;
    // Play audio when the user clicks anywhere on the page
    $(document).one('click', function() {
        audio.play();
    });
    // Get the YouTube iframe
    var youtubeFrame = $('#youtube-video-frame');

    // Function to calculate the center and bounds of the iframe
    function isMouseNearCenter(event) {
        var offset = youtubeFrame.offset(); // Get iframe's offset
        var width = youtubeFrame.width();
        var height = youtubeFrame.height();

        // Calculate the center of the iframe
        var centerX = offset.left + width / 2;
        var centerY = offset.top + height / 2;

        // Define a proximity radius around the center (e.g., 100px)
        var radius = 100;

        // Get mouse coordinates
        var mouseX = event.pageX;
        var mouseY = event.pageY;

        // Check if the mouse is within the radius
        var distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
        return distance < radius;
    }

    // Attach a mousemove event to the document
    $(document).mousemove(function(event) {
        if (isMouseNearCenter(event)) {
            audio.pause();
        }
    });
    


    




    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

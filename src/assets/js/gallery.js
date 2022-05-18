// Show the first four images
$("img:lt(5)").show();

// When the gallery button is clicked
$("#gallery-btn").on('click', function(event) {
    // Prevent default behavior
    event.preventDefault();
    // All of the hidden images
    var $hidden = $("img:hidden");
    // Show the next four images
    $($hidden).slice(0, 5).fadeIn(800);
    // If the length of $hidden is 4 then hide the button
    if ($hidden.length == 5) {
        $(this).fadeOut();
    }
});
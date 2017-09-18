$(document).ready(function() {

    $.get( { url: "http://localhost:8080/api/mike", dataType: 'jsonp' } ).done(function(response) {

            $("h1").text(response);
    });

});
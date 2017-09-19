$(document).ready(function() {

    $.get( { url: "http://localhost:8080/api/mike" } ).done(function(response) {

            $("h1").text(response);
    });

});
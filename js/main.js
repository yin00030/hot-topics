/*global $, console*/

$(document).ready(function () {

    "use strict";

    var contents, url, nm, em, sb, ms, dt, errors, collect, i;

    contents = {};

    dt = {};
    errors = [];

    $(".bg-main").load("./partials/home.html");



    function handleResponse(rsp) {

        $(".feedback").html(rsp);

        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#comment").val("");
    }


    function handleErrors(jqXHR, textStatus, errorThrown) {

        console.log("Error Message: " + errorThrown);
    }



    function validateForm(ev) {
        

        ev.preventDefault();

       /* nm = document.getElementById("name");
        em = document.getElementById("email");
        sb = document.getElementById("subject");
        ms = document.getElementById("comment");

        $(nm).val($.trim($(nm).val()));
        $(em).val($.trim($(em).val()));
        $(sb).val($.trim($(sb).val()));
        $(ms).val($.trim($(ms).val()));*/
        
         nm = $("#name").val();
        em = $("#email").val();
        sb =$("#subject").val();
        ms = $("#comment").val();

        
        


        if (nm === "") {
            errors.push("Please type your name!");

        } else {

            dt.name = nm;
        }


        if (em === "") {

            errors.push("Please type your email!");

        } else {

            dt.email = em;
        }


        if (sb === "") {

            errors.push("Please type your subject!");

        } else {

            dt.subject = sb;
        }


        if (ms === "") {

            errors.push("Type in your message!");

        } else {

            dt.message = ms;
        }

        if (errors.length === 0) {
            console.log("no errors");
            $.ajax({
                url: "./web-service/connect.php",
                type: "post",
                data: dt
            }).done(handleResponse).fail(handleErrors);

        } else {

            collect = "<p>Please fix the following errors:</p><ul>";
            for (i = 0; i < errors.length; i += 1) {
                collect += "<li>" + errors[i] + "</li>";
            }
            collect += "</ul>";
            $(".feedback").html(collect);

            errors = [];
            collect = "";
        }
    }


    function storeContents(topic) {

        $(topic).load(url, function (rsp) {

            if (!contents[url]) {

                contents[url] = rsp;

                $(topic).hide().html(rsp).fadeIn();

            } else {

                $(topic).hide().html(contents[url]).fadeIn();
            }


            $(".bg-main .box").on("submit", "form", validateForm);
        });
    }


    $(".nav-bar a").on("click", function (ev) {

        ev.preventDefault();

        url = $(this).attr("href");

        storeContents(".bg-main");
    });
});

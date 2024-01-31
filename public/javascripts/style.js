$(document).ready(function(){

    // // toggle menu sidebar
    // $('.hamburger').addClass("is-active");
    //   $(".sidebar").addClass('is-open');
    $(".hamburger").click(function(){
      $(this).toggleClass("is-active");
      $(".sidebar").toggleClass('is-open');
    });

    // slick slide
    $('.slider-activation').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-prev"><img src="./images/iconprev.png" alt=""></div>',
        nextArrow: '<div class="slick-next"><img src="./images/iconnext.png" alt=""></div>',
        dots: true,
    });

    // open login form
    $('#loginAccount').click(function() {
      $('.unauthorized-area').addClass('open-form');
      $('.register-area').removeClass('open-form');
      $('.container-main').addClass("hidden-container");
    });


    // open register form
    $('#registerAccount').click(function() {
      $('.unauthorized-area').removeClass('open-form');
      $('.register-area').addClass('open-form');
    });

    $(document).find("input:checked[type='radio']").addClass('bounce');   
    $("input[type='radio']").click(function() {
        $(this).prop('checked', false);
        $(this).toggleClass('bounce');

        if( $(this).hasClass('bounce') ) {
            $(this).prop('checked', true);
            $(document).find("input:not(:checked)[type='radio']").removeClass('bounce');
        }
    });


    var getToken = localStorage.getItem("TOKEN");
    if(getToken || (getToken != null || getToken != undefined)) {
      $(".header-login").css("display", "none");
    } else {
      $(".header-logined").css("display", "none");
    }
});

$('form').submit(function (e) {
  e.preventDefault();
  const data = {
    password: $('#password').val(),
    email: $('#email').val(),
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/api/auth/login',
    data: JSON.stringify(data),
    contentType: 'application/json',
  })
    .done((data) => {
      localStorage.setItem("TOKEN", data.jwt);
      localStorage.setItem("USER", $('#email').val());
      location.reload();
    })
    .fail((err) => {
    })
    .always(() => {
    });
});

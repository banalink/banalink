$(document).ready(function(){


  // toggle menu sidebar

    $(function(){
      $("#includedContentHeader").load("header.html"); 
      $("#includedContentFooter").load("footer.html");
    });

    // slick slide
    $('.slider-activation').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-prev"><img src="./images/iconprev.png" alt=""></div>',
        nextArrow: '<div class="slick-next"><img src="./images/iconnext.png" alt=""></div>',
        dots: true,
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

    let arrayList = document.querySelectorAll(".tab-type li");

    arrayList.forEach((elm, id) => {
      $('#tab-' + id).click(function() {
        arrayList.forEach((e, id) => {
          e.classList.remove('active');
        });
        elm.classList.add('active');
        const element = document.getElementById("list-game-tab" + id);
          element.scrollIntoView({ behavior: 'smooth'});
      });
    });

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

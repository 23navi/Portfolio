let user={
  fullName:"",
  email:"",
  username:"",
  password:"", 
}





var counter = 1;

$(document).ready(function() {

  var erroEle = $('.error-message'),
    focusInput = $('.questions').find('.active');

  $('.navigation a').click(function() {
    nextMaster('navi');

    var thisInput = $('#' + $(this).attr('data-ref'));
    $('.active').removeClass('active');
    thisInput.focus().addClass('active')
    thisInput.closest('li').animate({
      marginTop: '0px',
      opacity: 1
    }, 200);
    thisInput.closest('li').prevAll('li').animate({
        marginTop: '-150px',
        opacity: 0
      }, 200)
      //                     .AddClass('done');

    thisInput.closest('li').nextAll('li').animate({
        marginTop: '150px',
        opacity: 0
      }, 200)
      //                    .RemoveClass('done');
    errorMessage(erroEle, '', 'hidden', 0);

  });

  if (focusInput.val() != '') {
    $('#next-page').css('opacity', 1);
  }

  $(document).keypress(function(event) {
    if (event.which == 13) {
      nextMaster('keypress');
      event.preventDefault();
    }

    $('#next-page').click(function() {
      var focusInput = $('.questions').find('.active');
      nextMaster('nextpage');

    })

  });

  async function nextMaster(type) {
    var focusInput = $('.questions').find('.active');
    if (focusInput.val() != '') {
      if ((focusInput.attr('name') == 'name' ) && focusInput.val().length < 2) {
        errorMessage(erroEle, "isn't your " + focusInput.attr('name') + " bit small. ", 'visible', 1);

      }
      
      else if ((focusInput.attr('name') == 'username') && !(await $.ajax({
        url: 'http://localhost:3000/valid',
        type: 'POST',
        data:{username:focusInput.val()}
      }))) {

        
          errorMessage(erroEle, "yooo we are hitting it ", 'visible', 1);
  
        //errorMessage(erroEle, "isn't your " + focusInput.attr('name') + " bit small. ", 'visible', 1);

      }
      
      
      
      else if (focusInput.attr('name') == 'email' && !validateEmail(focusInput.val())) {
        errorMessage(erroEle, "It doesn't look like a " + focusInput.attr('name'), 'visible', 1);

      }
      else {
        if (focusInput.attr('name') == 'name') user.fullName= focusInput.val();
        if (focusInput.attr('name') == 'username') user.username= focusInput.val();
        if (focusInput.attr('name') == 'email') user.email= focusInput.val();
        if (focusInput.attr('name') == 'password') user.password= focusInput.val();

        

        if (type != 'navi') showLi(focusInput);
        $('#next-page').css('opacity', 0);
        errorMessage(erroEle, '', 'hidden', 0);
      }
    } else if (type == 'keypress') {
      errorMessage(erroEle, 'please enter your ' + focusInput.attr('name'), 'visible', 1);
    }

  }

  $("input[type='text']").keyup(function(event) {
    var focusInput = $(this);
    if (focusInput.val().length > 1) {
      if ((focusInput.attr('name') == 'email' && !validateEmail(focusInput.val()))) {
        $('#next-page').css('opacity', 0);
      } else {
        $('#next-page').css('opacity', 1);
      }
    } else {
      $('#next-page').css('opacity', 0);
    }
  });



  $("#password").keyup(function(event) {
    var focusInput = $(this);
    if (focusInput.val().length > 1) {
      $('#next-page').css('opacity', 1);
    }
  });


 



  
  $('#signup').click(function() {
    $(".container").fadeOut(400).css({
      'display': 'none',
      'opacity': 1
    });
    $('.navigation').fadeOut(400).css({
      'display': 'none',
      'opacity': 1
    });
    $('#sign-form').fadeOut(400).css({
      'display': 'none',
      'opacity': 1
    });
    $(this).fadeOut(400).css({
      'display': 'none',
      'opacity': 1
    });


   // show thankyou.. we will do something elseeee
    $('#load').css({
      'opacity': 1,
      'display': 'block'
    });

    console.log(user);

    setTimeout(()=>{
      //window.location.replace("http://stackoverflow.com");
    },500)

    





  });




  $('#show-pwd').mousedown(function() {
    $(this).toggleClass('view').toggleClass('hide');
    $("#password").attr('type', 'text'); 
    $('#password').css('opacity', 1);
  }).mouseup(function() {
    $(this).toggleClass('view').toggleClass('hide');
    $("#password").attr('type', 'password'); 
    $('#password').css('opacity', 1);
  });

});



function showLi(focusInput) {

  focusInput.closest('li').animate({
    marginTop: '-150px',
    opacity: 0
  }, 200);

  console.log(focusInput.closest('li'));

  if (focusInput.attr('id') == 'password') {
    $("[data-ref='" + focusInput.attr('id') + "']")
      .addClass('done').html('password').html(Array(focusInput.val().length+1).join("*"));
  } else {
    $("[data-ref='" + focusInput.attr('id') + "']").addClass('done').html(focusInput.val());
  }


  
 

  focusInput.removeClass('active');
  counter++;

  var nextli = focusInput.closest('li').next('li');

  nextli.animate({
    marginTop: '0px',
    opacity: 1
  }, 200);

  nextli.find('input').focus().addClass('active');

}

function errorMessage(textmeg, appendString, visib, opaci) {
  textmeg.css({
    visibility: visib
  }).animate({
    opacity: opaci
  }).html(appendString)
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

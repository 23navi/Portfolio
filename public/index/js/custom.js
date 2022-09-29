
(function($) {
    "use strict";

	
	// Smooth scrolling using jQuery easing
	  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		  if (target.length) {
			$('html, body').animate({
			  scrollTop: (target.offset().top - 54)
			}, 1000, "easeInOutExpo");
			return false;
		  }
		}
	  });
	
    // Closes responsive menu when a scroll trigger link is clicked
	  $('.js-scroll-trigger').click(function() {
		$('.navbar-collapse').collapse('hide');
	  });

	// Activate scrollspy to add active class to navbar items on scroll
	  $('body').scrollspy({
		target: '#mainNav',
		offset: 56
	  });

	// Collapse Navbar
	  var navbarCollapse = function() {
		if ($("#mainNav").offset().top > 100) {
		  $("#mainNav").addClass("navbar-shrink");
		} else {
		  $("#mainNav").removeClass("navbar-shrink");
		}
	  };
	// Collapse now if page is not at top
	  navbarCollapse();
	  // Collapse the navbar when page is scrolled
	  $(window).scroll(navbarCollapse);

	// Hide navbar when modals trigger
	  $('.portfolio-modal').on('show.bs.modal', function(e) {
		$(".navbar").addClass("d-none");
	  })
	  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
		$(".navbar").removeClass("d-none");
	  })

    // Scroll to top  		
	if ($('#scroll-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('#scroll-to-top').addClass('show');
				} else {
					$('#scroll-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#scroll-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
	
	// Banner 
	
    $('.heading').height( $(window).height() );
	$('.parallaxie').parallaxie();
	
    // LOADER
    $(window).load(function() {
        $("#preloader").on(500).fadeOut();
        $(".preloader").on(600).fadeOut("slow");
    });

	// Gallery Filter
        var Container = $('.container');
        Container.imagesLoaded(function () {
            var portfolio = $('.gallery-menu');
            portfolio.on('click', 'button', function () {
                $(this).addClass('active').siblings().removeClass('active');
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            var $grid = $('.gallery-list').isotope({
                itemSelector: '.gallery-grid'
            });

        });
	
    // FUN FACTS   

    function count($this) {
        var current = parseInt($this.html(), 10);
        current = current + 50; 
        $this.html(++current);
        if (current > $this.data('count')) {
            $this.html($this.data('count'));
        } else {
            setTimeout(function() {
                count($this)
            }, 30);
        }
    }
    $(".stat_count, .stat_count_download").each(function() {
        $(this).data('count', parseInt($(this).html(), 10));
        $(this).html('0');
        count($(this));
    });



    // CONTACT


    (function () {
      'use strict'
  
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.validated-form')
  
      // Loop over them and prevent submission
      Array.from(forms)
          .forEach(function (form) {
              form.addEventListener('submit', function (event) {
                  if (!form.checkValidity()) {
                      event.preventDefault()
                      event.stopPropagation()
                  }
  
                  form.classList.add('was-validated')
              }, false)
          })
      })()




    document.getElementById("contactForm").addEventListener("submit", function(event){
      event.preventDefault();

      let name= $('#name').val()
      let email= $('#email').val()
      let phone= $('#phone').val()
      let message= $('#messageData').val()

      

      let data={
        name,
        email,
        phone,
        message
      }

      $.post("/contact",data,(data)=>{

        if(data.error){

          $(".alert").remove();



            const html= `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                          ${data.error}
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>`;

            $("#forPostMessage").prepend(html)
        }else{

          $(".alert").remove();

          const html= `<div class="alert alert-success alert-dismissible fade show" role="alert">
                        Hey ${name}.. I will send reply to you as soon as possible. Check you inbox.. I have send you something 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;

          $("#forPostMessage").prepend(html)

          $('#name').val("");
          $('#email').val("");
          $('#phone').val("");
          $('#messageData').val("")

        }
  
        

    })

      // $.ajax({
      //   url:`/contact`,
      //   type:"POST",
      //   success:(post)=>{
      //       console.log(post);
            

      //       const html= `<div class="alert alert-success alert-dismissible fade show" role="alert">
      //                       Hey ${first_name}.. I will send reply to you as soon as possible. Check you inbox.. I have send you something 
      //                       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      //                           <span aria-hidden="true">&times;</span>
      //                       </button>
      //                   </div>`;

      //     $("#forPostMessage").prepend(html)

      //   }
      // })
    });







  //   jQuery(document).ready(function() {
  //     $('#contactform').submit(function() {
  //         var action = $(this).attr('action');
  //         $("#message").slideUp(750, function() {
  //             $('#message').hide();
  //             $('#submit')
  //                 .after('<img src="images/ajax-loader.gif" class="loader" />')
  //                 .attr('disabled', 'disabled');
  //             $.post(action, {
  //                     first_name: $('#first_name').val(),
  //                     last_name: $('#last_name').val(),
  //                     email: $('#email').val(),
  //                     phone: $('#phone').val(),
  //                 },
  //                 function(data) {
  //                     document.getElementById('message').innerHTML = data;
  //                     $('#message').slideDown('slow');
  //                     $('#contactform img.loader').fadeOut('slow', function() {
  //                         $(this).remove()
  //                     });
  //                     $('#submit').removeAttr('disabled');
  //                     if (data.match('success') != null) $('#contactform').slideUp('slow');
  //                 }
  //             );
  //         });
  //         return false;
  //     });
  // });











})(jQuery);















$.get("/getQuote",(data)=>{
  const html= `<blockquote contenteditable="false"><q>${data.quote}</q>
                  <cite>~${data.cite}</cite>
              </blockquote>`;
  $(".quote").prepend(html)
})
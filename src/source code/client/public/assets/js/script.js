(function ($) {
    "use strict"; // Start of use strict
    /*
        - Aos animation
        - To Top
        - Navbar
        - Collapse hide show for mobile
        - Background image
        - Sidebar filters
        - Append row
        - Collapse text
        - Counter
        - FileUp
        - Testimonial
        - Theia sticky sidebar
        - Image parallax
        - Owl carousel
        - Range slider
        - Select 2
        - Grid container
        - Popup youtube & gallery
        - Toggle password
        - Two step verification form
        - Tooltip
    */
    /*-------------------------------------------
        Aos animation
    --------------------------------------------- */
    AOS.init({
        // once: true,
        // whether animation should happen only once - while scrolling down
    });
    /*-------------------------------------------
        To Top
    --------------------------------------------- */
    $('body').append('<div id="toTop" class="btn-top"><i class="fa-solid fa-arrow-up"></i></div>');
    $(window).scroll(function () {
        if ($(this).scrollTop() !== 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*-------------------------------------------
        Navbar
    --------------------------------------------- */
    //navbar add remove calss
    var header = $(".navbar-transfarent");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            header.removeClass('navbar-transfarent').addClass("navbar-bg");
        } else {
            header.removeClass("navbar-bg").addClass('navbar-transfarent');
        }
    });

    // Navbar collapse hide
    $(".navbar-collapse .collapse-close").on("click", function () {
        $(".navbar-collapse").collapse("hide");
    });
    // navbar toggle icon
    $('#nav-icon').click(function () {
        $(this).toggleClass('open');
    });

    /*-------------------------------------------
        Collapse hide show for mobile
    --------------------------------------------- */

    if ($('#CollapseText').length) {
        var collapseText = $('#CollapseText');
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 1) {
                collapseText.collapse('hide');
            } else {
                collapseText.collapse('show');
            }
        });
    }

    /*-------------------------------------------
        Background image
    --------------------------------------------- */
    if ($('.js-bg-image').length) {
        $(".js-bg-image").css("backgroundImage", function () {
            var bg = "url(" + $(this).data("image-src") + ")";
            return bg;
        });
    }
    /*-------------------------------------------
        Sidebar filters
    --------------------------------------------- */
    $('.all-filters').on('click', function () {
        $('.js-sidebar-filters-mobile').toggleClass('active');
        $('.map-content').removeClass('opened');
    });

    $('.sidebarCollapse').on('click', function () {
        $('.js-sidebar-filters-mobile, .map-content').toggleClass('active');
    });

    $('#mapCollapse, .map-close-icon').on('click', function () {
        $('.map-content').toggleClass('opened');
    });

    $('.filter-close').on('click', function () {
        $('.js-sidebar-filters-mobile').removeClass('active');
    });

    /*-------------------------------------------
          Append row
      --------------------------------------------- */
    var faqs_row = 0;

    function addItem() {
        var rowHtml = '<tr id="faqs-row' + faqs_row + '">';
        rowHtml += '<td><input type="text" class="form-control"></td>';
        rowHtml += '<td><input type="text" class="form-control"></td>';
        rowHtml += '<td><input type="text" class="form-control" placeholder="USD"></td>';
        rowHtml += '<td class="mt-10"><button type="button" class="btn btn-danger delete-btn"><i class="fa fa-trash"></i></button></td>';
        rowHtml += '</tr>';
        $('#faqs tbody').append(rowHtml);
        faqs_row++;
    }

    // Use event delegation for dynamically added elements
    $('#faqs').on('click', '.delete-btn', function () {
        $(this).closest('tr').remove();
    });

    // Use jQuery for the "Add New" button click
    $('.text-center').on('click', 'button', function () {
        addItem();
    });

    /*-------------------------------------------
        Collapse text
    --------------------------------------------- */
    if ($('.collapseText').length) {
        var button = $(".collapseText");
        var originalText = "Hide filters";
        var newText = "Show filters";
        var isToggled = false;

        button.on("click", function () {
            var span = button.find("span");

            if (isToggled) {
                span.text(originalText);
            } else {
                span.text(newText);
            }

            isToggled = !isToggled;
        });
    }

    /*-------------------------------------------
        Counter
    --------------------------------------------- */
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 1,
            time: 500,
        });
    }
    /*-------------------------------------------
        FileUp
    --------------------------------------------- */
    if ($('.fileUp').length) {
        $('.fileUp').FancyFileUpload({
            params: {
                action: 'fileuploader'
            },
            maxfilesize: 1000000
        });
    }
    /*-------------------------------------------
        Testimonial
    --------------------------------------------- */
    if ($('.testimonial-carouse').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 10,
            dots: false,
            items: 1,
            nav: true,
            navText: [
                '<i class="fa-solid fa-arrow-left"></i>',
                '<i class="fa-solid fa-arrow-right"></i>'
            ],
        })
    }

    /*-------------------------------------------
        Theia sticky sidebar
    --------------------------------------------- */
    $(".content, .sidebar").theiaStickySidebar({
        additionalMarginTop: 90
    });

    /*-------------------------------------------------
        Image parallax
    ------------------------------------------------ */
    if ($('.js-image-parallax').length) {
        var image = document.getElementsByClassName('js-image-parallax');
        new simpleParallax(image, {
            delay: .6,
            transition: 'cubic-bezier(0,0,0,1)'
        });
    }

    /*-------------------------------------------------
        Owl carousel
    ------------------------------------------------ */
    if ($('.place-carousel').length) {
        var placeCarousel = $(".place-carousel");
        placeCarousel.owlCarousel({
            loop: true,
            margin: 24,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa-solid fa-arrow-left"></i>',
                '<i class="fa-solid fa-arrow-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 4,
                }
            }
        })
    }
    if ($('.testimonial-carousel').length) {
        var owl = $(".testimonial-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 10,
            dots: false,
            items: 1,
            nav: true,
            navText: [
                '<i class="fa-solid fa-arrow-left"></i>',
                '<i class="fa-solid fa-arrow-right"></i>'
            ],
        })
    }
    if ($('.blog-carousel').length) {
        var owl = $(".blog-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 24,
            navText: [
                '<i class="fa-solid fa-arrow-left"></i>',
                '<i class="fa-solid fa-arrow-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                992: {
                    items: 3,
                }
            }
        })
    }
    if ($('.listings-carousel').length) {
        var owl = $(".listings-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 24,
            navText: [
                '<i class="fa-solid fa-arrow-left"></i>',
                '<i class="fa-solid fa-arrow-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                992: {
                    items: 3,
                }
            }
        })
    }
    if ($('.header-carousel').length) {
        var headerOwl = $(".header-carousel");
        headerOwl.owlCarousel({
            loop: true,
            margin: 10,
            items: 1,
            nav: false,
            dots: false,
            autoplay: true,
            animateOut: 'fadeOut'
        })
    }
    if ($('.items-carousel').length) {
        var itemsCarousel = $(".items-carousel");
        itemsCarousel.owlCarousel({
            loop: true,
            margin: 24,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa-solid fa-arrow-left"></i>',
                '<i class="fa-solid fa-arrow-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                },
                468: {
                    items: 1.5,
                },
                768: {
                    items: 2.3,
                },
                992: {
                    items: 2.5,
                },
                1200: {
                    items: 3.3,
                }
            }
        })
    }

    /*-------------------------------------------------
      Range slider
    ------------------------------------------------ */
    if ($('.js-range-slider').length) {
        var rangeSlider = $(".js-range-slider");
        rangeSlider.ionRangeSlider({
            skin: "round",
            type: "double",
            min: 500,
            max: 5000,
            from: 500,
            to: 3000,
            prefix: "$"
        });
    }
    /*-------------------------------------------------
      Select 2
    ------------------------------------------------ */
    if ($('.select2').length) {
        var selectOption = $(".select2");
        selectOption.select2({
            theme: "bootstrap-5",
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            placeholder: $(this).data('placeholder'),
        });
    }
    /*-------------------------------------------------
      Grid container
    ------------------------------------------------ */
    if ($('.blog-grid').length) {
        var masonry = new Macy({
            container: '.blog-grid',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: 24,
            breakAt: {
                1200: 2,
                992: 2,
                768: 2,
                576: 1
            }
        });
    }
    /*-------------------------------------------
    Popup youtube & gallery
    --------------------------------------------- */
    if ($('.popup-youtube').length) {
        $(".popup-youtube").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    }
    if ($('.zoom-gallery').length) {
        $('.zoom-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,
                titleSrc: function (item) {
                    return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
                }
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function (element) {
                    return element.find('img');
                }
            }
        });
    }
    if ($('.zoom-gallery-two').length) {
        $('.zoom-gallery-two').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,
                titleSrc: function (item) {
                    return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
                }
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function (element) {
                    return element.find('img');
                }
            }
        });
    }

    /*-------------------------------------------
        Toggle password
    --------------------------------------------- */
    if ($('.toggle-password').length) {
        $(".toggle-password").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = $($(this).attr("data-bs-toggle"));
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
    }
    /*-------------------------------------------
        Two step verification form
    --------------------------------------------- */
    if ($('.verification-form').length) {
        // Get all input elements
        const inputs = document.querySelectorAll('.verification-form');

        // Add event listener to each input
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                // Allow only numbers
                e.target.value = e.target.value.replace(/[^0-9]/g, '');

                // Move focus to the next input when a character is entered
                if (e.target.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            // Move focus to the previous input when backspace is pressed
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    }

    /*-------------------------------------------
        Tooltip
    --------------------------------------------- */
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

})(jQuery);

// Kiểm tra xem trình duyệt đã tải xong toàn bộ tài liệu DOM chưa
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tham chiếu đến phần tử có ID là "themeToggleBtn"
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    // Kiểm tra xem phần tử có tồn tại không
    if (themeToggleBtn) {
        // Nếu phần tử tồn tại, thêm sự kiện click vào nó
        themeToggleBtn.addEventListener('click', function () {
            // Kiểm tra chủ đề hiện tại và chuyển đổi
            const htmlElement = document.documentElement;
            if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
                htmlElement.setAttribute('data-bs-theme', 'light');
                updateIcon('light'); // Cập nhật biểu tượng khi chuyển sang chủ đề sáng
                localStorage.setItem('theme', 'light'); // Lưu sự ưa thích chủ đề vào localStorage
                localStorage.setItem('mapStyle', 'light'); // Lưu sự ưa thích chủ đề vào localStorage
                localStorage.setItem('imagePath', 'assets/images/lines.svg'); // Lưu sự ưa thích chủ đề vào localStorage
            } else {
                htmlElement.setAttribute('data-bs-theme', 'dark');
                updateIcon('dark'); // Cập nhật biểu tượng khi chuyển sang chủ đề tối
                localStorage.setItem('theme', 'dark'); // Lưu sự ưa thích chủ đề vào localStorage
                localStorage.setItem('mapStyle', 'dark'); // Lưu sự ưa thích chủ đề vào localStorage
                localStorage.setItem('imagePath', 'assets/images/lines-2.svg'); // Lưu sự ưa thích chủ đề vào localStorage
            }
        });
    } else {
        // Nếu phần tử không tồn tại, hiển thị thông báo hoặc xử lý phù hợp
        console.error('Element with ID "themeToggleBtn" not found.');
    }
});


    function updateIcon(theme) {
        const iconElement = themeToggleBtn.querySelector('i');
        iconElement.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // Get all elements with the class .js-bg-image-lines
    var bgImageElements = document.querySelectorAll('.js-bg-image-lines');

    bgImageElements.forEach(function (bgImageElement) {
        // Check if the element with .js-bg-image-lines class exists
        if (bgImageElement) {
            var currentImagePath = localStorage.getItem('imagePath') || 'assets/images/lines.svg';

            // Set the initial background image
            bgImageElement.style.backgroundImage = 'url(' + currentImagePath + ')';
        }
    });

    // Get references to all reply open buttons and reply forms
    var replyOpenBtns = document.querySelectorAll('.reply-open');
    var replyCloseBtns = document.querySelectorAll('.reply-close-btn');
    var replyForms = document.querySelectorAll('.reply-form');

    // Add event listeners for all reply open buttons
    replyOpenBtns.forEach(function (btn, index) {
        btn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            replyForms[index].classList.add('show'); // Show the corresponding reply form
        });
    });

    // Add event listeners for all reply close buttons
    replyCloseBtns.forEach(function (btn, index) {
        btn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            replyForms[index].classList.remove('show'); // Hide the corresponding reply form
        });
    });


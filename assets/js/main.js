$(function () {
    const releaseTime = new Date(Date.UTC(2021, 04, 10, 04, 00, 0, 0)).getTime();
    const endTime = new Date(Date.UTC(2021, 07, 31, 04, 00, 0, 0)).getTime();

    function getNowUTC() {
        return Date.now();
    }
    function injectGA() {
        if (typeof window == 'undefined') {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-FP8LS6GWYD');
    };

    $(document).ready(function () {
        wow = new WOW({
                      boxClass:     'wow',      // default
                      animateClass: 'animated', // default
                      offset:       0,          // default
                      mobile:       true,       // default
                      live:         true        // default
                    })
        wow.init();
    });

    let forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    let validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const now = getNowUTC();
            if (now < releaseTime) {
                console.warn('Token Sales is comming soon, please submit later.');
                return;
            } else if (now > endTime) {
                console.warn('Token Sales is over, cannot submit.');
                return;
            } else {
                const yourBudget = $('#your-budget').val();
                const yourBudgetLength = yourBudget.length;
                const yourFilteredBudget = yourBudget.substring(0, yourBudgetLength - 3).split("").filter(
                    item =>
                        item !== ",").join("");
                const priceBudget = parseInt(yourFilteredBudget);
                const yourAddress = $('#your-address').val().substring(0, 2);
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                const isValidEmail = emailRegex.test($('#your-email').val());
                console.log(isValidEmail)
                if (form.checkValidity() === false) {
                    console.warn('Form validated: fail.');
                    form.classList.add('was-validated');
                    if (!isValidEmail) {
                        $('#invalid-feedback-email').addClass('active');
                        if ($('#your-email').val()) {
                            $('#invalid-feedback-email').text("Your Email errors!");
                        } else {
                            $('#invalid-feedback-email').text("Please input your email address.");
                        }
                    } else {
                        $('#invalid-feedback-email').removeClass('active');
                    }
                    if (yourAddress) {
                        if (yourAddress !== "0x" || $('#your-address').val().length < 42) {
                            document.getElementById("invalid-feedback-address").innerHTML =
                                "Your Address errors!";
                            $('#invalid-feedback-address').addClass('active');
                        }
                        return
                    } else {
                        $('#invalid-feedback-address').text('Please input your ETH address.');
                    }
                    if (priceBudget <= 0) {
                        document.getElementById("invalid-feedback-budget").innerHTML =
                            "Your Budget price errors!";
                        $('#invalid-feedback-budget').addClass('active');
                        return;
                    }
                } else {
                    if (priceBudget <= 0) {
                        document.getElementById("invalid-feedback-budget").innerHTML =
                            "Your budget price errors!";
                        $('#invalid-feedback-budget').addClass('active');
                        return;
                    }
                    if (yourAddress !== "0x") {
                        document.getElementById("invalid-feedback-address").innerHTML =
                            "Your Address errors!";
                        $('#invalid-feedback-address').addClass('active');
                    } else {
                        console.info('Form validated: success.');
                        $('#invalid-feedback-budget').removeClass('active');
                        submitForm();
                    }
                }
            }
        });
    });

    const submitForm = (() => {
        window.location = 'mailto:info.sales@s-one.finance?subject=Request Buy SONE Token&body=' +
            'Your Name: ' + $('#your-name').val() + '%0D%0A' +
            'Your Email: ' + $('#your-email').val() + '%0D%0A' +
            'Your ETH Address: ' + $('#your-address').val() + '%0D%0A' +
            'Your Budget: $' + $('#your-budget').val().replace(/^[0,]+/, '') + '%0D%0A' +
            'Your Payment: ' + $('#your-payment').val();
    })

    function changeTitleToEn() {
        document.getElementById("language-main").innerHTML = 'EN';
        document.getElementById("language-main-moblie").innerHTML = 'EN';
    };

    function changeTitleToJp() {
        document.getElementById("language-main").innerHTML = '';
        document.getElementById("language-main-moblie").innerHTML = '日本語';
    };
    $('.btn-ct').click(() => {
        $('.sub-menu').addClass("active", 1000, "easeInOutQuad");
    });
    $('.btn-close').click(() => {
        $('.sub-menu').removeClass("active");
    });
    $('.content-link').click(() => {
        $('.sub-menu').removeClass("active");
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    $('.bxslider').bxSlider({
        mode: 'vertical',
        auto: false,
        slideMargin: 0,
        infiniteLoop: false,
        pager: false,
        controls: true,
        minSlides: 4,
        maxSlides: 4,
        moveSlides: 1,
        hideControlOnEnd: true,
        preventDefaultSwipeY: true,
        preventDefaultSwipeX: true,
        touchEnabled: true,
        slideSelector: 'div.box-slide-item',
        touchEnabled: false
    });
});
(function ($) {

  const loading = () => {
    $(window).on('load', function () {
      setTimeout(function () {
        $('.loading').addClass('is-loaded');
        $('.loading__logo').addClass('is-active');
      }, 300);
    });
  };

  const initAos = () => {
    AOS.init();
  };

  const lazyLoad = () => {
    const lazyLoadInstance = new LazyLoad();
  };

  const goAnchor = () => {
    // 觸發錨點
    $('[data-href]').on('click', function () {
      let target = $(this).data('href');
      let headerHeight = $('header').outerHeight();
      let targetPosition = $(target).offset().top;
      $('.nav').removeClass('is-active');
      $('.hamburger').removeClass('is-active');
      $('html,body').animate({
        scrollTop: targetPosition - headerHeight
      }, 700);
    });
  };

  const openHamburger = () => {
    $('.hamburger').on('click', function () {
      $('.nav').toggleClass('is-active');
      $(this).toggleClass('is-active');
    });
  };

  const scrollToTop = () => {
    // 滑動到特定區塊時顯示 scrollTop
    $(window).scroll(function () {
      if ($(window).scrollTop() > $('#title-5').offset().top) {
        $('.scroll-top').addClass('is-active');
      } else {
        $('.scroll-top').removeClass('is-active');
      }
    });

    // 點擊滑動到特定區塊
    $('.scroll-top').on('click', function () {
      $('html,body').animate({
        scrollTop: 0
      }, 700, 'swing');
    });

  };

  let pcBannerSwiper = '';
  const initSwiper = () => {

    pcBannerSwiper = new Swiper(".pc-banner .swiper", {
      slidesPerView: 1,
      direction: "vertical",
      mousewheel: {
        releaseOnEdges: false, // 輪播的滑鼠事件
      },
      effect: 'fade',
      speed: 800,
      on: {
        slideChange: function () {
          setTimeout(function () {
            pcBannerSwiper.params.mousewheel.releaseOnEdges = false;
          }, 500);
        },
        reachEnd: function () { // 輪播的最後一張時觸發事件
          setTimeout(function () {
            pcBannerSwiper.params.mousewheel.releaseOnEdges = true;
          }, 750);
        }
      },
    });

    new Swiper('.quality .swiper', {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      preloadImages: false,
      lazy: true,
    });

    new Swiper('.environment .swiper', {
      slidesPerView: 1,
      loop: true,
      effect: 'fade',
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      preloadImages: false,
      lazy: true,
    });
  };

  const toggleModal = () => {
    $('.openModal').on('click', function () {
      $('.modal').addClass('is-active');
      $('body').addClass('overflow-hidden');
    });
    $('.closeModal').on('click', function () {
      $('.modal').removeClass('is-active');
      $('body').removeClass('overflow-hidden');
    });
  };

  $(function () {
    loading();
    initAos();
    lazyLoad();
    goAnchor();
    openHamburger();
    scrollToTop();
    initSwiper();
    toggleModal();
  });
})(jQuery);

// 解構取出 VeeValidate 方法
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

// rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// 語言i18n
loadLocaleFromURL('./zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
  validateOnInput: true, // input輸入字元立即進行驗證
});

const app = Vue.createApp({
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          recommend: '',
        }
      },
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    sendForm() {
      const nowTime = new Date();
      const data = {
        'source': 'WEB',
        ...this.form.user, // 展開
        'time': `${nowTime.getMonth() + 1}/${nowTime.getDate()}${nowTime.getHours()}:${nowTime.getMinutes()}`,
      };
      $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx21XiSgH7Vd76HRsIKlcQYq4cIYj8Y_2VpyXN7eevZ3C0S9S7SIGdVqO-jfjuj6tzE/exec',
        data,
        success: function (res) {
          if (res === '成功') {
            Swal.fire('成功');
          }
        },
      });
      this.$refs.form.resetForm(); // 清空 form 表單內容，套件用法
    },
    isEmail(value) { // 判斷 email 是否符合正規表達式
      const email = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return email.test(value) ? true : '請填寫正確的E-mail'
    },
    isPhone(value) { // 判斷電話是否符合正規表達式
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼'
    },
  }
});

app.mount('#app');
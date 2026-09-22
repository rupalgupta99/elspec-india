document.addEventListener('DOMContentLoaded', function () {

  function closeDropdowns() {
    document.querySelectorAll('nav.main-nav li.open').forEach(function (li) {
      li.classList.remove('open');
      var btn = li.querySelector('.nav-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMobileNav() {
    var navToggle = document.querySelector('.nav-toggle-mobile');
    var mainNav = document.querySelector('.main-nav');
    if (mainNav) mainNav.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle-mobile');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileNav();
      });
    });
  }

  /* ---------- Dropdown menus (Services / Case Studies) ---------- */
  document.querySelectorAll('.has-dropdown > .nav-toggle').forEach(function (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.closest('li');
      var wasOpen = li.classList.contains('open');
      closeDropdowns();
      if (!wasOpen) {
        li.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (e) {
    var navItem = e.target.closest('nav.main-nav li');
    if (!navItem) {
      closeDropdowns();
      closeMobileNav();
    }
  });

  /* ---------- Hero slideshow ---------- */
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dots button');
  if (slides.length > 1) {
    var heroEyebrow = document.querySelector('[data-hero-eyebrow]');
    var heroTitle = document.querySelector('[data-hero-title]');
    var heroDescription = document.querySelector('[data-hero-description]');
    var heroPrimary = document.querySelector('[data-hero-primary]');
    var heroSecondary = document.querySelector('[data-hero-secondary]');
    var heroContent = [
      ['Elspec India', 'When Power Meets Quality', "Measure | Control | Resolve — bringing Elspec's globally proven power quality analyzers, monitoring software and real-time compensation solutions to Indian industry, utilities and commercial enterprises.", 'Know More', 'index.html#what-we-do', 'Contact Us', 'index.html#contact'],
      ['Elspec India', 'When Power Meets Quality', "Measure | Control | Resolve — bringing Elspec's globally proven power quality analyzers, monitoring software and real-time compensation solutions to Indian industry, utilities and commercial enterprises.", 'Know More', 'index.html#what-we-do', 'Contact Us', 'index.html#contact'],
      ['Elspec India', 'When Power Meets Quality', "Measure | Control | Resolve — bringing Elspec's globally proven power quality analyzers, monitoring software and real-time compensation solutions to Indian industry, utilities and commercial enterprises.", 'Know More', 'index.html#what-we-do', 'Contact Us', 'index.html#contact'],
      ['Elspec India', 'When Power Meets Quality', "Measure | Control | Resolve — bringing Elspec's globally proven power quality analyzers, monitoring software and real-time compensation solutions to Indian industry, utilities and commercial enterprises.", 'Know More', 'index.html#what-we-do', 'Contact Us', 'index.html#contact'],
      ['Elspec India', 'When Power Meets Quality', "Measure | Control | Resolve — bringing Elspec's globally proven power quality analyzers, monitoring software and real-time compensation solutions to Indian industry, utilities and commercial enterprises.", 'Know More', 'index.html#what-we-do', 'Contact Us', 'index.html#contact'],
    ];
    var updateHero = function (i) {
      var copy = heroContent[i];
      if (!copy) return;
      if (heroEyebrow) heroEyebrow.textContent = copy[0];
      if (heroTitle) heroTitle.textContent = copy[1];
      if (heroDescription) heroDescription.textContent = copy[2];
      if (heroPrimary) { heroPrimary.textContent = copy[3]; heroPrimary.href = copy[4]; }
      if (heroSecondary) { heroSecondary.textContent = copy[5]; heroSecondary.href = copy[6]; }
    };
    var current = 0;
    var rotate = function () {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
      updateHero(current);
    };
    var timer = setInterval(rotate, 5000);
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(timer);
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = i;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        updateHero(current);
        timer = setInterval(rotate, 5000);
      });
    });
  }

  /* ---------- Case-study card marquee ---------- */
  var caseTrack = document.querySelector('.cases-slider .cases-grid');
  if (caseTrack && caseTrack.children.length) {
    Array.prototype.slice.call(caseTrack.children).forEach(function (card) {
      caseTrack.appendChild(card.cloneNode(true));
    });
  }

  /* ---------- Testimonials carousel ---------- */
  var testiSlides = document.querySelectorAll('.testi-slide');
  var prevBtn = document.querySelector('.testi-nav .prev');
  var nextBtn = document.querySelector('.testi-nav .next');
  if (testiSlides.length > 1) {
    var tCurrent = 0;
    var showTesti = function (i) {
      testiSlides[tCurrent].classList.remove('active');
      tCurrent = (i + testiSlides.length) % testiSlides.length;
      testiSlides[tCurrent].classList.add('active');
    };
    if (nextBtn) nextBtn.addEventListener('click', function () { showTesti(tCurrent + 1); });
    if (prevBtn) prevBtn.addEventListener('click', function () { showTesti(tCurrent - 1); });
    setInterval(function () { showTesti(tCurrent + 1); }, 6000);
  }

  /* ---------- Enquiry form -> Zoho CRM (Web-to-Lead, submitted via fetch so the visitor never leaves the page) ---------- */
  var form = document.querySelector('.enquire-form');
  if (form) {
    var zohoDateField = form.querySelector('#LEADCF52');
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');

      // Zoho's Leads layout requires this field; visitors are never asked for it.
      if (zohoDateField) {
        var today = new Date();
        zohoDateField.value = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
      }

      var formData = new FormData(form);

      fetch(form.action, { method: 'POST', mode: 'no-cors', body: formData })
        .then(function () {
          if (status) {
            status.textContent = 'Thanks! Your enquiry has been noted. Our team will get back to you shortly.';
            status.classList.remove('error');
            status.classList.add('success');
          }
          form.reset();
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Something went wrong sending your enquiry — please email us directly at info@elspec.in.';
            status.classList.remove('success');
            status.classList.add('error');
          }
        });
    });
  }

});

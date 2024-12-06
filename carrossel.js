document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada.');
  
   
    const carouselTrack = document.querySelector('.carousel-track'); 
    const images = document.querySelectorAll('.carousel-track img'); 
    const indicators = document.querySelectorAll('.indicator'); 
    
    let currentIndex = 0; 
    const totalImages = images.length; 
  
    function updateIndicators() {
      indicators.forEach((indicator, i) => {
        if (i === currentIndex) {
          indicator.classList.add('active'); 
        } else {
          indicator.classList.remove('active'); 
        }
      });
    }
  
    
    function moveCarousel() {
      // Atualiza o deslocamento do carrossel
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateIndicators(); 
    }
  
    
    function autoSlide() {
      currentIndex = (currentIndex + 1) % totalImages; 
      moveCarousel(); 
    }
  
    
    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        currentIndex = i; 
        moveCarousel(); 
      });
    });
  
    
    const autoSlideInterval = setInterval(autoSlide, 4000); 
  
    
    const carouselContainer = document.querySelector('.carousel');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval)); 
    carouselContainer.addEventListener('mouseleave', () => setInterval(autoSlide, 4000)); 
  });

  const swiper = new Swiper(".mySwiper", {
    loop: true, 
    slidesPerView: 1, 
    speed: 3000, 
    autoplay: {
        delay: 5000, 
        disableOnInteraction: false, 
    },
    pagination: {
        el: ".swiper-pagination", 
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next", 
        prevEl: ".swiper-button-prev", 
    },

    breakpoints: { 
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3, 
        },
    },
    effect: "fade", 
    fadeEffect: { 
        crossFade: true, 
    },
});

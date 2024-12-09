// tive que refazer a logica do carrossel para que ele fizesse um loop infinito mas acredito que terei que rever novamente a logica dele - assinado yan gustf 
// obs : tera que ser feitoajustes no css e html

document.addEventListener('DOMContentLoaded', () => {
  console.log('Página carregada.');

  const carouselTrack = document.querySelector('.carousel-track');
  const images = Array.from(document.querySelectorAll('.carousel-track img')); 
  const indicators = document.querySelectorAll('.indicator');
  const carouselContainer = document.querySelector('.carousel-images');

  let currentIndex = 0;
  let autoSlideInterval;

  // Cria clones das imagens
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);

  carouselTrack.appendChild(firstClone);
  carouselTrack.insertBefore(lastClone, images[0]);

  const totalImages = images.length + 2; 
  carouselTrack.style.transform = `translateX(-${100}%)`; 

  // Atualiza o estado dos indicadores
  function updateIndicators() {
    indicators.forEach((indicator, i) => {
      if (i === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // Move o carrossel para a imagem atual
  function moveCarousel() {
    carouselTrack.style.transition = 'transform 0.5s ease-in-out';
    carouselTrack.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

    // Resetar para o loop infinito no final da transição
    carouselTrack.addEventListener('transitionend', () => {
      if (currentIndex === totalImages - 1) { 
        carouselTrack.style.transition = 'none';
        currentIndex = 0;
        carouselTrack.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
      } else if (currentIndex === -1) { 
        carouselTrack.style.transition = 'none';
        currentIndex = images.length - 1;
        carouselTrack.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
      }
      updateIndicators(); 
    });
  }

  // Desloca o carrossel automaticamente
  function autoSlide() {
    currentIndex = (currentIndex + 1) % totalImages; 
  }

  // Inicia o deslocamento automático
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 4000);
  }

  // Atualiza o índice com base no clique nos indicadores
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      currentIndex = i;
      moveCarousel();
    });
  });

  // Pausa o deslocamento automático quando o cursor entra no carrossel
  carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));

  // Reinicia o deslocamento automático quando o cursor sai do carrossel
  carouselContainer.addEventListener('mouseleave', startAutoSlide);

  // Inicia o deslocamento automático ao carregar a página
  startAutoSlide();
});


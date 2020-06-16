(function(){
   const track = document.querySelector('.carousel_track');
   const slides = Array.from(track.children);
   const prevButton = document.querySelector('.carousel_button--left');
   const nextButton = document.querySelector('.carousel_button--right');
   const dotsNav= document.querySelector('.carousel_nav');
   const dots = Array.from(dotsNav.children);
   
   const slideWidth = slides[0].getBoundingClientRect().width;
   
   //Arrange Slide next to one another
   const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px'
   }
   slides.forEach(setSlidePosition);


   const moveToSlides = (track, currentSlide, targetSlide) => {
      track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
   }

   const updateDot = (currentDot, targetDot)=>{      
      currentDot.classList.remove('current-slide');
      targetDot.classList.add('current-slide')
   }

   //When I click left move slides on prev button
   prevButton.addEventListener('click',e => {
      const currentSlide = track.querySelector('.current-slide');
      const prevSlide = currentSlide.previousElementSibling;
      const currentDot = dotsNav.querySelector('.current-slide');
      const prevDot = currentDot.previousElementSibling;

      moveToSlides(track, currentSlide, prevSlide);
      updateDot(currentDot, prevDot);
   })


   //When I click right move slides on next button
   nextButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      const nextSlide = currentSlide.nextElementSibling;
      const currentDot = dotsNav.querySelector('.current-slide');
      const nextDot = currentDot.nextElementSibling;

      moveToSlides(track, currentSlide, nextSlide);
      updateDot(currentDot, nextDot);
   });

   //Carousel Indicator
   dotsNav.addEventListener('click',(e)=>{
      const targetDot = e.target.closest('button');
      if(!targetDot) return;
      
      const currentSlide = track.querySelector('.current-slide');
      const currentDot = dotsNav.querySelector('.current-slide');
      const targetIndex = dots.findIndex(dot => dot === targetDot);
      const targetSlide = slides[targetIndex];

      moveToSlides(track, currentSlide, targetSlide);
      updateDot(currentDot, targetDot)
   });

})()
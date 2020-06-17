//when i click on left button , move slides to left

//when clicked right move slides to right

//when clicked on dots go to that specific slide

const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");
const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);
//for each left/right click i need to move this much to left....
const slideWidth = slides[0].getBoundingClientRect().width;


//arrange slides next to one another
// slides[0].style.left=0;
// slides[1].style.left=slideWidth*1+'px';
// slides[2].style.left=slideWidth*2+'px';

//get next slide
const setNextSlide = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setNextSlide); //SET THE LEFT PROPERTY OF EACH SLIDE BY THE AMOUNT TO BE MOVED TO GET TO THERE BASED ON ITS POSITION IN THE TRACK

//enable the right button
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide"); //look only thru the track not entire dom
  const nextSlide = currentSlide.nextElementSibling;
  moveToTarget(currentSlide, nextSlide);
});

//enable the previous Button
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  moveToTarget(currentSlide, prevSlide);
});

//enable the dots nav
dotsNav.addEventListener("click", (e) => {
    const targetDot = e.target.closest("button"); //dot that was clicked on
    if (!targetDot) return;
  
    const currentDot = dotsNav.querySelector(".current-slide");
    const currentSlide = track.querySelector(".current-slide");
  
    const targetIndex = dots.findIndex((dot) => dot == targetDot);
    const targetSlide = slides[targetIndex];
  
    hideNavButton(targetIndex);
    moveToTarget(currentSlide, targetSlide);
  });
  

const moveToTarget = (currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");

  const targetIndex = slides.findIndex((slide) => slide == targetSlide);
  hideNavButton(targetIndex);
  updateDots(targetIndex);
};

const updateDots = (targetIndex) => {
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetDot = dots[targetIndex];

  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideNavButton=targetIndex=>{
    if(targetIndex===0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }else if(targetIndex===slides.length-1){
         prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
}

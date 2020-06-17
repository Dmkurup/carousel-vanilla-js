//when i click on left button , move slides to left

//when clicked right move slides to right

//when clicked on dots go to that specific slide

const track = document.querySelector(".carousel_track");
console.dir(track);

const slides = Array.from(track.children);
console.log(slides);

const nextButton = document.querySelector(".carousel_button--right");
console.dir(nextButton);

const prevButton = document.querySelector(".carousel_button--left");
console.dir(prevButton);

const dotsNav = document.querySelector(".carousel_nav");
console.dir(dotsNav);

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

const moveToTarget = (currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");

  const targetIndex = slides.findIndex((slide) => slide == targetSlide);
  updateDots(targetIndex);
};

const updateDots = (targetIndex) => {
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetDot = dots[targetIndex];

  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

//enable the dots nav

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button"); //dot that was clicked on
  if (!targetDot) return;

  const currentDot = dotsNav.querySelector(".current-slide");
  const currentSlide = track.querySelector(".current-slide");

  const targetIndex = dots.findIndex((dot) => dot == targetDot);
  const targetSlide = slides[targetIndex];

  moveToTarget(currentSlide, targetSlide);
});

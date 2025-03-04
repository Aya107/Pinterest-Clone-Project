document.addEventListener("DOMContentLoaded", () => {

    const grids = document.querySelectorAll('.grid');
    const headings = document.querySelectorAll('.offset .home_text')

    function enterScreen(index){
    const grid = grids[index]; 
    const heading = headings[index];
    const gridColumns = grid.querySelectorAll('.column');

    grid.classList.add('active');

    gridColumns.forEach( element => { element.classList.remove('animate-before', 'animate-after'); })

    heading.classList.remove('animate-before', 'animate-after');
}

function exitScreen(index, exitDelay){
    const grid = grids[index]; 
    const heading = headings[index];
    const gridColumns = grid.querySelectorAll('.column');

    
    gridColumns.forEach( element => { element.classList.add('animate-after'); })

    heading.classList.add('animate-after');
    
    setTimeout(() => { grid.classList.remove('active'); }, exitDelay)
}

function resetScreen(index) {
    const grid = grids[index]; 
    const heading = headings[index];
    const gridColumns = grid.querySelectorAll('.column');

    heading.classList.remove('animate-after');
    heading.classList.add('animate-before');

    gridColumns.forEach( element => { element.classList.remove('animate-after'); })
    gridColumns.forEach( element => { element.classList.add('animate-before'); })
}

function setupAnimationCycle({ timePerScreen, exitDelay }){
  //Delay time plus end animation time for all columns
  const cycleTime = timePerScreen + exitDelay;

  let nextIndex = 0;

  function nextCicle(){
    const currentIndex = nextIndex;

    enterScreen(currentIndex);


    setTimeout(() => {
        exitScreen(currentIndex);
        setTimeout(() => {
            resetScreen(currentIndex);
        }, exitDelay);
    }, timePerScreen);

    nextIndex = nextIndex >= headings.length - 1 ? 0 : nextIndex + 1;
  }

  nextCicle();

  setInterval(nextCicle, cycleTime);

}

setupAnimationCycle({
  timePerScreen: 2000,
  exitDelay: 200 * 7,
})

});
function disableScroll()
{
  window.addEventListener("touchmove", function(event) {
    if (!event.target.classList.contains('scrollable')) {
      // no more scrolling
      event.preventDefault();
    }
  }, false);
}


function fullscreen()
{
           var el = document.getElementById('gameCanvas');

           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }
}

function sleep(miliseconds)
{
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

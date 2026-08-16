function disableScroll()
{
  window.addEventListener("touchmove", function(event) {
    if (!event.target.classList.contains('scrollable')) {
      event.preventDefault();
    }
  }, { passive: false });
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

function isMobile()
{
  try {
    if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
      return navigator.userAgentData.mobile;
    }
  } catch (e) {}

  var ua = navigator.userAgent || '';
  var hasTouch = (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || ('ontouchstart' in window) || (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);
  var isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var isiPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isPhoneUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  return Boolean(hasTouch) && (isCoarse || isPhoneUA || isiPad);
}
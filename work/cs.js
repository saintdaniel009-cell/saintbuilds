/* Shared behaviour for /work case studies and /videos. */

/* Theme toggle: circular reveal from the button where View Transitions exist. */
(function(){
  var btn=document.getElementById('theme'),root=document.documentElement;
  if(!btn)return;
  function set(t){root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}}
  btn.addEventListener('click',function(){
    var next=root.dataset.theme==='dark'?'light':'dark';
    if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches)return set(next);
    var r=btn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,
        end=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    document.startViewTransition(function(){set(next)}).ready.then(function(){
      root.animate({clipPath:['circle(0 at '+x+'px '+y+'px)','circle('+end+'px at '+x+'px '+y+'px)']},
        {duration:550,easing:'cubic-bezier(.4,0,.2,1)',pseudoElement:'::view-transition-new(root)'});
    });
  });
})();

/* US visitors see the US number in any element with id="usPhone". */
(function(){try{var tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";
if(!/^(America\/(New_York|Detroit|Kentucky\/.+|Indiana\/.+|Chicago|Menominee|North_Dakota\/.+|Denver|Boise|Phoenix|Los_Angeles|Anchorage|Juneau|Sitka|Metlakatla|Yakutat|Nome|Adak)|Pacific\/Honolulu|US\/.+)$/.test(tz))return;
var n=["+1","678","585","6909"],a=document.getElementById("usPhone");if(!a)return;
a.href="tel:"+n.join("");a.textContent=n[0]+" ("+n[1]+") "+n[2]+"-"+n[3];a.hidden=false}catch(e){}})();

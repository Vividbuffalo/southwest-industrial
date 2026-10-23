(function(){
var m=document.querySelector('.menu'),n=document.getElementById('nav');
if(m)m.addEventListener('click',function(){var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)});
// Contact + hose forms (data-endpoint) post to the swi-contact Worker. Quote .demo-form: DEMO ONLY.
var seen=new Set();
document.querySelectorAll('.demo-form, form[data-endpoint]').forEach(function(f){
  if(seen.has(f))return;seen.add(f);
  f.addEventListener('submit',function(e){
    e.preventDefault();if(f.hasAttribute('data-off'))return;
    var bad=false;
    f.querySelectorAll('[required]').forEach(function(i){var v=i.value.trim()===''||(i.type==='email'&&i.value&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('invalid',v);if(v&&!bad){bad=true;i.focus()}});
    if(bad)return;
    var hp=f.querySelector('input[name=website]');if(hp&&hp.value)return;
    var t=f.querySelector('[name="cf-turnstile-response"]'),err=f.querySelector('.ts-err');
    if(!t||!t.value){err.hidden=false;return}err.hidden=true;
    var ok=f.nextElementSibling,ep=f.getAttribute('data-endpoint');
    var show=function(){f.hidden=true;ok.hidden=false;ok.scrollIntoView({behavior:'smooth',block:'center'})};
    if(!ep){show();return}
    var FAIL="Couldn't send right now, please call 928-522-9296 or email orders@southwest-industrial.com";
    var btn=f.querySelector('button[type=submit]'),msg=f.querySelector('.send-err');
    if(!msg){msg=document.createElement('p');msg.className='err send-err';msg.setAttribute('role','alert');btn.insertAdjacentElement('afterend',msg)}
    msg.hidden=true;btn.disabled=true;var lbl=btn.textContent;btn.textContent='Sending...';
    fetch(ep,{method:'POST',body:new FormData(f)}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){return{s:r.status,j:j}})})
    .then(function(x){if(x.j&&x.j.ok){show();return}msg.textContent=(x.s>=400&&x.s<500&&x.s!==429&&x.j&&x.j.error)?x.j.error+'. '+FAIL:FAIL;msg.hidden=false;if(window.turnstile){try{turnstile.reset(f.querySelector('.cf-turnstile'))}catch(e){}}})
    .catch(function(){msg.textContent=FAIL;msg.hidden=false})
    .then(function(){btn.disabled=false;btn.textContent=lbl});
  });
  var ok=f.nextElementSibling;ok.querySelector('.again').addEventListener('click',function(){f.reset();ok.hidden=true;f.hidden=false;if(window.turnstile){var w=f.querySelector('.cf-turnstile');try{turnstile.reset(w)}catch(x){}}});
});
})();

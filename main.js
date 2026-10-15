(function(){
var m=document.querySelector('.menu'),n=document.getElementById('nav');
if(m)m.addEventListener('click',function(){var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)});
// DEMO ONLY: forms submit nowhere. No fetch, no action. Turnstile uses Cloudflare's public TEST sitekey.
// Before going live: use a production sitekey and verify the cf-turnstile-response token server-side (siteverify).
document.querySelectorAll('.demo-form').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();var bad=false;
    f.querySelectorAll('[required]').forEach(function(i){var v=i.value.trim()===''||(i.type==='email'&&i.value&&!/^\S+@\S+\.\S+$/.test(i.value));i.classList.toggle('invalid',v);if(v&&!bad){bad=true;i.focus()}});
    if(bad)return;
    var hp=f.querySelector('input[name=website]');if(hp&&hp.value)return; // honeypot: bots fill it, silently drop
    var t=f.querySelector('[name="cf-turnstile-response"]'),err=f.querySelector('.ts-err');
    if(!t||!t.value){err.hidden=false;return}err.hidden=true;
    f.hidden=true;var ok=f.nextElementSibling;ok.hidden=false;ok.scrollIntoView({behavior:'smooth',block:'center'});
  });
  var ok=f.nextElementSibling;ok.querySelector('.again').addEventListener('click',function(){f.reset();ok.hidden=true;f.hidden=false;if(window.turnstile){var w=f.querySelector('.cf-turnstile');try{turnstile.reset(w)}catch(x){}}});
});
})();

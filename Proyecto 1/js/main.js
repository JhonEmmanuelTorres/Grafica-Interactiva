/* code deezer */

(function(d, s, id) { 
  var js, djs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; 
  js = d.createElement(s); js.id = id; 
  js.src = "http://e-cdn-files.deezer.com/js/widget/loader.js"; 
  djs.parentNode.insertBefore(js, djs);
}(document, "script", "deezer-widget-loader"));

/* end code deezer */

// two seconds carusel
$('.carousel').carousel({
  interval: 2000
});


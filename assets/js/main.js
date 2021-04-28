
//hanel scroling
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("navbarDiv").style["background-color"] = "#52c6e9d8";
  } else {
    document.getElementById("navbarDiv").style["background-color"] = "#52c6e93d";
  }
}

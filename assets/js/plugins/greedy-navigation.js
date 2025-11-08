/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

const nav = document.querySelector('#site-nav');
const btn = document.querySelector('#site-nav button');
const vlinks = document.querySelector('#site-nav .visible-links');
const hlinks = document.querySelector('#site-nav .hidden-links');

function updateNav() {

  const availableSpace = btn.classList.contains('hidden')
    ? nav.offsetWidth - 36
    : nav.offsetWidth - btn.offsetWidth - 36;

  // The visible list is overflowing the nav
  if (vlinks.offsetWidth >= availableSpace) {

    // Move item to the hidden list
    while (vlinks.offsetWidth > availableSpace) {
      last = vlinks.children[vlinks.children.length - 1];
      vlinks.removeChild(last);
      hlinks.prepend(last);
    }

    // Show the dropdown btn
    if (btn.classList.contains('hidden')) {
      btn.classList.remove('hidden');
    }

  // The visible list is not overflowing
  } else {

    // Try adding a hidden item to the visible items
    while (vlinks.offsetWidth <= availableSpace && hlinks.children.length > 0) {
      first = hlinks.children[0];
      hlinks.removeChild(first);
      vlinks.append(first);
    }

    // Woops, too big, hide it again
    if (vlinks.offsetWidth >= availableSpace) {
      // Move item to the hidden list
      last = vlinks.children[vlinks.children.length - 1];
      vlinks.removeChild(last);
      hlinks.prepend(last);
    }

    // Hide the dropdown btn if hidden list is empty
    if (hlinks.children.length == 0) {
      btn.classList.add('hidden');
    }
  }
}

btn.addEventListener('click', function() {
  if (hlinks.classList.contains('hidden')) {
    hlinks.classList.remove('hidden');
  }
  else {
    hlinks.classList.add('hidden');
  }

  if (btn.classList.contains('close')) {
    btn.classList.remove('close');
  }
  else {
    btn.classList.add('close');
  }
});

// Window listeners
window.addEventListener('resize', updateNav);
window.addEventListener('load', updateNav);
window.addEventListener('deviceorientation', function(event) {
  updateNav();
});

// See: https://stackoverflow.com/questions/11936816/execute-function-after-complete-page-load
document.addEventListener('DOMContentLoaded', updateNav);

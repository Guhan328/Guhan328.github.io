/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

(function() {
  // Follow menu drop down
  const follow_button = document.querySelector(".author__urls-wrapper button");
  const follow_list = document.querySelector(".author__urls-wrapper ul");
  follow_button.addEventListener("click", function() {
    if (follow_button.classList.contains('open')) {
      follow_button.classList.remove('open');
    }
    else {
      follow_button.classList.add('open');
    }

    if (follow_list.classList.contains('is--visible')) {
      follow_list.classList.remove('is--visible');
    }
    else {
      follow_list.classList.add('is--visible');
    }
  });

  // Add anchors for headings
  const page_content = document.querySelector(".page__content");
  if (page_content != null) {
    const page_content_headings = page_content.querySelectorAll("h1, h2, h3, h4, h5, h6, span");
    for (var i = 0; i != page_content_headings.length; i++) {
      const page_content_heading = page_content_headings[i];
      const page_content_heading_id = page_content_heading.getAttribute("id");
      if (page_content_heading_id) {
        const anchor = document.createElement("a");
        anchor.className = 'header-link';
        anchor.href = '#' + page_content_heading_id;
        anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fas si-link\"></i>';
        anchor.title = "Permalink";
        page_content_heading.append(anchor);
      }
    }
  }

})();

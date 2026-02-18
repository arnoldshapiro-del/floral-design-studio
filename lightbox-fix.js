/**
 * LIGHTBOX BUG FIX
 * 
 * Root cause: Every <img> inside a .photo-card had its own
 * onclick="event.stopPropagation(); openLightbox('HARDCODED_URL')"
 * which stopped the click from reaching the parent card's openModal() call,
 * and because the URL was hardcoded per img tag, some opened wrong images.
 *
 * Fix: Remove onclick from all photo-card <img> elements so clicks bubble up
 * to the parent .photo-card which correctly calls openModal() with the right data.
 * Also handles dynamically-generated cards via MutationObserver.
 */
(function() {
  function fixPhotoCardImages() {
    document.querySelectorAll('.photo-card img').forEach(function(img) {
      // Remove the broken onclick that stops propagation
      img.removeAttribute('onclick');
      img.onclick = null;
      // Keep pointer cursor so it still looks clickable
      img.style.cursor = 'pointer';
      img.style.pointerEvents = 'none'; // Let clicks pass through to parent card
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixPhotoCardImages);
  } else {
    fixPhotoCardImages();
  }

  // Also watch for dynamically added cards (pairing engine, bouquet builder, etc.)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          if (node.classList && node.classList.contains('photo-card')) {
            var imgs = node.querySelectorAll('img');
            imgs.forEach(function(img) {
              img.removeAttribute('onclick');
              img.onclick = null;
              img.style.pointerEvents = 'none';
            });
          } else if (node.querySelectorAll) {
            node.querySelectorAll('.photo-card img').forEach(function(img) {
              img.removeAttribute('onclick');
              img.onclick = null;
              img.style.pointerEvents = 'none';
            });
          }
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    fixPhotoCardImages();
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();

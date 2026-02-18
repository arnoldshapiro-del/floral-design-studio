// Lightbox bug fix — applied via DOM patch on DOMContentLoaded
// Removes the broken inline onclick from photo-card images
// so clicking any image correctly triggers the parent card's openModal()
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.photo-card img').forEach(function(img) {
    img.onclick = null;
    img.style.cursor = 'pointer';
    img.removeAttribute('onclick');
  });
});

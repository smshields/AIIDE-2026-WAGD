document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link-text');
  const pages = document.querySelectorAll('.page');
  const headerImages = [
    'angelina.jpg',
    'brawlerAGD_teaser.png',
    'era.jpg',
    'galacticarmsrace.png',
    'gameboy.png',
    'vgdl.jpg',
    'wfc.png',
    'yavalath.jpg'
  ];

  const imageCaptions = {
    'angelina.jpg': 'ANGELINA',
    'brawlerAGD_teaser.png': 'BrawlerAGD',
    'era.jpg': 'Expressive Range Analysis',
    'galacticarmsrace.png': 'Galactic Arms Race',
    'gameboy.png': 'Game Boy ROM Generator',
    'vgdl.jpg': 'Video Game Description Language',
    'wfc.png': 'WaveFunctionCollapse',
    'yavalath.jpg': 'Yavalath, by Ludi'
  };

  let currentImageIndex = Math.floor(Math.random() * headerImages.length);

  function updateHeaderImage(imgDiv, index) {
    if (!imgDiv) return;
    const randomY = Math.floor(Math.random() * 101);
    const imageName = headerImages[index];
    imgDiv.style.backgroundImage = `url('images/page_headers/${imageName}')`;
    imgDiv.style.backgroundPosition = `center ${randomY}%`;
    
    const captionText = imageCaptions[imageName];
    if (captionText) {
      imgDiv.innerHTML = `<div class="image-caption">${captionText}</div>`;
    } else {
      imgDiv.innerHTML = '';
    }
  }

  function setRandomHeaderImage(pageElement) {
    const imgDiv = pageElement.querySelector('.page-header-image');
    if (imgDiv) {
      currentImageIndex = Math.floor(Math.random() * headerImages.length);
      updateHeaderImage(imgDiv, currentImageIndex);
      
      // Add click listener if not already added
      if (!imgDiv.dataset.listenerAdded) {
        imgDiv.addEventListener('click', () => {
          currentImageIndex = (currentImageIndex + 1) % headerImages.length;
          updateHeaderImage(imgDiv, currentImageIndex);
        });
        imgDiv.dataset.listenerAdded = 'true';
        imgDiv.style.cursor = 'pointer';
      }
    }
  }

  function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
      page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      setRandomHeaderImage(targetPage);
    }

    // Update sidebar links
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === pageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update URL hash without jumping
    history.pushState(null, null, `#${pageId}`);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      if (pageId) {
        showPage(pageId);
      }
    });
  });

  // Handle initial load with hash
  const initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    showPage(initialHash);
  } else {
    // Default to first page
    const firstPageId = pages[0]?.id;
    if (firstPageId) showPage(firstPageId);
  }

  // Handle back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      showPage(hash);
    }
  });
});

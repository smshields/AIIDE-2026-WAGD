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

  function setRandomHeaderImage(pageElement) {
    const imgDiv = pageElement.querySelector('.page-header-image');
    if (imgDiv) {
      const randomImg = headerImages[Math.floor(Math.random() * headerImages.length)];
      imgDiv.style.backgroundImage = `url('images/page_headers/${randomImg}')`;
      imgDiv.textContent = ''; // Remove placeholder text
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

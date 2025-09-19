// ===== Student Game Hub Script =====
// This script handles the game submission form,
// displays games on the page, and auto-converts
// Scratch project links to proper embed URLs.

const form = document.getElementById('game-form');
const container = document.getElementById('games-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // === OLD CODE: get input values ===
  const title = document.getElementById('game-title').value.trim();
  let link  = document.getElementById('game-link').value.trim();
  const desc  = document.getElementById('game-desc').value.trim();

  // === NEW FEATURE: Auto-convert Scratch links ===
  // Detect a normal Scratch project link and turn it into an embed link.
  // Example:
  // From: https://scratch.mit.edu/projects/123456/
  // To:   https://scratch.mit.edu/projects/embed/123456/?autostart=false
  const scratchMatch = link.match(/scratch\.mit\.edu\/projects\/(\d+)/);
  if (scratchMatch) {
    const projectID = scratchMatch[1];
    link = `https://scratch.mit.edu/projects/embed/${projectID}/?autostart=false`;
  }

  // === OLD CODE: Create the game card ===
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${desc}</p>
    <iframe 
      src="${link}" 
      allowfullscreen 
      allowtransparency="true" 
      width="485" 
      height="402" 
      frameborder="0">
    </iframe>
  `;

  // === OLD CODE: Add it to the top of the container ===
  container.prepend(card);

  // === OLD CODE: Reset the form ===
  form.reset();
});

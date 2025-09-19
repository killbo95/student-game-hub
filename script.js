const form = document.getElementById('game-form');
const container = document.getElementById('games-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('game-title').value;
  const link  = document.getElementById('game-link').value;
  const desc  = document.getElementById('game-desc').value;

  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${desc}</p>
    <iframe src="${link}" allowfullscreen></iframe>
  `;

  container.prepend(card);

  form.reset();
});

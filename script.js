const form = document.getElementById('game-form');
const container = document.getElementById('games-container');
const gamesCollection = firebase.firestore().collection('games');

// Add a new game to Firestore
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('game-title').value.trim();
  const link  = document.getElementById('game-link').value.trim();
  const desc  = document.getElementById('game-desc').value.trim();

  if (!title || !link) return;

  await gamesCollection.add({
    title,
    link,
    desc,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  form.reset();
});

// Listen for real-time updates
gamesCollection.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
  container.innerHTML = ''; // clear and rebuild
  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.desc || ''}</p>
      <iframe src="${data.link}" allowfullscreen></iframe>
    `;
    container.appendChild(card);
  });
});

// Reference to the "games" collection in Firestore
const gamesRef = db.collection("games");

// Load existing games on page load
gamesRef.orderBy("createdAt", "desc").onSnapshot(snapshot => {
  container.innerHTML = ""; // clear first
  snapshot.forEach(doc => addGameCard(doc.data()));
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById('game-title').value.trim();
  let link = document.getElementById('game-link').value.trim();
  const desc = document.getElementById('game-desc').value.trim();

  // Convert Scratch URL to embed
  const scratchMatch = link.match(/scratch\.mit\.edu\/projects\/(\d+)/);
  if (scratchMatch) {
    link = `https://scratch.mit.edu/projects/embed/${scratchMatch[1]}/?autostart=false`;
  }

  await gamesRef.add({
    title,
    link,
    desc,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  form.reset();
});

function addGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <h3>${game.title}</h3>
    <p>${game.desc}</p>
    <iframe src="${game.link}" allowtransparency="true"
            width="485" height="402" frameborder="0" allowfullscreen></iframe>
  `;
  container.appendChild(card);
}

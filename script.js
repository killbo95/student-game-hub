const form = document.getElementById("gameForm");
const gamesDiv = document.getElementById("games");

// Show games from Firestore in real time
db.collection("games").orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
    gamesDiv.innerHTML = "";
    snapshot.forEach(doc => {
      const g = doc.data();
      gamesDiv.innerHTML += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px 0">
          <h3>${g.title}</h3>
          <p>${g.desc}</p>
          <iframe src="${g.link}" width="485" height="402"
                  frameborder="0" allowfullscreen></iframe>
        </div>`;
    });
  });

// Add a new game
form.addEventListener("submit", async e => {
  e.preventDefault();
  const title = document.getElementById("gameTitle").value.trim();
  const desc  = document.getElementById("gameDesc").value.trim();
  let link    = document.getElementById("gameLink").value.trim();

  // Auto-convert Scratch project URL to embed URL if needed
  const match = link.match(/scratch\.mit\.edu\/projects\/(\d+)/);
  if (match) {
    link = `https://scratch.mit.edu/projects/embed/${match[1]}/?autostart=false`;
  }

  await db.collection("games").add({
    title, desc, link,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  form.reset();
});

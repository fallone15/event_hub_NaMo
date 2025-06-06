const API_URL = 'http://localhost:5000';

async function checkSession() {
  try {
    const response = await fetch(`${API_URL}/api/auth/status`, {
      credentials: 'include'
    });
    const data = await response.json();
    return data.loggedIn ? data.user.user_id : null; // ✅ correction ici
  } catch (error) {
    console.error("Erreur lors de la vérification de la session :", error);
    return null;
  }
}

async function isUserRegistered(eventId, userId) {
  try {
    const response = await fetch(`${API_URL}/api/events/${eventId}/registration-status/${userId}`, {
      credentials: 'include'
    });
    const data = await response.json();
    return data.registered;
  } catch (error) {
    console.error("Erreur inscription :", error);
    return false;
  }
}

async function loadEvents() {
  try {
    const response = await fetch(`${API_URL}/api/events`, {
      credentials: 'include'
    });
    const events = await response.json();
    await displayEvents(events);
  } catch (error) {
    console.error("Erreur chargement événements :", error);
    document.getElementById('events-container').innerHTML = '<p>Impossible de charger les événements.</p>';
  }
}

async function displayEvents(events) {
  const container = document.getElementById('events-container');
  container.innerHTML = '';

  if (!events.length) {
    container.innerHTML = '<p>Aucun événement disponible.</p>';
    return;
  }

  const userId = await checkSession();

  for (const event of events) {
    const card = document.createElement('div');
    card.className = 'event-card';

    card.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date_time).toLocaleString('fr-FR')}</p>
      <p><strong>Lieu:</strong> ${event.location}</p>
      <p>${event.description}</p>
    `;

    if (userId) {
      const btn = document.createElement('button');
      btn.textContent = 'Chargement...';
      btn.disabled = true;
      card.appendChild(btn);

      const registered = await isUserRegistered(event.event_id, userId);
      if (registered) {
        btn.textContent = "Déjà inscrit(e)";
        btn.disabled = true;
      } else {
        btn.textContent = "S'inscrire";
        btn.disabled = false;
        btn.onclick = async () => {
  try {
    const rsvp = await fetch(`${API_URL}/api/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        user_id: userId,
        event_id: event.event_id,
        rsvp_status: 'INTERESTED'
      })
    });

    if (rsvp.ok) {
      alert(`Tu t'es inscrit(e) à l'événement: ${event.title}`);
      btn.textContent = "Déjà inscrit(e)";
      btn.disabled = true;
    } else {
      const errorData = await rsvp.json();
      alert("Erreur lors de l'inscription : " + errorData.message);
    }
  } catch (err) {
    console.error("Erreur inscription :", err);
    alert("Une erreur réseau est survenue.");
  }
};

      }
    } else {
      const loginMsg = document.createElement('p');
      loginMsg.textContent = "Connectez-vous pour voir plus et vous inscrire.";
      card.appendChild(loginMsg);

      const loginBtn = document.createElement('button');
      loginBtn.textContent = "Se connecter";
      loginBtn.onclick = () => window.location.href = 'login.html';
      card.appendChild(loginBtn);
    }

    container.appendChild(card);
  }
}

document.addEventListener('DOMContentLoaded', loadEvents);

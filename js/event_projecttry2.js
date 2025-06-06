const API_URL = 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();

    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', loadEvents);
    }
});

async function loadEvents() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const dateFilter = document.getElementById('date-filter');

    let url = `${API_URL}/api/events?`;

    if (searchInput && searchInput.value) {
        url += `search=${encodeURIComponent(searchInput.value)}&`;
    }

    if (categoryFilter && categoryFilter.value) {
        url += `category=${encodeURIComponent(categoryFilter.value)}&`;
    }

    if (dateFilter && dateFilter.value) {
        url += `date=${encodeURIComponent(dateFilter.value)}&`;
    }

    try {
        const response = await fetch(url, {
            credentials: 'include',
        });

        if (response.ok) {
            const events = await response.json();
            displayEvents(events);
        } else {
            console.error('Erreur lors du chargement des événements:', response.statusText);
            displayEvents([]); 
        }
    } catch (error) {
        console.error('Erreur fetch événements:', error);
        displayEvents([]); 
    }
}

function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = '';

    if (!events || events.length === 0) {
        eventsContainer.innerHTML = '<p>Aucun événement trouvé. Essayez d’ajuster vos filtres.</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';

        // Ici on utilise date_time qui contient date et heure
        const dateTime = new Date(event.date_time);
        const formattedDate = dateTime.toLocaleDateString('fr-FR', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        const formattedTime = dateTime.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p class="date">${formattedDate} à ${formattedTime}</p>
            <p class="location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${event.location}
            </p>
            <p>${event.description.substring(0, 100)}...</p>
            <div class="event-actions">
                <a href="../html/events.html?id=${event.event_id}" class="btn">Voir détails</a>
            </div>
        `;

        eventsContainer.appendChild(eventCard);
    });
}

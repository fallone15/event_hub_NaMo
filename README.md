# Campus Events Hub - Frontend

Ce dépôt contient la partie frontend de l'application **Campus Events Hub**, développée en HTML, CSS et JavaScript vanilla. L'interface permet aux utilisateurs de visualiser, filtrer et s'inscrire à des événements organisés sur le campus.

---

## 🧩 Fonctionnalités principales

- Affichage dynamique des événements depuis un backend Node.js.
- Filtres de recherche : par titre, date et catégorie.
- Connexion utilisateur avec détection de session.
- Inscription aux événements avec suivi de participation.
- Vue détaillée d’un événement via `events.html?id=...`.

---

## 🗂️ Structure des fichiers

/front_end
│
├── css/
│   ├── projettry2.css         → Feuille de style principale
│   ├── register.css           → Style pour la page d’inscription
│   └── login.css              → Style pour la page de connexion
│
├── js/
│   ├── event_projecttry2.js   → Script pour la page browse-events
│   └── events.js              → Script pour affichage + inscriptions
│
├── home.html                  → Page d’accueil
├── login.html                 → Page de connexion
├── register.html              → Page d’inscription
├── events.html                → Liste et détails des événements
└── LICENSE                    → Fichier de licence (inclus dans les entêtes)

## ⚙️ Configuration requise

- Backend Node.js (Express) écoutant sur `http://localhost:5000`
- API REST exposée par le backend (`/api/events`, `/api/attendance`, etc.)
- Session utilisateur gérée via sessions

---

## 🚀 Lancer le frontend

Le frontend est un projet statique. Vous pouvez :
- Ouvrir les fichiers HTML directement dans votre navigateur
- Ou utiliser une extension comme **Live Server** dans VS Code

http://localhost:5000/events.html

## 📝 License
Ce projet est distribué sous les termes de la MIT License. La licence est incluse en haut de chaque fichier source et dans le fichier LICENSE.

✍️ Auteures
👤 Nacoulma B. Doris Fallone et Mossamih Khadidja
Site : Campus_event_hub (non spécifié)
Github: [@fallone15](https://github.com/fallone15)

## Show your support

Laisse nous une  ⭐️ si ce projet t'a été utile

Copyright © 2025 [Nacoulma Mossamih](https://github.com/fallone15).
This project is [LICENSE](C:\event_hub\front_end\LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
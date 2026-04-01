# Smart Santé 2035

Système intelligent de triage et d'orientation hospitalière pour Madagascar.
Projet académique - Licence 2 Informatique.

## Architecture

```
smart-sante-2035/
├── backend/         Node.js + Express + MySQL2 + JWT + Socket.io
├── frontend-web/    React + Vite + Tailwind CSS
├── mobile-app/      React Native Expo (Android, offline-first)
├── database/        schema.sql, seed.sql, diagram.md
└── docs/            API.md, ARCHITECTURE.md, TRIAGE.md, SOUTENANCE.md
```

## Prérequis

- Node.js 18+
- MySQL 8+
- Expo CLI (`npm install -g expo-cli`) pour le mobile
- Un émulateur Android ou l'application Expo Go

## Installation pas-à-pas

### 1. Base de données

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env       # Adapter DB_USER / DB_PASSWORD
npm install
npm run seed:passwords     # Re-hash les mots de passe de démo
npm run dev                # Démarre sur http://localhost:4000
```

### 3. Frontend web

```bash
cd frontend-web
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

### 4. Application mobile

```bash
cd mobile-app
npm install
npm start                  # puis 'a' pour Android
```

> Sur émulateur Android, l'API est accessible via `10.0.2.2:4000` (déjà configuré dans `app.json`).
> Sur appareil physique, remplacer par l'IP locale du PC.

## Comptes de démonstration

Mot de passe pour tous les comptes : **`Demo1234!`**

| Email                       | Rôle              |
|-----------------------------|-------------------|
| admin@smartsante.mg         | SYSTEM_ADMIN      |
| doctor@smartsante.mg        | DOCTOR            |
| staff@smartsante.mg         | MEDICAL_STAFF     |
| agent@smartsante.mg         | COMMUNITY_AGENT   |
| hospital@smartsante.mg      | HOSPITAL_ADMIN    |
| region@smartsante.mg        | REGIONAL_MANAGER  |

## Fonctionnalités principales

- ✅ Authentification JWT (access + refresh token)
- ✅ 6 rôles avec permissions différenciées
- ✅ CRUD patients (UUID, historique, recherche, pagination)
- ✅ Triage médical avec formule pondérée
- ✅ File de priorité (Binary Heap)
- ✅ Orientation hospitalière (Dijkstra)
- ✅ Dashboard temps réel (Socket.io)
- ✅ Statistiques & graphiques
- ✅ Exports PDF / CSV
- ✅ Mobile offline-first (SQLite) + synchronisation

## Documentation

- [docs/API.md](docs/API.md) — endpoints REST + exemples
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — schéma d'architecture
- [docs/TRIAGE.md](docs/TRIAGE.md) — formule et niveaux détaillés
- [docs/SOUTENANCE.md](docs/SOUTENANCE.md) — points clés pour la soutenance
- [database/diagram.md](database/diagram.md) — diagramme relationnel

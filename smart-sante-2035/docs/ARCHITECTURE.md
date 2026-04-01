# Architecture Smart Santé 2035

```
                      ┌─────────────────────────┐
                      │   Frontend Web (React)  │
                      │  Vite + Tailwind + JWT  │
                      └────────────┬────────────┘
                                   │  REST + Socket.io
                                   │
   ┌───────────────────┐   ┌───────▼────────┐    ┌──────────────────┐
   │  Mobile (Expo)    │──▶│   Backend API  │◀───│  Socket.io       │
   │  SQLite offline   │   │   Express MVC  │    │  Notifications   │
   │  Sync auto        │   └───────┬────────┘    └──────────────────┘
   └───────────────────┘           │
                                   │ mysql2
                                   ▼
                          ┌────────────────┐
                          │     MySQL      │
                          │  9 tables + FK │
                          └────────────────┘
```

## Backend MVC

```
controllers/  → reçoit la requête, applique la logique
   ↓
services/     → algorithmes (triage, heap, Dijkstra)
   ↓
models/       → requêtes SQL pures (mysql2)
   ↓
config/db.js  → pool de connexions
```

## Sécurité

- Mots de passe hashés avec bcrypt (cost 10)
- JWT signés (access 2h, refresh 7d)
- Middleware `auth` puis `requireRole([...])` sur chaque route sensible
- Validation des entrées (`middlewares/validate.js`)
- Gestion centralisée des erreurs (`middlewares/errorHandler.js`)

## Permissions par rôle (frontend)

Voir `frontend-web/src/hooks/usePermissions.js` — une même page peut être partagée par plusieurs rôles, mais les actions (boutons, validations) s'affichent dynamiquement via `can('action.name')`.

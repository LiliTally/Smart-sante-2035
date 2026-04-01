# Guide soutenance

## Plan de démo (8 min)

1. **Connexion** (Login) — montrer JWT, rôles différents
2. **Dashboard** — KPIs temps réel, graphiques (Recharts)
3. **Patients** — créer un patient (validation, UUID)
4. **Triage** — calculer un score, visualiser le niveau live
5. **File prioritaire** — montrer l'ordre = Binary Heap côté backend
6. **Orientation** — cliquer "Orienter" → Dijkstra renvoie top 5 hôpitaux
7. **Notification temps réel** — créer un cas CRITIQUE → toast Socket.io
8. **Mobile Expo** — créer un patient hors ligne, puis synchroniser
9. **Exports** — télécharger CSV/PDF

## Points techniques à expliquer

- **MVC** : controllers → services → models → MySQL
- **Sécurité** : bcrypt + JWT + middlewares `auth` + `requireRole`
- **Structures de données** : Binary Heap (file), Dijkstra (graphe d'hôpitaux)
- **Permissions dynamiques** : `usePermissions().can('action')` — même page, actions différentes
- **Offline-first mobile** : SQLite local + table `synced` + service de sync

## Questions probables

- *Pourquoi MySQL et pas Mongo ?* → données relationnelles fortes (hôpitaux ↔ lits ↔ patients ↔ triages).
- *Pourquoi un heap au lieu d'un `ORDER BY` ?* → démontrer la structure de données vue en cours d'algo.
- *Comment scaler ?* → cache Redis pour la file, sharding par région, indexer `triages.level/status`.

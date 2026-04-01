# API REST - Smart Santé 2035

Base URL : `http://localhost:4000/api`
Toutes les routes (sauf `/auth/login`, `/auth/register`, `/triage/levels`) nécessitent un header `Authorization: Bearer <token>`.

## Authentification

### POST /auth/register
```json
{ "full_name":"Jean Test", "email":"j@t.mg", "password":"Demo1234!", "role_code":"COMMUNITY_AGENT" }
```

### POST /auth/login
```json
{ "email":"admin@smartsante.mg", "password":"Demo1234!" }
```
Réponse :
```json
{ "accessToken":"...", "refreshToken":"...", "user":{ ... } }
```

### POST /auth/refresh
```json
{ "refreshToken":"..." }
```

### GET /auth/me
Renvoie l'utilisateur authentifié.

## Patients

| Méthode | Route                | Description                          | Rôles |
|---------|----------------------|--------------------------------------|-------|
| GET     | /patients?search=&page=&limit= | Liste paginée + recherche  | tous |
| GET     | /patients/:id        | Détail + historique triages          | tous |
| POST    | /patients            | Création                             | agent, staff, doctor, hospital, admin |
| PUT     | /patients/:id        | Mise à jour                          | staff, doctor, hospital, admin |
| DELETE  | /patients/:id        | Suppression                          | doctor, hospital, admin |

## Triage

| Méthode | Route                  | Description                       |
|---------|------------------------|-----------------------------------|
| GET     | /triage/levels         | Liste des 5 niveaux + couleurs    |
| GET     | /triage                | Tous les triages                  |
| GET     | /triage/queue          | File prioritaire (Binary Heap)    |
| POST    | /triage                | Créer un triage                   |
| PUT     | /triage/:id/status     | Mettre à jour le statut           |
| GET     | /triage/:id/recommend  | Recommandation d'hôpital (Dijkstra) |

Exemple POST /triage :
```json
{
  "patient_id": 1,
  "score_vital": 80,
  "score_symptomes": 75,
  "score_antecedents": 60,
  "score_age": 50,
  "symptoms": "Douleur thoracique",
  "hospital_id": 1
}
```

## Hôpitaux

`GET /hospitals`, `GET /hospitals/:id`, `POST /hospitals`, `PUT /hospitals/:id`, `DELETE /hospitals/:id`

## Statistiques / Exports

- `GET /stats/dashboard` — KPIs + graphiques
- `GET /stats/export/csv` — CSV des triages
- `GET /stats/export/pdf` — Rapport PDF

## Socket.io

Événements émis :
- `triage:urgent` — nouveau cas critique / très urgent
- `triage:updated` — changement de statut

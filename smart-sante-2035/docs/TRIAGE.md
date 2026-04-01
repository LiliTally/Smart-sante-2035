# Système de triage

## Formule

```
S = 0.45 × ScoreVital
  + 0.30 × ScoreSymptomes
  + 0.15 × ScoreAntecedents
  + 0.10 × ScoreAge
```

Chaque sous-score est compris entre **0 et 100**.

## Niveaux

| Code         | Nom         | Score ≥ | Couleur     | Description                                       | Action recommandée                     |
|--------------|-------------|---------|-------------|---------------------------------------------------|----------------------------------------|
| CRITIQUE     | Critique    | 80      | #FCA5A5 (rouge clair)   | Patient en danger immédiat              | Réanimation immédiate                  |
| TRES_URGENT  | Très urgent | 65      | #FDBA74 (orange clair)  | Patient grave - traitement rapide       | Consultation < 15 min                  |
| URGENT       | Urgent      | 45      | #FDE68A (jaune clair)   | État préoccupant - prise en charge < 1h | Consultation prioritaire               |
| STABLE       | Stable      | 25      | #86EFAC (vert clair)    | État stable - peut attendre             | Consultation standard                  |
| LEGER        | Cas léger   | 0       | #BFDBFE (bleu clair)    | Cas bénin - soins ambulatoires          | Médecine générale                      |

## File de priorité — Binary Heap

`backend/src/services/binaryHeap.js`
Max-heap où la racine est toujours le patient avec le score le plus élevé.
- `insert(item)` — O(log n)
- `extractMax()` — O(log n)

## Orientation — Dijkstra

`backend/src/services/dijkstra.js`
Graphe d'hôpitaux pondéré par `distance_km × pénalité_route` (BONNE=1.0, MOYENNE=1.4, MAUVAISE=2.0).
Score de recommandation final :
```
finalScore = 1000/(distance+1) + min(lits,50) + (spécialité correspondante ? 30 : 0)
```

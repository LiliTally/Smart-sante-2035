// =====================================================
// Algorithme de Dijkstra (chemin le plus court)
// Utilise pour trouver le meilleur hopital cible depuis
// la position d'un patient ou d'un autre hopital.
//
// Le "cout" entre deux hopitaux combine :
//   - distance en km
//   - qualite de la route (penalite)
// Le score final d'un hopital cible combine :
//   - cout du trajet
//   - lits disponibles (bonus)
//   - specialites correspondantes (bonus)
// =====================================================

const ROAD_PENALTY = { BONNE: 1.0, MOYENNE: 1.4, MAUVAISE: 2.0 };

/**
 * @param {Array} hospitals - liste { id, available_beds, specialties, status }
 * @param {Array} routes    - liste { from_hospital_id, to_hospital_id, distance_km, road_quality }
 * @param {number} sourceId
 * @returns Map<hospitalId, { distance, path }>
 */
function dijkstra(hospitals, routes, sourceId) {
  // Construction du graphe (liste d'adjacence)
  const graph = new Map();
  hospitals.forEach(h => graph.set(h.id, []));
  routes.forEach(r => {
    const penalty = ROAD_PENALTY[r.road_quality] || 1.5;
    const weight = Number(r.distance_km) * penalty;
    if (graph.has(r.from_hospital_id)) {
      graph.get(r.from_hospital_id).push({ to: r.to_hospital_id, weight });
    }
  });

  // Distances initiales = Infini, sauf source
  const dist = new Map();
  const prev = new Map();
  hospitals.forEach(h => dist.set(h.id, Infinity));
  dist.set(sourceId, 0);

  // File simple (pour version L2 - pas de tas binaire ici, lisibilite)
  const visited = new Set();
  const queue = new Set(hospitals.map(h => h.id));

  while (queue.size > 0) {
    // Selection du noeud avec la plus petite distance
    let u = null;
    let min = Infinity;
    for (const id of queue) {
      if (dist.get(id) < min) {
        min = dist.get(id);
        u = id;
      }
    }
    if (u === null) break;
    queue.delete(u);
    visited.add(u);

    const neighbors = graph.get(u) || [];
    for (const { to, weight } of neighbors) {
      if (visited.has(to)) continue;
      const alt = dist.get(u) + weight;
      if (alt < dist.get(to)) {
        dist.set(to, alt);
        prev.set(to, u);
      }
    }
  }

  // Reconstruction des chemins
  const result = new Map();
  for (const h of hospitals) {
    const path = [];
    let cur = h.id;
    while (cur !== undefined) {
      path.unshift(cur);
      if (cur === sourceId) break;
      cur = prev.get(cur);
    }
    result.set(h.id, { distance: dist.get(h.id), path });
  }
  return result;
}

/**
 * Recommandation : trie les hopitaux par "meilleur choix"
 * en combinant distance, lits et specialites requises.
 */
function recommendHospital(hospitals, routes, sourceId, requiredSpecialty) {
  const distances = dijkstra(hospitals, routes, sourceId);
  const ranked = hospitals
    .filter(h => h.status === 'OPERATIONAL' && h.id !== sourceId)
    .map(h => {
      const d = distances.get(h.id);
      const dist = d ? d.distance : Infinity;
      const bedsScore = Math.min(h.available_beds, 50);
      const specMatch = requiredSpecialty &&
        (h.specialties || '').toLowerCase().includes(requiredSpecialty.toLowerCase())
        ? 30 : 0;
      // Score global : on cherche a MAXIMISER
      const finalScore = (1000 / (dist + 1)) + bedsScore + specMatch;
      return { ...h, distance: dist, recommendationScore: Math.round(finalScore * 100) / 100 };
    })
    .filter(h => isFinite(h.distance))
    .sort((a, b) => b.recommendationScore - a.recommendationScore);
  return ranked.slice(0, 5);
}

module.exports = { dijkstra, recommendHospital };

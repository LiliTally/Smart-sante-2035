// =====================================================
// Service : Calcul du score de triage
// Formule officielle :
//   S = 0.45 * Vital + 0.30 * Symptomes + 0.15 * Antecedents + 0.10 * Age
// Chaque sous-score est entre 0 et 100.
// Le score global determine le niveau d'urgence.
// =====================================================

// Definition des 5 niveaux de triage
const LEVELS = [
  {
    code: 'CRITIQUE',
    name: 'Critique',
    minScore: 80,
    description: 'Patient en danger immediat - prise en charge urgente',
    action: 'Reanimation immediate / salle de choc',
    color: '#FCA5A5' // rouge clair
  },
  {
    code: 'TRES_URGENT',
    name: 'Tres urgent',
    minScore: 65,
    description: 'Patient grave - traitement rapide necessaire',
    action: 'Consultation medicale dans les 15 minutes',
    color: '#FDBA74' // orange clair
  },
  {
    code: 'URGENT',
    name: 'Urgent',
    minScore: 45,
    description: 'Etat preoccupant - prise en charge sous 1h',
    action: 'Consultation prioritaire',
    color: '#FDE68A' // jaune clair
  },
  {
    code: 'STABLE',
    name: 'Stable',
    minScore: 25,
    description: 'Etat stable - peut attendre',
    action: 'Consultation standard',
    color: '#86EFAC' // vert clair
  },
  {
    code: 'LEGER',
    name: 'Cas leger',
    minScore: 0,
    description: 'Cas benin - soins ambulatoires',
    action: 'Orientation medecine generale',
    color: '#BFDBFE' // bleu clair
  }
];

/**
 * Calcule le score global pondere.
 * @param {object} scores { vital, symptomes, antecedents, age }
 * @returns {number} score arrondi a 2 decimales
 */
function computeScore({ vital, symptomes, antecedents, age }) {
  const v = Number(vital) || 0;
  const s = Number(symptomes) || 0;
  const a = Number(antecedents) || 0;
  const ag = Number(age) || 0;
  const total = 0.45 * v + 0.30 * s + 0.15 * a + 0.10 * ag;
  return Math.round(total * 100) / 100;
}

/**
 * Determine le niveau (objet complet) a partir d'un score.
 */
function getLevel(score) {
  for (const lvl of LEVELS) {
    if (score >= lvl.minScore) return lvl;
  }
  return LEVELS[LEVELS.length - 1];
}

/**
 * Calcule score + niveau d'un coup.
 */
function evaluate(scores) {
  const score = computeScore(scores);
  const level = getLevel(score);
  return { score, level };
}

module.exports = { computeScore, getLevel, evaluate, LEVELS };

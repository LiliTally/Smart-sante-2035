// Constantes UI des niveaux de triage (synchronise avec backend)
export const TRIAGE_LEVELS = {
  CRITIQUE:    { name:'Critique',    color:'#FCA5A5', bg:'bg-red-100',    text:'text-red-700',    description:'Patient en danger immédiat - prise en charge urgente', action:'Réanimation immédiate' },
  TRES_URGENT: { name:'Très urgent', color:'#FDBA74', bg:'bg-orange-100', text:'text-orange-700', description:'Patient grave - traitement rapide nécessaire',          action:'Consultation médicale < 15 min' },
  URGENT:      { name:'Urgent',      color:'#FDE68A', bg:'bg-yellow-100', text:'text-yellow-700', description:'État préoccupant - prise en charge sous 1h',             action:'Consultation prioritaire' },
  STABLE:      { name:'Stable',      color:'#86EFAC', bg:'bg-green-100',  text:'text-green-700',  description:'État stable - peut attendre',                            action:'Consultation standard' },
  LEGER:       { name:'Cas léger',   color:'#BFDBFE', bg:'bg-blue-100',   text:'text-blue-700',   description:'Cas bénin - soins ambulatoires',                         action:'Médecine générale' }
};

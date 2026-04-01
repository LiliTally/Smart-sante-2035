// Hook : permissions selon le role
// Permet d'afficher dynamiquement les actions dans une page partagee.
import { useAuth } from '../context/AuthContext';

// Matrice : role -> actions autorisees
const MATRIX = {
  COMMUNITY_AGENT:  ['patient.create','triage.create'],
  MEDICAL_STAFF:    ['patient.create','patient.update','triage.create','triage.update'],
  DOCTOR:           ['patient.create','patient.update','patient.delete','triage.create','triage.update','triage.validate'],
  HOSPITAL_ADMIN:   ['patient.create','patient.update','patient.delete','triage.create','triage.update','hospital.update'],
  REGIONAL_MANAGER: ['stats.view','hospital.update','users.view'],
  SYSTEM_ADMIN:     ['*'] // tout
};

export function usePermissions() {
  const { user } = useAuth();
  const can = (action) => {
    if (!user) return false;
    const perms = MATRIX[user.role] || [];
    return perms.includes('*') || perms.includes(action);
  };
  return { can, role: user?.role };
}


// Version web - stockage en mémoire pour la démo
let mockPatients = [];
let mockId = 1;

export function initDb() {}

export function insertPatient(p) {
  mockPatients.push({ ...p, id: mockId++, synced: 0, created_at: new Date().toISOString() });
}

export function listPatients() {
  return [...mockPatients].reverse();
}

export function listUnsynced() {
  return mockPatients.filter(p => p.synced === 0);
}

export function markSynced(id) {
  const p = mockPatients.find(p => p.id === id);
  if (p) p.synced = 1;
}

export function countUnsynced() {
  return mockPatients.filter(p => p.synced === 0).length;
}
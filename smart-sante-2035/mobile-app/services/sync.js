// Service de synchronisation : pousse les patients locaux vers le serveur
import api from './api';
import { listUnsynced, markSynced } from '../db/sqlite';

export async function syncAll() {
  const items = listUnsynced();
  let ok = 0, fail = 0;
  for (const item of items) {
    try {
      // 1. creer le patient cote serveur
      const { data: patient } = await api.post('/patients', {
        full_name: item.full_name, gender: item.gender,
        phone: item.phone, city: item.city, region: item.region
      });
      // 2. creer le triage si symptomes presents
      if (item.symptoms) {
        await api.post('/triage', {
          patient_id: patient.id,
          score_vital: 50, score_symptomes: 50,
          score_antecedents: 30, score_age: 30,
          symptoms: item.symptoms
        });
      }
      markSynced(item.id);
      ok++;
    } catch (e) { fail++; }
  }
  return { ok, fail, total: items.length };
}

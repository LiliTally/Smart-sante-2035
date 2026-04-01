// File prioritaire (ordonnee par le binary heap cote serveur)
import { useEffect, useState } from 'react';
import api from '../services/api';
import TriageBadge from '../components/TriageBadge';
import Skeleton from '../components/Skeleton';
import { usePermissions } from '../hooks/usePermissions';
import toast from 'react-hot-toast';
import { CheckCircle, MapPin } from 'lucide-react';

export default function Queue() {
  const { can } = usePermissions();
  const [queue, setQueue] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  function load() {
    api.get('/triage/queue').then(r => setQueue(r.data));
  }
  useEffect(() => { load(); const t = setInterval(load, 8000); return () => clearInterval(t); }, []);

  async function setStatus(id, status) {
    try {
      await api.put(`/triage/${id}/status`, { status });
      toast.success('Statut mis à jour');
      load();
    } catch (e) { toast.error('Erreur'); }
  }

  async function recommend(id) {
    const { data } = await api.get(`/triage/${id}/recommend`);
    setRecommendations({ triageId: id, list: data.recommendations });
  }

  if (!queue) return <Skeleton rows={5} />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-700">File de priorité ({queue.length})</h2>
      <p className="text-sm text-slate-500">Ordonnée automatiquement par le score (Binary Heap).</p>

      <div className="space-y-2">
        {queue.length === 0 && <div className="card text-center text-slate-400">Aucun patient en attente</div>}
        {queue.map((t, idx) => (
          <div key={t.id} className="card flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">{idx+1}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-slate-800">{t.patient_name}</span>
                <span className="text-xs text-slate-400 font-mono">{t.patient_uuid}</span>
                <TriageBadge level={t.level} />
                <span className="text-xs text-slate-500">Score : <strong>{t.score_global}</strong></span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{t.symptoms || '—'} {t.hospital_name && `• ${t.hospital_name}`}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => recommend(t.id)} className="btn-secondary text-sm flex items-center gap-1"><MapPin className="w-4 h-4" /> Orienter</button>
              {can('triage.update') && (
                <button onClick={() => setStatus(t.id, 'TERMINE')} className="btn-primary text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Terminer</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {recommendations && (
        <div className="card">
          <h3 className="font-semibold mb-3">Hôpitaux recommandés (triage #{recommendations.triageId})</h3>
          <table className="w-full text-sm">
            <thead className="text-slate-500 text-left border-b border-slate-100">
              <tr><th className="py-2">Hôpital</th><th>Ville</th><th>Lits dispo</th><th>Distance</th><th>Score</th></tr>
            </thead>
            <tbody>
              {recommendations.list.map(h => (
                <tr key={h.id} className="border-b border-slate-50">
                  <td className="py-2 font-medium">{h.name}</td>
                  <td>{h.city}</td>
                  <td>{h.available_beds}</td>
                  <td>{Math.round(h.distance)} km</td>
                  <td className="font-semibold text-sky-600">{h.recommendationScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-secondary mt-3 text-sm" onClick={() => setRecommendations(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
}

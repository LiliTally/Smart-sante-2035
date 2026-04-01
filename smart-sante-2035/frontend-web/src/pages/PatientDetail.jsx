// Detail d'un patient + historique des triages
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../services/api';
import TriageBadge from '../components/TriageBadge';
import Skeleton from '../components/Skeleton';

export default function PatientDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/patients/${id}`).then(r => setData(r.data));
  }, [id]);

  if (!data) return <Skeleton rows={5} />;
  const { patient, history } = data;

  return (
    <div className="space-y-4">
      <Link to="/patients" className="text-sky-600 inline-flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Retour</Link>
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800">{patient.full_name}</h2>
        <p className="text-sm text-slate-500">UUID : {patient.uuid}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
          <div><div className="text-slate-400">Genre</div><div>{patient.gender}</div></div>
          <div><div className="text-slate-400">Naissance</div><div>{patient.birth_date || '—'}</div></div>
          <div><div className="text-slate-400">Téléphone</div><div>{patient.phone || '—'}</div></div>
          <div><div className="text-slate-400">Région</div><div>{patient.region || '—'}</div></div>
        </div>
        {patient.medical_history && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm">
            <strong>Historique :</strong> {patient.medical_history}
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="font-semibold text-slate-700 mb-4">Historique des triages ({history.length})</h3>
        {history.length === 0 ? <p className="text-slate-400 text-sm">Aucun triage enregistré.</p> : (
          <table className="w-full text-sm">
            <thead className="text-slate-500 text-left border-b border-slate-100">
              <tr><th className="py-2">Date</th><th>Niveau</th><th>Score</th><th>Hôpital</th><th>Statut</th></tr>
            </thead>
            <tbody>
              {history.map(t => (
                <tr key={t.id} className="border-b border-slate-50">
                  <td className="py-3">{new Date(t.created_at).toLocaleString()}</td>
                  <td><TriageBadge level={t.level} /></td>
                  <td>{t.score_global}</td>
                  <td>{t.hospital_name || '—'}</td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

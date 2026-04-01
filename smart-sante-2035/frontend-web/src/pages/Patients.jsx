// Liste des patients avec recherche et pagination
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';
import api from '../services/api';
import { usePermissions } from '../hooks/usePermissions';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';

export default function Patients() {
  const { can } = usePermissions();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ full_name:'', birth_date:'', gender:'M', phone:'', city:'', region:'', medical_history:'' });

  function load() {
    setData(null);
    api.get('/patients', { params: { search, page, limit: 10 } }).then(r => setData(r.data));
  }
  useEffect(() => { load(); }, [page]);
  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [search]);

  async function create(e) {
    e.preventDefault();
    try {
      await api.post('/patients', form);
      toast.success('Patient enregistré');
      setShowForm(false);
      setForm({ full_name:'', birth_date:'', gender:'M', phone:'', city:'', region:'', medical_history:'' });
      load();
    } catch (err) { toast.error(err.response?.data?.error || 'Erreur'); }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-slate-700">Patients</h2>
        {can('patient.create') && (
          <button onClick={() => setShowForm(s => !s)} className="btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Nouveau patient
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={create} className="card grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="input-field" placeholder="Nom complet" required value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} />
          <input type="date" className="input-field" value={form.birth_date} onChange={e=>setForm({...form, birth_date:e.target.value})} />
          <select className="input-field" value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})}>
            <option value="M">Masculin</option><option value="F">Féminin</option><option value="AUTRE">Autre</option>
          </select>
          <input className="input-field" placeholder="Téléphone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
          <input className="input-field" placeholder="Ville" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
          <input className="input-field" placeholder="Région" value={form.region} onChange={e=>setForm({...form, region:e.target.value})} />
          <textarea className="input-field md:col-span-2" placeholder="Historique médical" rows="2" value={form.medical_history} onChange={e=>setForm({...form, medical_history:e.target.value})}></textarea>
          <div className="md:col-span-2 flex gap-2">
            <button className="btn-primary">Enregistrer</button>
            <button type="button" className="btn-secondary" onClick={()=>setShowForm(false)}>Annuler</button>
          </div>
        </form>
      )}

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input className="input-field" placeholder="Rechercher (nom, UUID, téléphone)..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

        {!data ? <Skeleton /> : (
          <>
            <table className="w-full text-sm">
              <thead className="text-slate-500 text-left border-b border-slate-100">
                <tr><th className="py-2">UUID</th><th>Nom</th><th>Genre</th><th>Ville</th><th>Région</th><th></th></tr>
              </thead>
              <tbody>
                {data.data.map(p => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-sky-50">
                    <td className="py-3 font-mono text-xs">{p.uuid}</td>
                    <td className="font-medium text-slate-700">{p.full_name}</td>
                    <td>{p.gender}</td>
                    <td>{p.city}</td>
                    <td>{p.region}</td>
                    <td><Link to={`/patients/${p.id}`} className="text-sky-600 hover:underline">Détails</Link></td>
                  </tr>
                ))}
                {data.data.length === 0 && <tr><td colSpan="6" className="py-6 text-center text-slate-400">Aucun patient</td></tr>}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span className="text-slate-500">Total : {data.total}</span>
              <div className="flex gap-2">
                <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="btn-secondary disabled:opacity-50">←</button>
                <span className="px-3 py-2">Page {page}</span>
                <button disabled={page*10>=data.total} onClick={()=>setPage(p=>p+1)} className="btn-secondary disabled:opacity-50">→</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

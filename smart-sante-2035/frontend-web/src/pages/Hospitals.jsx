// Liste des hopitaux + filtres + carte simple
import { useEffect, useState } from 'react';
import api from '../services/api';
import Skeleton from '../components/Skeleton';
import { Building2, MapPin } from 'lucide-react';

export default function Hospitals() {
  const [list, setList] = useState(null);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => { api.get('/hospitals').then(r => setList(r.data)); }, []);
  if (!list) return <Skeleton />;

  const regions = [...new Set(list.map(h => h.region))].sort();
  const filtered = list.filter(h =>
    (!search || h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase())) &&
    (!region || h.region === region)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-700">Hôpitaux ({filtered.length})</h2>
      <div className="card flex gap-3 flex-wrap">
        <input className="input-field flex-1 min-w-[200px]" placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="input-field max-w-xs" value={region} onChange={e=>setRegion(e.target.value)}>
          <option value="">Toutes les régions</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(h => {
          const occ = h.total_beds ? Math.round((1 - h.available_beds/h.total_beds)*100) : 0;
          const occColor = occ > 85 ? 'bg-alert-100 text-alert-500' : occ > 60 ? 'bg-warm-100 text-warm-500' : 'bg-mint-100 text-mint-500';
          return (
            <div key={h.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Building2 className="w-5 h-5 text-sky-600"/></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{h.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3"/> {h.city}, {h.region}</p>
                  </div>
                </div>
                <span className={`badge ${occColor}`}>{occ}% occupé</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-slate-50 rounded-lg p-2"><div className="font-bold text-slate-700">{h.total_beds}</div><div className="text-xs text-slate-500">Total lits</div></div>
                <div className="bg-mint-100 rounded-lg p-2"><div className="font-bold text-green-700">{h.available_beds}</div><div className="text-xs text-green-700">Disponibles</div></div>
                <div className="bg-sky-100 rounded-lg p-2"><div className="font-bold text-sky-700">{(h.specialties||'').split(',').length}</div><div className="text-xs text-sky-700">Spécialités</div></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 truncate">{h.specialties}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Page : Nouveau triage (calcul du score en direct)
import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { TRIAGE_LEVELS } from '../utils/triageLevels';
import { Activity } from 'lucide-react';

// Calcul cote client (identique a la formule backend)
function computeLevel(scores) {
  const total = 0.45 * scores.vital + 0.30 * scores.symptomes
              + 0.15 * scores.antecedents + 0.10 * scores.age;
  let code = 'LEGER';
  if (total >= 80) code = 'CRITIQUE';
  else if (total >= 65) code = 'TRES_URGENT';
  else if (total >= 45) code = 'URGENT';
  else if (total >= 25) code = 'STABLE';
  return { total: Math.round(total * 100) / 100, level: TRIAGE_LEVELS[code], code };
}

export default function Triage() {
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState({
    patient_id: '', hospital_id: '',
    vital: 30, symptomes: 30, antecedents: 30, age: 30,
    symptoms: ''
  });

  useEffect(() => {
    api.get('/patients', { params: { limit: 200 } }).then(r => setPatients(r.data.data));
    api.get('/hospitals').then(r => setHospitals(r.data));
  }, []);

  const live = computeLevel(form);

  async function submit(e) {
    e.preventDefault();
    if (!form.patient_id) return toast.error('Sélectionnez un patient');
    try {
      await api.post('/triage', {
        patient_id: Number(form.patient_id),
        score_vital: Number(form.vital),
        score_symptomes: Number(form.symptomes),
        score_antecedents: Number(form.antecedents),
        score_age: Number(form.age),
        symptoms: form.symptoms,
        hospital_id: form.hospital_id ? Number(form.hospital_id) : null
      });
      toast.success(`Triage enregistré : ${live.level.name}`);
      setForm({ ...form, symptoms:'', vital:30, symptomes:30, antecedents:30, age:30 });
    } catch (err) { toast.error(err.response?.data?.error || 'Erreur'); }
  }

  function Slider({ label, name }) {
    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-600">{label}</span>
          <span className="font-semibold">{form[name]}</span>
        </div>
        <input type="range" min="0" max="100" value={form[name]}
          onChange={e => setForm({ ...form, [name]: Number(e.target.value) })}
          className="w-full accent-sky-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form onSubmit={submit} className="card lg:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
          <Activity className="w-5 h-5 text-sky-500" /> Nouveau triage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select className="input-field" value={form.patient_id} onChange={e=>setForm({...form, patient_id:e.target.value})}>
            <option value="">-- Choisir un patient --</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.uuid} — {p.full_name}</option>)}
          </select>
          <select className="input-field" value={form.hospital_id} onChange={e=>setForm({...form, hospital_id:e.target.value})}>
            <option value="">-- Hôpital de référence (optionnel) --</option>
            {hospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>
        <div className="space-y-3">
          <Slider label="Score signes vitaux (TA, FC, SpO2, conscience)" name="vital" />
          <Slider label="Score symptômes (douleur, dyspnée, saignement)" name="symptomes" />
          <Slider label="Score antécédents (comorbidités)" name="antecedents" />
          <Slider label="Score âge (nourrisson ou senior)" name="age" />
        </div>
        <textarea className="input-field" rows="2" placeholder="Symptômes décrits"
          value={form.symptoms} onChange={e => setForm({ ...form, symptoms: e.target.value })} />
        <button className="btn-primary w-full">Enregistrer le triage</button>
      </form>

      <div className="space-y-4">
        <div className="card text-center">
          <div className="text-sm text-slate-500">Score global calculé</div>
          <div className="text-5xl font-bold my-3" style={{ color: live.level.color }}>
            {live.total}
          </div>
          <span className={`badge ${live.level.bg} ${live.level.text} text-sm`}>{live.level.name}</span>
          <p className="text-sm text-slate-600 mt-3">{live.level.description}</p>
          <p className="text-sm font-medium text-slate-700 mt-2">→ {live.level.action}</p>
        </div>
        <div className="card text-xs text-slate-500">
          <p><strong>Formule</strong></p>
          <p className="font-mono mt-1">S = 0.45·V + 0.30·S + 0.15·A + 0.10·Â</p>
        </div>
      </div>
    </div>
  );
}

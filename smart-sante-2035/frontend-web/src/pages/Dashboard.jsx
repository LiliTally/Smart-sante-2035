// Tableau de bord avec statistiques et graphiques
import { useEffect, useState } from 'react';
import { Users, Building2, BedDouble, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import api from '../services/api';
import StatCard from '../components/StatCard';
import Skeleton from '../components/Skeleton';
import { TRIAGE_LEVELS } from '../utils/triageLevels';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/stats/dashboard').then(r => setStats(r.data));
  }, []);

  if (!stats) return <Skeleton rows={6} />;

  const levelData = stats.triages.byLevel.map(x => ({
    name: TRIAGE_LEVELS[x.level]?.name || x.level,
    value: x.total,
    color: TRIAGE_LEVELS[x.level]?.color || '#94A3B8'
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-700">Vue d'ensemble du système</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}          label="Patients enregistrés" value={stats.patients} color="sky" />
        <StatCard icon={Building2}      label="Hôpitaux"             value={stats.hospitals} color="mint" />
        <StatCard icon={BedDouble}      label="Lits disponibles"     value={stats.beds.available}
                  subtitle={`Occupation : ${stats.beds.occupation}%`} color="warm" />
        <StatCard icon={AlertTriangle}  label="Cas critiques actifs" value={stats.triages.critical} color="alert" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-slate-700 mb-4">Répartition par niveau de triage</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={levelData} dataKey="value" nameKey="name" outerRadius={90} label>
                {levelData.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-slate-700 mb-4">Triages sur 7 derniers jours</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stats.perDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tickFormatter={d => d?.substring(5)} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#0EA5E9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-700 mb-4">Patients par région</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.byRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#22C55E" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Carte de statistique pour le dashboard
export default function StatCard({ icon: Icon, label, value, color = 'sky', subtitle }) {
  const bg = { sky:'bg-sky-100 text-sky-600', mint:'bg-green-100 text-green-600',
               alert:'bg-red-100 text-red-600', warm:'bg-amber-100 text-amber-600' }[color];
  return (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
}

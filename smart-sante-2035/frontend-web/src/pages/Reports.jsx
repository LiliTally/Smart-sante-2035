// Rapports + exports CSV/PDF
import { FileDown, FileText } from 'lucide-react';

export default function Reports() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
  const token = localStorage.getItem('accessToken');

  async function download(path, filename) {
    const res = await fetch(apiUrl + path, { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-xl font-semibold text-slate-700">Rapports & exports</h2>
      <div className="card flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Export CSV des triages</h3>
          <p className="text-sm text-slate-500">Données brutes pour analyse Excel</p>
        </div>
        <button onClick={() => download('/stats/export/csv', 'triages.csv')} className="btn-primary flex items-center gap-2">
          <FileDown className="w-4 h-4" /> CSV
        </button>
      </div>
      <div className="card flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Rapport PDF</h3>
          <p className="text-sm text-slate-500">Synthèse des derniers triages</p>
        </div>
        <button onClick={() => download('/stats/export/pdf', 'rapport.pdf')} className="btn-primary flex items-center gap-2">
          <FileText className="w-4 h-4" /> PDF
        </button>
      </div>
    </div>
  );
}

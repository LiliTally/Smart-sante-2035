// Administration : gestion des utilisateurs (acces restreint)
import { useEffect, useState } from 'react';
import api from '../services/api';
import Skeleton from '../components/Skeleton';

export default function Admin() {
  const [users, setUsers] = useState(null);

  useEffect(() => { api.get('/users').then(r => setUsers(r.data)).catch(()=>setUsers([])); }, []);

  if (!users) return <Skeleton />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-700">Administration des utilisateurs</h2>
      <div className="card">
        <table className="w-full text-sm">
          <thead className="text-slate-500 text-left border-b border-slate-100">
            <tr><th className="py-2">Nom</th><th>Email</th><th>Rôle</th><th>Hôpital</th><th>Région</th><th>Actif</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-slate-50">
                <td className="py-3 font-medium">{u.full_name}</td>
                <td>{u.email}</td>
                <td><span className="badge bg-sky-100 text-sky-700">{u.role_label}</span></td>
                <td>{u.hospital_name || '—'}</td>
                <td>{u.region || '—'}</td>
                <td>{u.is_active ? '✅' : '❌'}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="6" className="py-6 text-center text-slate-400">Accès restreint ou aucun utilisateur</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

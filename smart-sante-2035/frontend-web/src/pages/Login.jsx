// Page de connexion
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

export default function Login() {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('admin@smartsante.mg');
  const [password, setPassword] = useState('Demo1234!');
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Connexion réussie');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Échec de la connexion');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-white shadow-soft items-center justify-center mb-3">
            <Heart className="w-8 h-8 text-sky-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Smart Santé 2035</h1>
          <p className="text-sm text-slate-500">Triage et orientation hospitalière - Madagascar</p>
        </div>
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <p className="text-xs text-center text-slate-400 mt-4">
            Comptes de démo (mdp : <code>Demo1234!</code>)<br />
            admin@ / doctor@ / staff@ / agent@ / hospital@ / region@ smartsante.mg
          </p>
        </form>
      </div>
    </div>
  );
}

// Layout principal : sidebar + topbar + zone de contenu
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Activity, ListOrdered,
  Building2, FileBarChart, Shield, LogOut, Heart, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const MENU = [
  { to: '/',          label: 'Tableau de bord', icon: LayoutDashboard, roles: '*' },
  { to: '/patients',  label: 'Patients',        icon: Users,           roles: '*' },
  { to: '/triage',    label: 'Nouveau triage',  icon: Activity,        roles: ['COMMUNITY_AGENT','MEDICAL_STAFF','DOCTOR','HOSPITAL_ADMIN'] },
  { to: '/queue',     label: 'File prioritaire',icon: ListOrdered,     roles: '*' },
  { to: '/hospitals', label: 'Hôpitaux',        icon: Building2,       roles: '*' },
  { to: '/reports',   label: 'Rapports',        icon: FileBarChart,    roles: ['DOCTOR','HOSPITAL_ADMIN','REGIONAL_MANAGER','SYSTEM_ADMIN'] },
  { to: '/admin',     label: 'Administration',  icon: Shield,          roles: ['SYSTEM_ADMIN','REGIONAL_MANAGER'] }
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifCount, setNotifCount] = useState(0);

  // Connexion Socket.io pour notifications urgentes
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000');
    socket.on('triage:urgent', (data) => {
      toast.error(`🚨 ${data.message}`, { duration: 6000 });
      setNotifCount(c => c + 1);
    });
    return () => socket.disconnect();
  }, []);

  function handleLogout() { logout(); navigate('/login'); }

  // Filtre du menu selon le role
  const visibleMenu = MENU.filter(m => m.roles === '*' || m.roles.includes(user.role));

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
            <Heart className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <div className="font-bold text-slate-800">Smart Santé</div>
            <div className="text-xs text-slate-500">2035 - Madagascar</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {visibleMenu.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  isActive ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Contenu */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-700">Bonjour, {user?.full_name}</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-slate-500" />
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-alert-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifCount}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-700">{user?.role}</div>
              <div className="text-xs text-slate-400">{user?.email}</div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

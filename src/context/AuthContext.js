// src/context/AuthContext.js
// Contas e login. Sem login o app funciona como visitante (user = null). Contas fictícias; trocar por API depois.
import { createContext, useContext, useState } from 'react';

export const ROLE_LABEL = { usuario: 'Usuário', expositor: 'Expositor', administrador: 'Administrador' };
export const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
const hoje = () => {
  const d = new Date();
  return `${d.getDate()} ${'jan,fev,mar,abr,mai,jun,jul,ago,set,out,nov,dez'.split(',')[d.getMonth()]} ${d.getFullYear()}`;
};

// Senha de todas as contas de teste: 12345678
const conta = (id, role, name, phone, email, since, displayName = name) =>
  ({ id, role, name, displayName, phone, email, since, password: '12345678' });
const USERS = [
  conta('u1', 'usuario', 'Ana B. Campos', '(11) 91111-5555', 'ana_campos@email.com', '10 out 2026'),
  conta('u2', 'expositor', 'Vanessa C.', '(11) 91661-6666', 'vanessac@email.com', '11 out 2026'),
  conta('u3', 'administrador', 'Gabriela Vasconselos', '(11) 90000-2222', 'gabriela.va@email.com', '1 out 2026', 'Gabriela V.'),
  conta('u4', 'usuario', 'Marina Costa', '', 'marina.costa@exemplo.com', '18 out 2026'),
  conta('u5', 'administrador', 'Ana Ribeiro', '', 'ana.ribeiro@exemplo.com', '12 out 2026'),
  conta('u6', 'usuario', 'Rafael Lima', '', 'rafael.lima@exemplo.com', '20 out 2026'),
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(USERS);
  const [user, setUser] = useState(null); // null = visitante

  const login = (email, password) => {
    const found = users.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
    if (found) setUser(found);
    return !!found;
  };
  const logout = () => setUser(null);
  const register = (data, autoLogin = false) => {
    const u = { ...data, id: `u${Date.now()}`, displayName: data.name, since: hoje() };
    setUsers((l) => [...l, u]);
    if (autoLogin) setUser(u);
  };
  const updateUser = (patch, id = user?.id) => {
    // Alteração
    const { role, ...resto } = patch;
    // só administrador pode alterar o tipo de conta (role)
    const dados = role !== undefined && user?.role === 'administrador' ? { ...resto, role } : resto;

    setUsers((l) => l.map((u) => (u.id === id ? { ...u, ...patch } : u)));
    setUser((u) => (u && u.id === id ? { ...u, ...patch } : u));
  };
  const removeUser = (id) => setUsers((l) => l.filter((u) => u.id !== id));

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register, updateUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js
// Quem está logado (usuário, expositor ou administrador). Contas fictícias; trocar por API depois.
import { createContext, useContext, useState } from 'react';

// Senha de todas as contas de teste: 12345678
const USERS = [
  { id: 'u1', role: 'usuario', name: 'Ana B. Campos', displayName: 'Ana B. Campos', phone: '(11) 91111-5555', email: 'ana_campos@email.com', password: '12345678' },
  { id: 'u2', role: 'expositor', name: 'Vanessa C.', displayName: 'Vanessa C.', phone: '(11) 91661-6666', email: 'vanessac@email.com', password: '12345678' },
  { id: 'u3', role: 'administrador', name: 'Gabriela Vasconselos', displayName: 'Gabriela V.', phone: '(11) 90000-2222', email: 'gabriela.va@email.com', password: '12345678' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Dica: useState(USERS[2]) pula o login enquanto você desenvolve.
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = USERS.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
    if (found) setUser(found);
    return !!found;
  };
  const logout = () => setUser(null);
  const updateUser = (patch) => setUser((u) => ({ ...u, ...patch }));

  return <AuthContext.Provider value={{ user, login, logout, updateUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

import { createContext } from 'react';

export const AuthContext = createContext({
  user: { id: 1, role: 'student' }
});

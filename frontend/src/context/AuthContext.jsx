import { createContext, useContext, useEffect, useReducer } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,   // starts true — wait for getMe to complete
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
    case 'CLEAR_USER':
      return { ...state, user: null, isAuthenticated: false, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const fetchUser = async () => {
    try {
      const { data } = await authAPI.getMe();
      dispatch({ type: 'SET_USER', payload: data.user || data });
    } catch {
      dispatch({ type: 'CLEAR_USER' });   // ← always resolves isLoading to false
    }
  };

  useEffect(() => {
    fetchUser();

    const handleUnauthorized = () => dispatch({ type: 'CLEAR_USER' });
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = async (credentials) => {
    const { data } = await authAPI.login(credentials);
    const user = data.user || data;
    dispatch({ type: 'SET_USER', payload: user });
    return user;
  };

  const register = async (credentials) => {
    const { data } = await authAPI.register(credentials);
    const user = data.user || data;
    dispatch({ type: 'SET_USER', payload: user });
    return user;
  };

  const logout = async () => {
    await authAPI.logout();
    dispatch({ type: 'CLEAR_USER' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
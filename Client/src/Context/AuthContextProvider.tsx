import React, { createContext, useState, useEffect, ReactNode } from 'react';

type AuthState = {
    isAuth: boolean;
    token: string | null;
    role: string | null;
};

type ContextValue = {
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<ContextValue>({
    auth: { isAuth: false, token: null, role: null },
    setAuth: () => { },
});

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        return {
            isAuth: !!token,
            token: token || null,
            role: role || null
        };
    });

    useEffect(() => {
        localStorage.setItem('token', auth.token || '');
        localStorage.setItem('role', auth.role || '');
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

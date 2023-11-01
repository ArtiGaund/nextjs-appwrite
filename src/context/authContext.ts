import { createContext } from "react"

// it gives boolean value and ability to update that boolean value
export const AuthContext = createContext<{
    authStatus : boolean;
    setAuthStatus : (status: boolean) => void;
}>({
    authStatus:  false,
    setAuthStatus: () => {},
})

//provider
export const AuthProvider = AuthContext.Provider;

export default AuthContext;

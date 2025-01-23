import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import jwtStorage from "./../storage/jwt-storage";

interface AuthContextProps {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const jwt = jwtStorage.getJwt();
    if (jwt) {
      setIsAuthenticated(true);
    } else {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {isAuthenticated && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

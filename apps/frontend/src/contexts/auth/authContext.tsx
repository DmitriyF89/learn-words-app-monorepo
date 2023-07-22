import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

const AuthContext = createContext<{
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}>({ user: null, setUser: () => void 0 });

const AuthContextWrapper: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextWrapper, AuthContext };

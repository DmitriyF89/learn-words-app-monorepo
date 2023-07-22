import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth/authContext';

import styles from './styles.module.scss';

const Logout: React.FC = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <div className={styles.logoutButtonWrapper}>
      <button className={styles.logoutButton} onClick={() => setUser(null)}>
        Logout
      </button>
    </div>
  );
};

export { Logout };

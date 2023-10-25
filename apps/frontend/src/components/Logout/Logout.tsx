import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { useLazyLogoutUserQuery } from '../../services/api/apiService';
import { resetState as resetUser } from '../../stores/authSlice';
import { resetState as resetTraining } from '../../stores/trainingSlice';

import styles from './styles.module.scss';

const Logout: React.FC = () => {
  const [logout] = useLazyLogoutUserQuery();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const onLogout = async () => {
    try {
      const isLoggedOut = await logout();

      if (isLoggedOut) {
        dispatch(resetUser());
        dispatch(resetTraining());
        push('/');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.logoutButtonWrapper}>
      <button className={styles.logoutButton} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export { Logout };

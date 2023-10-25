'use client';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';

import { store } from '../src/stores';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { useLazyGetCurrentUserQuery } from '../src/services/api/apiService';
import { setUserId } from '../src/stores/authSlice';

import styles from './layout.module.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './global.css';

export const metadata = {
  title: 'Learn Words Application',
};

const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fetchCurrentUser] = useLazyGetCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser();

      if (user.data?.id) {
        dispatch(setUserId({ id: user.data?.id }));
      }
    };

    fetchUser();
  }, [dispatch, fetchCurrentUser]);

  return (
    <html lang="en">
      <body>
        <div className={styles.pageWrapper}>
          <Header />
          <div className={styles.contentWrapper}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AppContent>{children}</AppContent>
    </Provider>
  );
}

'use client';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { AuthContextWrapper } from '../src/contexts/auth/authContext';

import styles from './layout.module.scss';

import './global.css';

export const metadata = {
  title: 'Learn Words Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextWrapper>
          <div className={styles.pageWrapper}>
            <Header />
            <div className={styles.contentWrapper}>{children}</div>
            <Footer />
          </div>
        </AuthContextWrapper>
      </body>
    </html>
  );
}

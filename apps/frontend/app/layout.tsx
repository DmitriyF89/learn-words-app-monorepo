import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';

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
        <div className={styles.pageWrapper}>
          <Header />
          <div className={styles.contentWrapper}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

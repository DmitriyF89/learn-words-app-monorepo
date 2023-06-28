import Link from 'next/link';

import { Login } from '../Login';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.navWrapper}>
          <p className={styles.appTitle}>
            <Link href="/">LearnWordsApp</Link>
          </p>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navListItem}>
                <Link href="/words">Words</Link>
              </li>
              <li className={styles.navListItem}>
                <Link href="/training">Training</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Login />
      </header>
    </>
  );
};

export { Header };

import { useContext } from 'react';
import Link from 'next/link';

import { Grid } from '../Grid';
import { Login } from '../Login';
import { Logout } from '../Logout/Logout';
import { AuthContext } from '../../contexts/auth/authContext';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <header className={styles.header}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Column span="3">
              <p className={styles.appTitle}>
                <Link href="/">LearnWordsApp</Link>
              </p>
            </Grid.Column>
            <Grid.Column span="7">
              <div className={styles.navWrapper}>
                {user ? (
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
                ) : null}
              </div>
            </Grid.Column>
            <Grid.Column span="2">{user ? <Logout /> : <Login />}</Grid.Column>
          </Grid.Row>
        </Grid.Container>
      </header>
    </>
  );
};

export { Header };

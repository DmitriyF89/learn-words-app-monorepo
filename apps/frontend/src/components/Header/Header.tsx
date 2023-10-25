import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Grid } from '../Grid';
import { Login } from '../Login';
import { Logout } from '../Logout/Logout';
import { RootState } from '../../stores';

import styles from './styles.module.scss';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userId);
  const selectedLanguage = useSelector(
    (state: RootState) => state.training.language
  );

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
                      {selectedLanguage ? (
                        <li className={styles.navListItem}>
                          <Link href="/training">Training</Link>
                        </li>
                      ) : null}
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

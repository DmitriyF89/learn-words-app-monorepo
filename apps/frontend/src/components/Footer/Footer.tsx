import styles from './styles.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.footerHeading}>
        Discover the world, one word at a time.
      </h3>
      <p className={styles.footerText}>
        Our language learning app is here to empower you on your journey towards
        language fluency.
      </p>
      <p className={styles.footerText}>
        Expand your vocabulary, master new phrases, and unlock a world of
        possibilities.
      </p>
    </footer>
  );
};

export { Footer };

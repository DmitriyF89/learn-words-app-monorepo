import { Grid } from '../../components/Grid';

import styles from './styles.module.scss';

export const MainPage: React.FC = () => {
  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Column>
          <p className={styles.description}>
            <span className={styles.descriptionTitle}>Learn Words App</span> is
            a cutting-edge language learning application designed to enhance
            your vocabulary acquisition and retention. With its powerful
            features and innovative approach, Learn Words App helps you master
            new words and solidify your language skills effectively.
          </p>
          <h3 className={styles.featuresTitle}>Key features</h3>
          <ul>
            <li className={styles.feature}>
              Vocabulary Management: Learn Words App provides a user-friendly
              interface for effortlessly saving and organizing your learned
              words.
            </li>
            <li className={styles.feature}>
              Interval Repetition Technique: Leveraging the scientifically
              proven interval repetition technique, Learn Words App optimizes
              your learning process. The app intelligently schedules word
              reviews based on your performance and the concept of spaced
              repetition.
            </li>
          </ul>

          <p className={styles.description}>
            Embark on a language learning adventure like never before with Learn
            Words App. Start expanding your vocabulary, enhancing your fluency,
            and gaining confidence in your target language. Download Learn Words
            App today and unlock a world of linguistic possibilities.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid.Container>
  );
};

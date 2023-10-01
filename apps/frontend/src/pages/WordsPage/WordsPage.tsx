import { Grid } from '../../components/Grid';
import { TopBar } from './components/TopBar';
import { WordsTabs } from './components/WordsTabs';

export const WordsPage: React.FC = () => {
  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Column>
          <TopBar />
          <WordsTabs />
        </Grid.Column>
      </Grid.Row>
    </Grid.Container>
  );
};

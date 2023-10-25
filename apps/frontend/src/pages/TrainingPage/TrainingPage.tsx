import { Grid } from '../../components/Grid';
import { WordsToRepeat } from './components/WordsToRepeat';

export const TrainingPage: React.FC = () => {
  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Column>
          <WordsToRepeat />
        </Grid.Column>
      </Grid.Row>
    </Grid.Container>
  );
};

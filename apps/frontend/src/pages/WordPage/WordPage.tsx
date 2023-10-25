import { Grid } from '../../components/Grid';
import { Content } from './components/Content/Content';

export const WordPage: React.FC = () => {
  return (
    <Grid.Container>
      <Grid.Row>
        <Grid.Column>
          <Content />
        </Grid.Column>
      </Grid.Row>
    </Grid.Container>
  );
};

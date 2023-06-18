import express, { Request, Response } from 'express';
import { User } from '../src/interfaces/user.interface';
import { ScoreCalculationEngine } from './classes/scoreCalculationEngine';

const app = express();
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());

app.post('/calculateRiskProfile', (req: Request, res: Response) => {
  const user: User = req.body;
  const scoreEngine = new ScoreCalculationEngine();
  const riskProfile = scoreEngine.calculateRiskScore(user);
  res.json(riskProfile);
});

export { server };

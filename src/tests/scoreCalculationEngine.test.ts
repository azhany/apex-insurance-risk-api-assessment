import { User } from '../interfaces/user.interface';
import { server } from '../app';
import supertest from 'supertest';

const request = supertest(server);

afterAll((done) => {
  server.close((err) => {
    if (err) {
      console.error(err);
    }
    done();
  });
});

describe('Risk Score Calculation', () => {
  it('should calculate risk scores correctly', async () => {
    const user: User = {
      age: 35,
      dependents: 2,
      income: 0,
      maritalStatus: 'married',
      riskQuestions: [false, true, false],
      house: { ownershipStatus: 'owned' },
      vehicle: { year: 2018 }
    };

    const expectedRiskProfile = {
      auto: 'regular',
      disability: 'ineligible',
      home: 'economic',
      life: 'regular'
    };

    const response = await request.post('/calculateRiskProfile').send(user);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedRiskProfile);
  });
});

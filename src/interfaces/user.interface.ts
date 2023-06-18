export interface User {
    age: number;
    dependents: number;
    income: number;
    maritalStatus: string;
    riskQuestions: boolean[];
    house?: {
      ownershipStatus: string;
    };
    vehicle?: {
      year: number;
    };
  }
  
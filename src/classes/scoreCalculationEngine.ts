import { User } from '../interfaces/user.interface';
import { InsuranceType } from '../enums/insuranceType.enum';
import { RiskProfile } from '../interfaces/riskProfile.interface';

export class ScoreCalculationEngine {
  calculateRiskScore(user: User): RiskProfile {
    const riskScore: RiskProfile = {};

    const baseScore = this.calculateBaseScore(user.riskQuestions);
    riskScore[InsuranceType.LIFE] = this.calculateLifeScore(user, baseScore);
    riskScore[InsuranceType.DISABILITY] = this.calculateDisabilityScore(user, baseScore);
    riskScore[InsuranceType.HOME] = this.calculateHomeScore(user, baseScore);
    riskScore[InsuranceType.AUTO] = this.calculateAutoScore(user, baseScore);

    return riskScore;
  }

  private calculateBaseScore(riskQuestions: boolean[]): number {
    return riskQuestions.reduce((acc, question) => acc + (question ? 1 : 0), 0);
  }

  private calculateLifeScore(user: User, baseScore: number): string {
    if (user.age > 60) {
      return 'ineligible';
    }

    let score = baseScore;

    if (user.age < 30) {
      score -= 2;
    } else if (user.age <= 40) {
      score -= 1;
    }

    if(user.income > 200000) {
      score -= 1;
    }

    if(user.dependents > 0) {
      score += 1;
    }

    if (user.maritalStatus === 'married') {
      score += 1;
    }

    return this.mapScoreToInsuranceType(score);
  }

  private calculateDisabilityScore(user: User, baseScore: number): string {
    if (user.age > 60 || user.income <= 0 || !user.house || !user.house.ownershipStatus || !user.vehicle || !user.vehicle.year) {
      return 'ineligible';
    }

    let score = baseScore;

    if (user.age < 30) {
      score -= 2;
    } else if (user.age <= 40) {
      score -= 1;
    }

    if (user.income > 200000) {
      score -= 1;
    }

    if (user.house.ownershipStatus === 'mortgaged') {
      score += 1;
    }

    if(user.dependents > 0) {
      score += 1;
    }

    if (user.maritalStatus === 'married') {
      score -= 1;
    }

    return this.mapScoreToInsuranceType(score);
  }

  private calculateHomeScore(user: User, baseScore: number): string {
    if (user.income <= 0 || !user.house || !user.house.ownershipStatus || !user.vehicle || !user.vehicle.year) {
      return 'ineligible';
    }

    let score = baseScore;

    if (user.income > 200000) {
      score -= 1;
    }

    if (user.house.ownershipStatus === 'mortgaged') {
      score += 1;
    }

    return this.mapScoreToInsuranceType(score);
  }

  private calculateAutoScore(user: User, baseScore: number): string {
    if (user.income <= 0 || !user.house || !user.house.ownershipStatus || !user.vehicle || !user.vehicle.year) {
      return 'ineligible';
    }

    let score = baseScore;

    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - user.vehicle.year;

    if (vehicleAge <= 5) {
      score += 1;
    }

    if (user.income > 200000) {
      score -= 1;
    }

    return this.mapScoreToInsuranceType(score);
  }

  private mapScoreToInsuranceType(score: number): string {
    if (score <= 0) {
      return 'economic';
    } else if (score <= 2) {
      return 'regular';
    } else {
      return 'responsible';
    }
  }
}

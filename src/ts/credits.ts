import { Credits } from '../types/Credits';
import { credits } from '../data/credits';

const getCredits = async function (): Promise<Credits[]> {
  return credits;
};

export { getCredits };

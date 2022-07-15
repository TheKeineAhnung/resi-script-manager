import { Credit } from '../types/Credit';
import { credits } from '../data/credits';

const getCredits = async function (): Promise<Credit[]> {
  return credits;
};

export { getCredits };


import { russianData } from './russian';
import { mathematicsData } from './mathematics';
import { geographyData } from './geography';
import { SubjectsData } from './types';

export const topics: SubjectsData = {
  russian: russianData,
  mathematics: mathematicsData,
  algebra: mathematicsData, // алиас для математики
  geography: geographyData
};

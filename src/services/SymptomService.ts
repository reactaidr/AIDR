import axios from 'axios';

export interface Recommendation {
    category: string;
    recommendations: string[];
    severity: 'mild' | 'moderate' | 'severe';
}

export const fetchSymptoms = async () => {
  try {
    const response = await axios.get("https://674eeb97bb559617b26d434c.mockapi.io/symptom-analysis/symptom-analysis");
    return response;
  } catch (error) {
    console.error('Error fetching symptoms', error);
    return { data: []};
  }
}

export const fetchSymptomRecommendations = async (
    selectedCategory: string,
): Promise<Recommendation> => {
  try {
    const response = await fetchSymptoms();
    const matchedCategory = response.data.find((item: any) => item.category === selectedCategory);
    
    if (matchedCategory) {
        return matchedCategory.recommendations;
    } 
    // return [];

  } catch (error) {
    console.log('error is', error);
  }
};


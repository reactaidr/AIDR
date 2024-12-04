export const symptomCategories = {
    'Cold/Flu Symptoms': [
        'Fever',
        'Cough',
        'Sore Throat',
        'Body Aches',
        'Fatigue',
    ],
    'Allergies': [
        'Sneezing',
        'Runny Nose',
        'Itchy Eyes',
        'Congestion',
    ],
    'Pain/Discomfort': [
        'Headache',
        'Back Pain',
        'Joint Pain',
        'Muscle Ache',
    ],
    'Other': [
        'Dizziness',
        'Nausea',
        'Skin Rash',
        'Digestive Issues',
    ],
};

export const getCategoryForSymptom = (symptom: string): string => {
    for (const [category, symptoms] of Object.entries(symptomCategories)) {
        if (symptoms.includes(symptom)) {
            return category;
        }
    }
    return 'Other';
}
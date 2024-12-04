import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { Picker } from  '@react-native-picker/picker';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../navigation/AppNavigatior';
import { fetchSymptoms } from '../services/SymptomService';

type SymptomFormProps = NativeStackScreenProps<RootStackParamList, 'SymptomForm'>;

const SymptomForm: React.FC<SymptomFormProps> = ({ navigation }) => {
    const [category, setCategory] = useState<string>("");
    const [additionalDetails, setAdditionalDetails] = useState({
        feverDuration: '',
        painLevel: '',
    });
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const handleSymptomSelect = (symptom: string) => {
        setCategory(symptom);

        if (symptom === '') {
            setAdditionalDetails({ feverDuration: '', painLevel: ''});
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchSymptoms();
                if (response?.data) {
                    const allCategories = response.data.map((item: { category: string }) => item.category);
                    setCategories(allCategories);
                } else {
                    console.warn('No data found in API response');
                    setCategories([]);
                }
            } catch (error) {
                console.error('Error fetching symptoms:', error);
                setCategories([]);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = () => {
        if (!category) {
            Alert.alert('Validation Error', 'Please select at least one symptom');
            return;
        }

        navigation.navigate('Recommendations', {
            category,
            additionalDetails,
        });
    }

    console.log('category res', category);
    

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Symptom Checker</Text>

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Select Symptoms:</Text>
                <Picker 
                  selectedValue={category}
                  onValueChange={(itemValue) => {
                    handleSymptomSelect(itemValue);
                  }}
                >

                    <Picker.Item label="choose a Symptom" value="" />
                    {categories.map((cat) => (
                        <Picker.Item key={cat} label={cat} value={cat} />
                    ))}
                </Picker>
            </View>

            {category === 'Cold/Flu Symptoms' && (
                <View style={styles.additionalDetailsContainer}>
                    <Text style={styles.label}>Fever Duration (hours):</Text>
                    <Picker 
                       selectedValue={additionalDetails.feverDuration}
                       onValueChange={(itemValue) => 
                        setAdditionalDetails(prev => ({
                            ...prev, 
                            feverDuration: itemValue,
                        }))
                       }
                    >
                        {[...Array(25).keys()].map(i => (
                            <Picker.Item 
                              key={i}
                              label={`${i} hours`}
                              value={`${i}`}
                            />
                        ))}
                    </Picker>
                </View>
            )}

            {category === 'Pain/Discomfort' && (
                <View style={styles.additionalDetailsContainer}>
                    <Text style={styles.label}>Pain Level (1-10):</Text>
                    <Picker 
                      selectedValue={additionalDetails.painLevel}
                      onValueChange={(itemValue) => 
                        setAdditionalDetails(prev => ({
                            ...prev,
                            painLevel: itemValue,
                        }))
                      }
                    >
                        {[...Array(10).keys()].map(i => (
                            <Picker.Item
                              key={i + 1}
                              label={`${i+1}`}
                              value={`${i+1}`}
                            />
                        ))}
                    </Picker>
                </View>
            )}


            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>Get Recommendations</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    pickerContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    additionalDetailsContainer: {
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#527aba',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    recommendationsContainer: {
        marginTop: 20,
        padding: 15, 
        backgroundColor: '#eef',
        borderRadius: 10,
    },
    recommendationItem: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default SymptomForm;

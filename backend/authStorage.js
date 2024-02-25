import AsyncStorage from '@react-native-async-storage/async-storage';

const authKey = 'pb_auth';

const save = async (serialized) => {
  try {
    await AsyncStorage.setItem(authKey, serialized);
    console.log('Authentication data saved successfully');
  } catch (error) {
    console.error('Error saving authentication data:', error);
  }
};

const initial = async () => {
  try {
    const serializedData = await AsyncStorage.getItem(authKey);
    console.log('Retrieved initial authentication data:', serializedData);
    return serializedData;
  } catch (error) {
    console.error('Error retrieving initial authentication data:', error);
    return null;
  }
};

export { save, initial };

import AsyncStorage from '@react-native-community/async-storage';

/**
 * Given a key and a value, store a cookie for it.
 * @param {string} key
 * @param {string} value
 */
export const saveCookie = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value).then();
  } catch (e) {
    console.log(`Error storeData: ${e}`);
  }
};

/**
 * Given a key, return the cookie's value.
 * @param {string} key
 */
export const getCookie = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(`Error getData: ${e}`);
  }
};

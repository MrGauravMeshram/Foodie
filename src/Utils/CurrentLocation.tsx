import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from './LocationRequest';
import { getApiKey } from '../helpers/ApiKey';

const getPosition = () => {
  return new Promise<Geolocation.GeoPosition>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};

export const getCurrentLocation = async () => {
  try {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return null;
    }

    const position = await getPosition();

    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${getApiKey}`
    );

    const data = await response.json();

    const area = data.features?.[0]?.properties?.formatted;

    return area ?? null;
  } catch (error) {
    console.log("Error getting location:", error);
    return null;
  }
};
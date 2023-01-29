import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';

export function useFCMToken(): string {
  const [token, setToken] = useState('');

  const handleToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    try {
      const fcmToken = await messaging().getToken();
      setToken(fcmToken);
    } catch (error) {}
  };
  useEffect(() => {
    handleToken();
  }, []);

  return token;
}

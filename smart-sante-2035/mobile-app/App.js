// Point d'entree mobile - navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initDb } from './db/sqlite';

import LoginScreen from './app/login';
import HomeScreen from './app/home';
import PatientFormScreen from './app/patient-form';
import QueueScreen from './app/queue';
import SyncScreen from './app/sync';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => { initDb(); }, []);
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#E0F2FE' },
          headerTitleStyle: { color: '#0C4A6E' }
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Smart Santé 2035' }} />
        <Stack.Screen name="PatientForm" component={PatientFormScreen} options={{ title: 'Nouveau patient' }} />
        <Stack.Screen name="Queue" component={QueueScreen} options={{ title: 'File locale' }} />
        <Stack.Screen name="Sync" component={SyncScreen} options={{ title: 'Synchronisation' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

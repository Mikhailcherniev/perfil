import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './telas/inicio';
import ProfileScreen from './telas/perfil';
import SettingsScreen from './telas/chat';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'white',
        
        tabBarStyle: {
          bottom: 20,        
          width: '80%',        
          alignSelf: 'center', 
          borderRadius: 15,    
          height: 55,          
          backgroundColor: '#111',
          shadowColor: '#000',     
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          
        },
        headerShown: false, // Ocultar cabeçalho padrão
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home', // Rótulo da aba
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Perfil', // Rótulo da aba
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Configurações', // Rótulo da aba
        }}
      />
    </Tab.Navigator>
  );
}

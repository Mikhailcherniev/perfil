import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebaseConfig'; // Configuração do Firebase
import { onAuthStateChanged } from 'firebase/auth';

import Login from './telas/inicio'; // Tela de login
import BottomTabNavigator from './BottomTabNavigator'; // Rotas principais

const Stack = createStackNavigator();

export default function Routes() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setLoading(false); // Remover loading após verificar o estado do usuário
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // Mostre um splash ou carregamento aqui, se quiser
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

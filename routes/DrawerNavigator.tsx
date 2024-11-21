import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
import InsertDataScreen from '../screens/InsertDataScreen';
import ListScreen from '../screens/ListScreen';
import EditScreen from '../screens/EditScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Inserir Dados" component={InsertDataScreen} />
        <Drawer.Screen name="Listagem" component={ListScreen} />
        <Drawer.Screen name="Editar Dados" component={EditScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

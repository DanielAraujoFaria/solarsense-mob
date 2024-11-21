// app/_navigation/TabsNavigation.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../../screens/DashboardScreen';
import InsertDataScreen from '../../../screens/InsertDataScreen';
import ListScreen from '../../../screens/ListScreen';
import EditScreen from '../../../screens/EditScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Insert Data" component={InsertDataScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Edit" component={EditScreen} />
    </Tab.Navigator>
  );
}

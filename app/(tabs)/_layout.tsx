import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { HapticTab } from '@/components/HapticTab';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', 
          },
          default: {},
        }),
      }}>
      {}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} /> 
          ),
        }}
      />
      {}
      <Tabs.Screen
        name="insert-data"
        options={{
          title: 'Inserir Dados',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-plus" size={size} color={color} /> 
          ),
        }}
      />
      {}
      <Tabs.Screen
        name="list"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" size={size} color={color} /> 
          ),
        }}
      />
      {}
      <Tabs.Screen
        name="edit"
        options={{
          title: 'Editar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pencil" size={size} color={color} /> 
          ),
        }}
      />
    </Tabs>
  );
}

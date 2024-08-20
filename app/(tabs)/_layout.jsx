import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainLogo from "../components/mainLogo";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import DrinkContextProvider from "../../store/drink-context";


export default function RootLayout() {
  return (
    <>
    <MainLogo/>
    <DrinkContextProvider>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#00a6f9",
      headerShown: false,
    }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Start',
        tabBarIcon: ({color, focused}) => (
          <FontAwesome size={28} name="home" color={color} />
        )
      }}
    />
    <Tabs.Screen
      name="drinks"
      options={{
        title: 'Drinki',
        headerShown:false,
        tabBarIcon: ({color, focused}) => (
          <MaterialIcons name="local-drink" size={24} color={color} />
        )
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: 'Ustawienia',
        headerShown:false,
        tabBarIcon: ({color, focused}) => (
          <Ionicons name="settings" size={24} color={color} />
        )
      }}
    />

    

  </Tabs>
   </DrinkContextProvider>
   </>
  );
  
}

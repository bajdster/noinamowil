import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import MainLogo from "../components/mainLogo";
import { SafeAreaView } from "react-native";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#00a6f9",
      headerShown: false,
    }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({color, focused}) => (
          <FontAwesome size={28} name="home" color={color} />
        )
      }}
    />
    <Tabs.Screen
      name="drinks"
      options={{
        title: 'Drinks',
        headerShown:false,
        tabBarIcon: ({color, focused}) => (
          <MaterialIcons name="local-drink" size={24} color={color   } />
        )
      }}
    />

  </Tabs>
   </>
  );
}

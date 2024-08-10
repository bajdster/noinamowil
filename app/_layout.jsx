import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons/Entypo';


export default function RootLayout() {
  return (
    <>
    <Stack initialRouteName="(auth)">
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="drinkDetail/drink" options={{ headerShown: false }} />
    {/* <Stack.Screen name="+not-found" /> */}
  </Stack>
  </>
  );
}

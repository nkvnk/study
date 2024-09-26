import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./Navigation/Bottom";
import Login from "./Auth/Login";
import Course from "./component/Course";
import Signup from "./Auth/Signup";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and latId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRSZ4sKIVjL8geSOQvQGmwrEBPdX-gG4E",
  authDomain: "study-dae0f.firebaseapp.com",
  projectId: "study-dae0f",
  storageBucket: "study-dae0f.appspot.com",
  messagingSenderId: "470964014419",
  appId: "1:470964014419:web:a7ec721a81072b3d8365a6",
  measurementId: "G-VN4MN9QH6S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottmTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Course"
          component={Course}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

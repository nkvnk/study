import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in with:", userCredential.user.email);
        navigation.navigate("BottmTabs");
      })
      .catch((error) => alert(error.message));
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>スタディサプリ</Text>
      <TextInput
        style={styles.input}
        placeholder="メールアドレスまたはユーザー名"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>上記に同意してログイン</Text>
      </TouchableOpacity>
      <Text style={styles.link}>利用規約、プライバシーポリシー</Text>
      <Text style={styles.link}>ログインできない場合</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>会員登録されてない方はこちら</Text>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.footerButton} onPress={goToSignup}>
            <Text style={styles.footerButtonText}>個人でご利用の方</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>学校でご利用の方</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d47a1",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#0288d1",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "#fff",
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
  },
  footerButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  footerButton: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  footerButtonText: {
    color: "#0288d1",
  },
});

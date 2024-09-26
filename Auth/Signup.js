import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  const handleRegister = async () => {
    try {
      // Firebase Authenticationでユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestoreにユーザー情報を保存
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        // 必要に応じて他のデータもここに追加
      });

      console.log("ユーザーが正常に作成されました");
    } catch (error) {
      setError(error.message);
      console.error("エラーが発生しました: ", error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="名前" value={name} onChangeText={setName} />
      <TextInput
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="登録" onPress={handleRegister} />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};

export default Signup;

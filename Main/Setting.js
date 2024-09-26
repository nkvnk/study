import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

const { width } = Dimensions.get("window");

export default function MyPage() {
  const userData = {
    school: "目黒学院高等学校 | 19106",
    name: "山田 太郎",
    furigana: "やまだ たろう",
    dob: "2003年9月9日",
    gender: "男性",
    email: "",
    phoneNumber: "",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>マイページ</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
        <Text style={styles.school}>{userData.school}</Text>
        <Text style={styles.name}>{userData.name}</Text>
        <TouchableOpacity style={styles.trialButton}>
          <Text style={styles.trialButtonText}>編集する</Text>
        </TouchableOpacity>
      </View>

      {/* Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionHeader}>アカウント情報</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ユーザー名</Text>
          <Text style={styles.infoValue}>{userData.school.split("|")[1]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>パスワード</Text>
          <Text style={styles.infoValue}>•••••••••••</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionHeader}>基本情報</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>名前</Text>
          <Text style={styles.infoValue}>{userData.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ふりがな</Text>
          <Text style={styles.infoValue}>{userData.furigana}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>生年月日</Text>
          <Text style={styles.infoValue}>{userData.dob}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>性別</Text>
          <Text style={styles.infoValue}>{userData.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>電話番号</Text>
          <Text style={styles.infoValue}>入力されていません</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>E-mail</Text>
          <Text style={styles.infoValue}>入力されていません</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionHeader}>メール（お知らせ）受信設定</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>スタディサプリから</Text>
          <Text style={styles.infoValue}>受け取らない</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>大学から</Text>
          <Text style={styles.infoValue}>設定されていません</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>その他</Text>
          <Text style={styles.infoValue}>設定されていません</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>ログアウト</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    backgroundColor: "#005bac",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsButton: {
    padding: 10,
  },
  profileSection: {
    backgroundColor: "#005bac",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  school: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  trialButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  trialButtonText: {
    color: "#005bac",
    fontWeight: "bold",
  },
  infoSection: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: "#777",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#005bac",
    margin: 20,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import AntDesign from "@expo/vector-icons/AntDesign";
const { width } = Dimensions.get("window");
export default function Course({ route }) {
  const video = React.useRef(null);

  const { course } = route.params;
  const displayTitle =
    course.title.length > 15
      ? course.title.substring(0, 15) + "..."
      : course.title;
  console.log(course);
  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <View style={{ paddingRight: 20 }}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </View>
          <Text style={styles.headerTitle}>{displayTitle}</Text>
        </View>
      </View>

      {/* 動画再生部分 */}
      <Video
        ref={video}
        source={{
          uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",

          //uri: "https://www.youtube.com/watch?v=JprVwYcsFp0",
        }} // サンプル動画のURL
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
      />

      {/* 概要タブ */}
      <View style={styles.tabContainer}>
        <Text style={styles.tabText}>概要</Text>
        <Text style={styles.tabText}>講義一覧</Text>
      </View>
      <ScrollView>
        {/* 説明文 */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>講座の狙い</Text>
          <Text style={styles.descriptionText}>
            この講座は「いまいち勉強のやる気が出ない人・何をしていいかわからない人・英文法・英文読解などの講座をいきなり受講するのに抵抗がある人」などを対象にしたウォーミングアップの講座です。
          </Text>
          <Text style={styles.descriptionText}>
            予習不要、テキストなしで受講できる、気軽な、でも奥が深い講座です。
          </Text>
        </View>

        {/* 講師情報 */}
        <View style={styles.instructorContainer}>
          <Text style={styles.instructorLabel}>講師</Text>
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>{course.teacher}</Text>
          </View>
        </View>

        {/* 講座開始ボタン */}
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>講座をはじめる</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 18,

    paddingHorizontal: 15,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  video: {
    width: width,
    height: (width * 9) / 16, // 16:9のアスペクト比
    backgroundColor: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: "#1E3A8A",
  },
  descriptionContainer: {
    padding: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  instructorContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#CCCCCC",
  },
  instructorLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  instructorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  instructorName: {
    marginLeft: 10,
    fontSize: 16,
  },
  startButton: {
    margin: 15,
    backgroundColor: "#1E3A8A",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

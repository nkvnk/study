import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const { width, height } = Dimensions.get("window");
import { useEffect } from "react";
const subjects = [
  {
    key: "英語",
    courses: [
      {
        id: "1",
        title: "高1・高2・高3 英語超入門",
        teacher: "関 正生",
        lectures: 2,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "2",
        title: "高3 スタンダードレベル英語 ＜文法編＞",
        teacher: "関 正生",
        lectures: 24,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "3",
        title: "高3 スタンダードレベル英語 リーディング ＜英文解釈編＞",
        teacher: "関 正生",
        lectures: 18,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "1",
        title: "高1・高2・高3 英語超入門",
        teacher: "関 正生",
        lectures: 2,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "2",
        title: "高3 スタンダードレベル英語 ＜文法編＞",
        teacher: "関 正生",
        lectures: 24,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "3",
        title: "高3 スタンダードレベル英語 リーディング ＜英文解釈編＞",
        teacher: "関 正生",
        lectures: 18,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "1",
        title: "高1・高2・高3 英語超入門",
        teacher: "関 正生",
        lectures: 2,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "2",
        title: "高3 スタンダードレベル英語 ＜文法編＞",
        teacher: "関 正生",
        lectures: 24,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "3",
        title: "高3 スタンダードレベル英語 リーディング ＜英文解釈編＞",
        teacher: "関 正生",
        lectures: 18,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
    ],
  },
  {
    key: "数学",
    courses: [
      {
        id: "4",
        title: "数学超入門",
        teacher: "山田 太郎",
        lectures: 12,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "5",
        title: "スタンダードレベル数学 ＜微分積分編＞",
        teacher: "山田 太郎",
        lectures: 15,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
    ],
  },
  {
    key: "国語",
    courses: [
      {
        id: "6",
        title: "国語超入門",
        teacher: "佐藤 花子",
        lectures: 10,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "7",
        title: "古典文法",
        teacher: "佐藤 花子",
        lectures: 14,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
    ],
  },
  {
    key: "歴史",
    courses: [
      {
        id: "8",
        title: "世界史",
        teacher: "田中 一郎",
        lectures: 20,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
      {
        id: "9",
        title: "日本史",
        teacher: "田中 一郎",
        lectures: 18,
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      },
    ],
  },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef(null);
  const tabScrollRef = useRef(null);

  const handleTabPress = (index) => {
    setSelectedIndex(index);
    scrollRef.current.scrollTo({ x: index * width, animated: true });
    scrollToCenter(index);
  };

  const handleScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      scrollToCenter(index);
    }
  };

  const scrollToCenter = (index) => {
    const tabWidth = width / 4;
    const xOffset = index * tabWidth - (width / 2 - tabWidth / 2);
    tabScrollRef.current.scrollTo({ x: Math.max(xOffset, 0), animated: true });
  };

  //detailコンポーネントにどの様にデータを移行すればよいのか教えてu
  const navigation = useNavigation();
  const handlePress = (course) => {
    navigation.navigate("Course", { course });
  };
  //data抽出しますか

  const [subjectss, setSubjectss] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const db = getFirestore();
      try {
        const querySnapshot = await getDocs(collection(db, "subjects"));
        const fetchedSubjects = [];
        querySnapshot.forEach((doc) => {
          fetchedSubjects.push({
            key: doc.id,
            courses: Object.entries(doc.data().courses || {}).map(
              ([id, course]) => ({
                id,
                ...course,
              })
            ),
          });
        });
        setSubjectss(fetchedSubjects);
        console.log(querySnapshot);
        console.log("よろしくお願いし舞う");
      } catch (error) {
        console.error("Error fetching subjects: ", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.headerTitle}>大学受験生・高校3年生</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Feather
                name="search"
                size={22}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome6
                name="clipboard-list"
                size={22}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ref={tabScrollRef}
          style={styles.tabScrollView}
        >
          {subjects.map((subject, index) => (
            <TouchableOpacity
              key={subject.key}
              style={[styles.tab, selectedIndex === index && styles.activeTab]}
              onPress={() => handleTabPress(index)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedIndex === index && styles.activeTabText,
                ]}
              >
                {subject.key}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        data={subjects}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.courseListContainer}>
            <FlatList
              data={item.courses}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.courseContainer}
                  onPress={() => handlePress(item)}
                >
                  <Image
                    style={styles.avatar}
                    source={require("../assets/avatar.png")}
                  />
                  <View style={styles.courseDetails}>
                    <Text style={styles.courseTitle}>{item.title}</Text>
                    <Text style={styles.courseTeacher}>
                      {item.teacher} | {item.lectures}講義
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              style={styles.courseFlatList}
            />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  headerContainer: {
    height: height * 0.17, // ヘッダーとタブ部分を画面の20%の高さに設定
    backgroundColor: "#0d47a1",
  },
  header: {
    marginTop: 6,
    backgroundColor: "#0d47a1",
    height: height * 0.1, // ヘッダーを画面の10%の高さに設定
    paddingHorizontal: 60,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
  },
  tab: {
    width: width / 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#0d47a1",
  },
  tabText: {
    fontSize: 18,
    color: "#bbb",
  },
  activeTabText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  tabScrollView: {
    height: height * 0.1, // タブ部分を画面の10%の高さに設定
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#1e90ff",
  },
  courseListContainer: {
    width,
  },
  courseContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseTeacher: {
    fontSize: 14,
    color: "#555",
  },
  courseFlatList: {
    flex: 1,
  },
});

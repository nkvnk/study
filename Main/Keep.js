import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function Keep() {
  const [selectedSubject, setSelectedSubject] = useState("英語");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lectures, setLectures] = useState("");
  const [teacher, setTeacher] = useState("");
  const [uri, setUri] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const db = getFirestore();

  const handleSubmit = async () => {
    if (!title || !description || !lectures || !teacher || !uri) {
      alert("すべての必須項目を入力してください。");
      return;
    }

    try {
      await addDoc(collection(db, "subjects", selectedSubject, "courses"), {
        title,
        description,
        lectures,
        teacher,
        uri,
        createdAt: new Date(),
      });
      alert("データが正常に保存されました。");
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("データ保存中にエラーが発生しました。");
    }
  };

  const subjects = ["英語", "数学", "国語", "歴史"];

  const renderPicker = () => {
    return (
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {subjects.map((subject, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedSubject(subject);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{subject}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.modalItem, styles.modalCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>キャンセル</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>
        教科 <Text style={styles.required}>必須</Text>
      </Text>
      <TouchableOpacity
        style={styles.picker}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>{selectedSubject}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>
        タイトル <Text style={styles.required}>必須</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="タイトルを入力"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>
        説明 <Text style={styles.required}>必須</Text>
      </Text>
      <TextInput
        style={styles.textArea}
        placeholder="説明を入力"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>
        講座数 <Text style={styles.required}>必須</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="講座数を入力"
        value={lectures}
        onChangeText={setLectures}
        keyboardType="numeric"
      />

      <Text style={styles.label}>
        先生 <Text style={styles.required}>必須</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="先生の名前を入力"
        value={teacher}
        onChangeText={setTeacher}
      />

      <Text style={styles.label}>
        動画URL <Text style={styles.required}>必須</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="動画URLを入力"
        value={uri}
        onChangeText={setUri}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>保存する</Text>
      </TouchableOpacity>

      {renderPicker()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginVertical: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  pickerText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF333F",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalItem: {
    paddingVertical: 15,
  },
  modalItemText: {
    fontSize: 18,
    textAlign: "center",
  },
  modalCancel: {
    marginTop: 10,
    backgroundColor: "#FF333F",
    borderRadius: 5,
  },
  modalCancelText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

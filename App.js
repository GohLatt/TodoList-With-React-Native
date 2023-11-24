import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Gif from "react-native-gif";
const Item = ({ title, onDeleteFun, onEditFun }) => (
  <View
    style={styles.item}
    className="bg-cyan-500 px-4 py-4 shadow-lg rounded-lg shadow-cyan-500"
  >
    <Text className="text-base text-gray-50" style={styles.title}>
      {title}
    </Text>
    <View className="flex-row gap-x-5">
      <Icon
        name="edit"
        size={20}
        color={"#fff"}
        onPress={() => onEditFun(title)}
      />
      <Icon
        name="delete"
        size={20}
        color={"#ef4444"}
        onPress={() => onDeleteFun(title)}
      />
    </View>
  </View>
);
export default function App() {
  const [todo, setTodo] = useState("");
  const [edit, setEdit] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [save, setSave] = useState(false);

  const addTodoFun = () => {
    if (save) {
      const data = todoList.map((d) =>
        d.title === edit ? { ...d, title: todo } : d
      );

      setTodoList(data);
      setTodo("");
      setSave(false);
    } else {
      setTodoList([...todoList, { title: todo, id: todoList.length }]);
      setTodo("");
    }
  };

  const onDeleteFun = (title) => {
    const deleteData = todoList.filter((d) => d.title !== title);
    setTodoList(deleteData);
  };

  const onEditFun = (title) => {
    setEdit(title);
    setSave(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input_group}>
        <TextInput
          style={styles.input}
          placeholder="Add a Task"
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
      </View>
      <View style={styles.btn_group}>
        <Button
          style={styles.btn}
          title={save ? "Update" : "Add"}
          color="#67e8f9"
          width="100"
          accessibilityLabel="Click this button"
          titleStyle={{ fontSize: 40 }}
          onPress={() => addTodoFun()}
        />
      </View>

      {todoList.length > 0 ? (
        <View style={styles.todo_section}>
          <FlatList
            data={todoList}
            renderItem={({ item }) => (
              <Item
                title={item.title}
                onDeleteFun={onDeleteFun}
                onEditFun={onEditFun}
              />
            )}
            keyExtractor={(item) => `todo_${item.id}`}
          />
        </View>
      ) : (
        <View className="flex-1 justify-center">
          <Gif
            style={{ width: "100%", height: 200 }}
            source={{
              uri: "https://media3.giphy.com/media/JG1B7EMNsBhkcnsnRh/200w.webp?cid=ecf05e47y2kwgont9m6j7oj3k977ltuspk5tb9eo7w1nm8l1&ep=v1_gifs_search&rid=200w.webp&ct=g",
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 30,
  },

  input_group: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 3,
    borderColor: "#67e8f9",
  },

  btn_group: {
    marginVertical: 10,
    width: "100%",
  },

  todo_section: {
    marginTop: 20,
    paddingBottom: 100,
  },

  item: {
    flex: 1,
    marginVertical: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});

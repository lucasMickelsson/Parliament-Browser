import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const MembersScreen = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchParliamentMembers() {
      try {
        const response = await fetch(
          "https://api.lagtinget.ax/api/persons.json",
        );
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchParliamentMembers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        keyExtractor={(person) => person.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.title}>
              {item.first_name} {item.last_Name}
            </Text>
            <Text>{item.birthday}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MembersScreen;

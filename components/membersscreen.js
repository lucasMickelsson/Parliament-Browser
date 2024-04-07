import { Avatar } from "@rneui/themed";
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
            {item.image ? (
              <Avatar size={96} rounded source={{ uri: item.image.url }} />
            ) : (
              <Avatar
                size={96}
                rounded
                icon={{ name: "user", type: "font-awesome", color: "blue" }}
              /> // You need to define a default avatar component or image
            )}
            <Text style={styles.title}>
              {item.first_name} {item.last_name}
            </Text>
            <Text style={styles.text}>{item.city}</Text>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
  },
  text: {
    padding: 8,
  },
});

export default MembersScreen;

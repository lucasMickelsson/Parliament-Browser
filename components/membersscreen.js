import { Avatar, SearchBar } from "@rneui/themed";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const MembersScreen = () => {
  const [members, setMembers] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParliamentMembers() {
      try {
        const response = await fetch(
          "https://api.lagtinget.ax/api/persons.json",
        );
        const data = await response.json();
        setMembers(data);
        setFullData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchParliamentMembers();
  }, []);

  const handleSearch = (search) => {
    setSearch(search);
    const filteredData = fullData.filter((member) => {
      return contains(member, search);
    });
    setMembers(filteredData);
  };

  const contains = ({ first_name, last_name }, searchQuery) => {
    if (first_name.includes(searchQuery) || last_name.includes(searchQuery)) {
      return true;
    } else {
      return false;
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Sök efter ledarmöter"
        placeholderTextColor="black"
        onChangeText={(query) => {
          handleSearch(query);
        }}
        value={search}
        inputStyle={{ color: "black" }}
        lightTheme
      />
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

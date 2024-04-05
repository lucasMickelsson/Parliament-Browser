// WelcomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Välkommen till Ålands landsting</Text>
      <Button
        title="Visa ledarmöter"
        onPress={() => navigation.navigate("Members")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Homescreen;

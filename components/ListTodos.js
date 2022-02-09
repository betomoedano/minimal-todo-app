import * as React from "react";
import { StyleSheet, Text, View, FlatList} from "react-native";
import Todo from "./Todo";

export default function ListTodos({todosData}) {
  return (
      <FlatList
        data={todosData}
        renderItem={({ item }) => <Todo {...item} />}
        keyExtractor={item => item.id.toString()}
      /> 
  )
}

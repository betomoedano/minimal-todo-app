import * as React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function AddTodo() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Add a Task</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
});
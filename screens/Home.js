import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import ListTodos from '../components/ListTodos';
import { todosData } from '../data/todos';

export default function Home() {

    const [isHidden, setIsHidden] = useState(false);
    const [localData, setLocalData] = useState(
        todosData.sort((a, b) => {
        return a.isCompleted - b.isCompleted;
    }));

    

    const handleHideCompleted = () => {
        if (isHidden) {
            setIsHidden(false);
            setLocalData(todosData.sort((a, b) => {
                return a.isCompleted - b.isCompleted;
            }));
            return;
        }
        setIsHidden(!isHidden);
        setLocalData(localData.filter(item => item.isCompleted === false));
    }
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-photos-of-cats-cleaning-1593202999.jpg'}} 
                style={styles.pic} />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.title}>Today</Text>
                <TouchableOpacity onPress={handleHideCompleted}>
                    <Text style={{color:'#3478F6'}}>{isHidden ? "Show Completed" : "Hide Completed"}</Text>
                </TouchableOpacity>
            </View>
            
            <ListTodos 
                todosData={
                    localData.filter(todo => todo.isToday)
                } 
            />
            <Text style={styles.title}>Tomorrow</Text>
            <ListTodos 
                todosData={
                    localData.filter(todo => !todo.isToday)
                } 
            />

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    pic: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignSelf: 'flex-end'
    },
    container: {
        marginHorizontal: 15,
    },

});
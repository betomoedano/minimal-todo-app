import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { hideComplitedReducer, setTodosReducer } from '../redux/todosSlice';
import ListTodos from '../components/ListTodos';
import { todosData } from '../data/todos';
import { useGetTodos } from '../hooks/useGetTodos';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {

    useGetTodos();
    const todos = useSelector(state => state.todos.todos);
    const [isHidden, setIsHidden] = useState(false);
    const dispatch = useDispatch();
    // const [localData, setLocalData] = useState(
    //     todosData.sort((a, b) => {
    //     return a.isCompleted - b.isCompleted;
    // }));


    
    const handleHideCompleted = async () => {
        if (isHidden) {
            setIsHidden(false);
            const todos = await AsyncStorage.getItem('Todos');
            if(todos !== null){
                dispatch(setTodosReducer(JSON.parse(todos)));
            }
            // setLocalData(todosData.sort((a, b) => {
            //     return a.isCompleted - b.isCompleted;
            // }));
            return;
        }
        setIsHidden(!isHidden);
        dispatch(hideComplitedReducer());
        // setLocalData(localData.filter(item => item.isCompleted === false));
        
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
            <ListTodos todosData={todos.filter(todo => todo.isToday)} />
            <Text style={styles.title}>Tomorrow</Text>
            <ListTodos todosData={todos.filter(todo => !todo.isToday)} />
            {/* <ListTodos 
                todosData={
                    localData.filter(todo => todo.isToday)
                } 
            />
            <Text style={styles.title}>Tomorrow</Text>
            <ListTodos 
                todosData={
                    localData.filter(todo => !todo.isToday)
                } 
            /> */}
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
        flex: 1,
        paddingHorizontal: 15
    },

});
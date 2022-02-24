import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { hideComplitedReducer, setTodosReducer } from '../redux/todosSlice';
import ListTodos from '../components/ListTodos';
import { todosData } from '../data/todos';
import { useGetTodos } from '../hooks/useGetTodos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';
import moment from 'moment';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
})

export default function Home() {

    useGetTodos();
    const todos = useSelector(state => state.todos.todos);
    const [isHidden, setIsHidden] = useState(false);
    const dispatch = useDispatch();
    const [expoPushToken, setExpoPushToken] = useState('');
    const navigation = useNavigation();


    // const [localData, setLocalData] = useState(
    //     todosData.sort((a, b) => {
    //     return a.isCompleted - b.isCompleted;
    // }));

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        navigation.navigate('Onboarding');
    }, []);

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

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
            return;
        }
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        return token;
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
            <ListTodos todosData={todos.filter(todo => moment(todo.hour).isSame(moment(), 'day'))} />
            <Text style={styles.title}>Tomorrow</Text>
            <ListTodos todosData={todos.filter(todo => moment(todo.hour).isAfter(moment(), 'day'))} />
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
            <StatusBar style='auto' />
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
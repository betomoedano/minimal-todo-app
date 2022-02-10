import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetTodos = () => {
    const [todos, setTodos] = React.useState([]);
    React.useEffect(() => {
        const getTodos = async () => {
            try {
            const todos = await AsyncStorage.getItem('Todos');
            if(todos !== null){
                setTodos(JSON.parse(todos));
            }
            } catch (e) {
                console.log(e);
            }
        };
        getTodos();
    }, []);
    return todos;
};

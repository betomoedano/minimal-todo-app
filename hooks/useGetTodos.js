import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTodosReducer } from '../redux/todosSlice';
import { useDispatch, useSelector} from 'react-redux';

export const useGetTodos = () => {

    // const [todos, setTodos] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        
        const getTodos = async () => {
            try {
            const todos = await AsyncStorage.getItem('Todos');
            // const todos = await AsyncStorage.removetItem('Todos');
            if(todos !== null){
                // setTodos(JSON.parse(todos));
                dispatch(setTodosReducer(JSON.parse(todos)));
            }
            } catch (e) {
                console.log(e);
            }
        };
        getTodos();
    }, []);
    return ;
};

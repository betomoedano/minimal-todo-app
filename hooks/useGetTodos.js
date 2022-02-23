import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTodosReducer } from '../redux/todosSlice';
import { useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

export const useGetTodos = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        
        const getTodos = async () => {
            try {
            const todos = await AsyncStorage.getItem('Todos');
            if(todos !== null){
                // delete todos that they date is less than today
                const todosData = JSON.parse(todos);
                const todosDataFiltered = todosData.filter(item => {
                    return moment(item.hour).isSameOrAfter(moment(), 'day');
                });
                console.log(todosDataFiltered);
                if(todosDataFiltered !== null){
                    await AsyncStorage.setItem('Todos', JSON.stringify(todosDataFiltered));
                    console.log('we deleted some passed todos');
                    dispatch(setTodosReducer(todosDataFiltered));
                }
            }
            } catch (e) {
                console.log(e);
            }
        };
        getTodos();
    }, []);
    return ;
};

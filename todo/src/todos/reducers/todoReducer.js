// Import the TodoAction Creators and TodoActionTypes

import * as TodoActions from '../actions/todoActions'



// We are dividing the reducers using a technique called Reducer composition.
// By doing this we are seperating the reducer for the Collection and the Individual Item


//The collection Reducer, It handles only the collection

export function TodoListReducer(state = [], action) {
    switch (action.type) {

        // The cases ordered in CRUD order.

        // Create
        case TodoActions.CREATE_TODO_SUCCESS: {
                return [
                    ...state,
                    action.todo
                ];
        }
            
        //Read    
        case TodoActions.GET_TODOS_SUCCESS: {
            
            return action.todos.data;

        }
        
        // The following Cases handle the data by mapping it. Mostly because they are related with the modification of a single Data
        
        //Update    
        case TodoActions.START_EDITING: {
            
            return state.map(s => todo(s, action))
            //return state.map(s => (s.id === action.id))

        }
        case TodoActions.CANCEL_EDITING: {
            
            return state.map(s => todo(s, action))

        }
        case TodoActions.UPDATE_TODO: {

            return state.map(s => todo(s, action))
            
        }
        case TodoActions.UPDATE_TODO_SUCCESS: {

            return state.map(s => todo(s, action))

        }
        
        //Delete    
        case TodoActions.DELETE_TODO: {

            return state.map(s => todo(s, action))

        }
        case TodoActions.DELETE_TODO_SUCCESS: {

            return state.filter(s => s.id !== action.id)

        }
            
        default:
            return state
    }
}


//The individual Reducer. It handles only one Todo Object.


const todo = (state, action) => {

    // If the mapped todo of the previous state matches with the new ID of the action, 
    // Only then proceed to the Reducer Switch case

    if (state.id !== (action.id || action.todo.id)) {
        return state;
    }

    switch (action.type) {

        // Edit/modifies the individual Todos using ES6 spread operator. The cases are self explanatory.

        case TodoActions.START_EDITING:
            {
                return {
                    ...state,
                    editing: true
                }
            }

        case TodoActions.CANCEL_EDITING:
            {
                return {
                    ...state,
                    editing: false
                }
            }

        case TodoActions.UPDATE_TODO:
            {
                return {
                    ...state,
                    editing: false,
                    updating: true
                }
            }

        case TodoActions.UPDATE_TODO_SUCCESS:
            {
                console.log(state)
                console.log('action', action)
                return {
                    ...state,
                    ...action.todo,
                    // title: action.data.changeNewTitle,
                    // description: action.data.changeNewDescription,
                    updating: false,
                    editing: false
                }
            }

        case TodoActions.DELETE_TODO:
            {
                return {
                    ...state,
                    deleting: true
                }
            }

        case TodoActions.DELETE_TODO_SUCCESS:
            {
                return {
                    ...state,
                    deleting: false
                }
                
            }

        default:
            {
                return state;
            }
    }
}
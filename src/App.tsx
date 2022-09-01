import React, { useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import Todo from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// let name: string;
// let age: number | string;
// let isStudent: boolean;
// let hobbies: string[];
// let role: [number,string];


// type Person = {
//   name: string;
//   age?: number;
// };

// let person: Person = {
//   name: "Kazimir",
//   age: 27
// }

// let lotsOfPeople: Person[];

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  // console.log(todo);


  

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id:Date.now(), todo:todo, isDone: false}])
      setTodo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    // console.log(result);
    const {source, destination} = result;
    if(!destination) return;
    if(destination.droppableId===source.droppableId && destination.index === source.index) return;

    let add, active = todos, complete = completedTodos;

    if(source.droppableId === 'TodosList'){
      add = active[source.index];
      active.splice(source.index, 1);
    }else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId === 'TodosList'){
      active.splice(destination.index, 0, add);
    }else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);

  };

  // console.log(todos);

  

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="App">
        <span className='heading'>TODO APP</span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        {/* <TodoList /> */}
        {/* {todos.map((t) => (<li>{t.todo}</li>))} */}
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>

  );
}

export default App;

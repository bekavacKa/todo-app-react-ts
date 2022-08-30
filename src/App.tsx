import React, { useState } from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import Todo from './components/model';
import TodoList from './components/TodoList';

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
  // console.log(todo);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id:Date.now(), todo:todo, isDone: false}])
      setTodo("");
    }

  }

  console.log(todos);

  

  return (
    <div className="App">
      <span className='heading'>TASKS</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {/* <TodoList /> */}
      {/* {todos.map((t) => (<li>{t.todo}</li>))} */}
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;

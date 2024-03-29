import "./App.css";
import Header from "./component/Header.js";
import TodoEditor from "./component/TodoEditor.js";
import TodoList from "./component/TodoList.js";
import { useReducer, useRef } from "react";

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.newItem];
    }
    case "UPDATE": {
      return state.map((it) => {
        return it.id === action.targetId ? { ...it, isDone: !it.isDone } : it;
      });
    }
    case "DELETE": {
      return state.filter((it) => {
        return it.id !== action.targetId;
      });
    }
  }
  return state;
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(todo.length);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    dispatch({ type: "UPDATE", targetId });
  };

  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;

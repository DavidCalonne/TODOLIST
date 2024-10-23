import styles from "./page.module.css";
import AddTodo from "./components/addTodo";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div>
      <main>
        <h1>My Todo List</h1>
        <AddTodo />
        <TodoList />
      </main>
    </div>
  );
}

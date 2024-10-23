import styles from "./addTodo.module.css";

export default function AddTodo() {
  return (
    <form className={styles.form}>
      <input className={styles.input} type="text" name="todo-item" defaultValue="" />
      <button className={styles.button}>+</button>
    </form>
  );
}
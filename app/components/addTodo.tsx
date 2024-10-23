"use client";

import styles from "./addTodo.module.css";
import { useState } from "react";

export default function AddTodo({ onAdd }: { onAdd: (todo: string) => void }) {
  const [valueInput, setValueInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Fonction pour appeler l'API et ajouter la tâche
  async function addTodo() {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo: valueInput }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      onAdd(newTodo);  // Appelle onAdd pour mettre à jour la liste
    } else {
      const errorData = await response.json();
      setError(errorData.error);
    }
  }

  function onSubmit(e: any) {
    e.preventDefault();
    if (valueInput.length === 0) {
      setError("Please enter a todo item");
      return;
    } else {
      addTodo();
      setError("");
      setValueInput("");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        type="text"
        name="todo-item"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />
      <button className={styles.button}>+</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

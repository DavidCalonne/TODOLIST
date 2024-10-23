"use client"

import { useState, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  // Fonction pour récupérer les todos depuis l'API
  async function fetchTodos() {
    try {
      const response = await fetch('/api/todos', {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load todos');
        return;
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
    }
  }

  // useEffect pour charger les todos au démarrage
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fonction pour supprimer un todo
  async function deleteTodo(id: number) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete todo');
        return;
      }

      // Mise à jour de la liste des todos après suppression
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo} 
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

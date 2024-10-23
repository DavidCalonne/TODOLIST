import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Chemin vers ton fichier data.json
const dataFilePath = path.join(process.cwd(), 'app/data.json');

// Fonction pour lire le fichier JSON
function readTodos() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    
    // Si le fichier est vide, retourne un tableau vide
    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing data.json:', error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}

// Fonction pour écrire dans le fichier JSON
function writeTodos(todos: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2));
}

// Fonction pour trouver le premier ID disponible
function findAvailableId(todos: any[]): number {
  let id = todos.length + 1; // Commence avec la longueur + 1
  const usedIds = todos.map(todo => todo.id); // Liste des IDs utilisés
  // Incrémente l'ID tant qu'il est déjà utilisé
  while (usedIds.includes(id)) {id += 1}
  return id; // Retourne le premier ID disponible
}

// Route pour ajouter une nouvelle tâche
export async function POST(request: Request) {
  const { todo } = await request.json();

  if (!todo || todo.trim() === '') {
    return NextResponse.json({ error: 'Todo item is required' }, { status: 400 });
  }
  // Lire les données actuelles
  const todos = readTodos();
  // Trouver l'ID disponible
  const newId = findAvailableId(todos);
  // Créer une nouvelle tâche avec l'ID disponible
  const newTodo = { id: newId, finished: false, todo };
  // Ajouter la nouvelle tâche au tableau
  todos.push(newTodo);
  // Écrire les nouvelles données dans le fichier
  writeTodos(todos);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/").pop() || "", 10);
  
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
  
    // Lire les données actuelles
    const todos = readTodos();
  
    // Filtrer les tâches pour exclure celle à supprimer
    const updatedTodos = todos.filter((todo: any) => todo.id !== id);
  
    // Écrire les nouvelles données dans le fichier
    writeTodos(updatedTodos);
  
    return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
  }

// Route pour gérer les requêtes GET
export async function GET() {
    const todos = readTodos();
    return NextResponse.json(todos, { status: 200 });
}

interface TodoProps {
  id: number;
  todo: string;
  onDelete: (id: number) => void;
}

export default function Todo({ id, todo, onDelete }: TodoProps) {
  return (
    <div>
      <p>{todo}</p>
      <button onClick={() => onDelete(id)}>
        Supprimer
      </button>
    </div>
  );
}

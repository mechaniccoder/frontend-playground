import { useQuery } from '@tanstack/react-query';

const Todos = () => {
  const todos = useQuery(
    ['todos'],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return fetch('https://jsonplaceholder.typicode.com/todos').then((response) =>
        response.json(),
      );
    },
    { suspense: true },
  );

  return (
    <ul>
      {todos.data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default Todos;

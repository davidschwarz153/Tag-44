interface IToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then((todos:IToDo[]) => {
      todos.sort((a, b) => a.title.localeCompare(b.title));
  
      const todoList = document.getElementById('todo-list') as HTMLUListElement;
      const search = document.getElementById('search') as HTMLInputElement;
  
      const renderTodos = (filteredTodos: IToDo[]) => {
        todoList.innerHTML = '';
        filteredTodos.forEach(todo => {
          const li = document.createElement('li');
          li.textContent = todo.title;
          li.style.backgroundColor = todo.completed ? 'green' : 'red';
          todoList.appendChild(li);
        });
      };
  
      renderTodos(todos);
  
      search.addEventListener('input', () => {
        const searchTerm = search.value.toLowerCase();
        const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchTerm));
        renderTodos(filteredTodos);
      });
    })
    .catch(error => console.error('Error fetching todos:', error));



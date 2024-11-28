const todo = {
    todos: [], 

    action(e) {
        const target = e.target;
        if (target.classList.contains('todo__action')) {
            const action = target.dataset.todoAction;
            const elemItem = target.closest('.todo__item');
            const todoId = elemItem.dataset.todoId; 

            if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
                this.todos = this.todos.filter(todo => todo.id !== todoId);
                elemItem.remove();
            } else {
                const todoItem = this.todos.find(todo => todo.id === todoId);
                todoItem.state = action;
                todoItem.history = todoItem.history || [];

                const lexicon = {
                    active: 'восстановлено',
                    completed: 'завершено',
                    deleted: 'удалено'
                };

                todoItem.history.push({
                    action: lexicon[action],
                    datetime: new Date().toLocaleString()
                });

                this.renderTodoItem(elemItem, todoItem);
            }
            this.save();
        } else if (target.classList.contains('todo__add')) {
            this.add();
            this.save();
        }
    },

    add() {
        const elemText = document.querySelector('.todo__text');
        if (elemText.disabled || !elemText?.value?.length) {
            return;
        }

        const newTodo = {
            id: Date.now().toString(), 
            text: elemText.value,
            state: 'active',
            created: new Date().toLocaleString(),
            history: []
        };

        this.todos.push(newTodo);
        document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(newTodo));
        elemText.value = '';
    },

    create(todoItem) {
        return `<li class="todo__item" data-todo-state="${todoItem.state}" data-todo-id="${todoItem.id}">
            <span class="todo__task">
                ${todoItem.text}
                ${this.getTodoDate(todoItem)}
            </span>
            <span class="todo__action todo__action_restore" data-todo-action="active"></span>
            <span class="todo__action todo__action_complete" data-todo-action="completed"></span>
            <span class="todo__action todo__action_delete" data-todo-action="deleted"></span>
        </li>`;
    },

    getTodoDate(todoItem) {
        return `<time class="todo__date" datetime="${todoItem.created}">добавлено: ${todoItem.created}</time>`;
    },
    
    renderTodoItem(elemItem, todoItem) {
        elemItem.dataset.todoState = todoItem.state;
    },

    init() {
        const fromStorage = localStorage.getItem('todo');
        if (fromStorage) {
            try {
                this.todos = JSON.parse(fromStorage);
                const todoItems = this.todos.map(item => this.create(item)).join('');
                document.querySelector('.todo__items').innerHTML = todoItems;
            } catch (e) {
                console.error('Error parsing todos:', e);
                this.todos = [];
            }
        }
        document.querySelector('.todo__options').addEventListener('change', this.update.bind(this));
        document.addEventListener('click', this.action.bind(this));
    },
    update() {
        const option = document.querySelector('.todo__options').value;
        document.querySelector('.todo__items').dataset.todoOption = option;
        document.querySelector('.todo__text').disabled = option !== 'active';
    },
    save() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    },
};

todo.init();

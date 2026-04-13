// let todos = [
//     {id: 1, todo: "Học", deadLine: "26/3", status: "to do"},
//     {id: 2, todo: "Chơi", deadLine: "26/3", status: "pending"},
//     {id: 3, todo: "Làm", deadLine: "26/3", status: "to do"},
// ];

// localStorage.setItem("todos", JSON.stringify(todos));

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoInputElement = document.getElementById("todoInput")
const dateInputElement = document.getElementById("dateInput")
const statusInputElement = document.getElementById("statusInput")
const addBtn = document.getElementById("addBtn")

const searchInputElement = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const filterSelect = document.getElementById("filterSelect")

const errorTextElement = document.getElementById("errorText")
const todoListElement = document.getElementById("todoList")

function renderTodos() {
    todoListElement.innerHTML = "";
    todos.forEach(todo => {
        todoListElement.innerHTML += `
            <li>${todo.todo} - ${todo.deadLine} - ${todo.status} <button>Sửa</button> <button onclick = "deleteTodo">Xóa</button></li>
        `
    });
}

function addTodos() {
    const todoInput = todoInputElement.value;
    const dateInput = dateInputElement.value;
    const statusInput = statusInputElement.value;

    const newTodo = {
        todo: todoInput,
        deadLine: dateInput,
        status: statusInput,
        id: todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1
    }
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
}

function findTodo() {
    const findInput = searchInputElement.value;
    let findTodos = todos.filter(todo => todo.todo.includes(findInput));
    renderTodos(findTodos);
}

renderTodos(todos);
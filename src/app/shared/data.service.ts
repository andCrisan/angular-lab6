import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [ //date de umplutura, array obiecte
    // new Todo('acesta este un test', true),
    // new Todo(' Etiam ut viverra lorem. In et diam ut sapien efficitur imperdiet. Nunc faucibus nulla vel dolor hendrerit, et ullamcorper nibh venenatis. Donec sed massa lorem. Cras bibendum ex a rutrum fermentum.'),
  ]

  constructor() { }

  getAllTodos(){
    return this.todos;
  }

  addTodo(todo: Todo){
    this.todos.push(todo);
  }
  updateTodo(index: number, updatedTodo: Todo){
    this.todos[index] = updatedTodo;
  }
  deleteTodo(index: number){
    this.todos.splice(index, 1); //locatie, un deletecount, 1=  numar elemente de sters
  }
}

import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';

import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[]; //creat arr in service de componenta
  showValidationErrors: boolean;
  
  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos(); //injectam componenta cu val serv?
  }
  onFormSubmit(form: NgForm){ //importat mai sus formul din angular FOrms
    // console.log("Form submitted!"); //vedem in consola browser
    // console.log(form);

    //if(form.invalid) return alert("Colectarea spatiului e interzisa!");
    if(form.invalid) return this.showValidationErrors = true
    
    this.dataService.addTodo(new Todo(form.value.text));
    this.showValidationErrors = false;
    form.reset(); //resetare form, mesaj eroare
  }

  toggleCompleted(todo: Todo){
    todo.completed = !todo.completed;
  }
  editTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
     
    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.dataService.updateTodo(index, result)
      }
    })
  }

  deleteTodo(todo: Todo){
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }

}

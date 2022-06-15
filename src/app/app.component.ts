import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  toDoList: any = [];
  newTask: string = '';
  editIndex: number;
  today = new Date();
  headers = ['Task', 'Created'];

  ngOnInit() {
    this.toDoList = JSON.parse(localStorage.getItem('toDoItems')) || [];
  }
  addTask() {
    if (this.newTask !== '') {
      this.toDoList.push({
        Task: this.newTask,
        Created: this.today.toISOString().split('T')[0],
        status: 'todo',
      });
      this.newTask = '';
      this.setLocalStorage();
    }
  }
  clearToDO() {
    this.toDoList = [];
    localStorage.removeItem('toDoItems');
  }
  editItem(index) {
    this.editIndex = index;
  }
  updateTask() {
    this.editIndex = undefined;
    this.setLocalStorage();
  }
  editToDo(index) {
    return this.editIndex == index ? true : false;
  }
  completeTask(index) {
    this.toDoList[index].status = 'completed';
    this.setLocalStorage();
  }
  setLocalStorage() {
    localStorage.removeItem('toDoItems');
    localStorage.setItem('toDoItems', JSON.stringify(this.toDoList));
  }
  completedList() {
    return this.toDoList.filter((item) => item.status == 'completed');
  }
}

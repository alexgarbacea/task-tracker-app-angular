import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service'
import {Task} from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {//passing TaskService for use as this.

  }

  ngOnInit(): void {//fires off right on start
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));//subscribe to observable
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(() => 
    (this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)));
  }

  checkTasks() {
    return this.tasks.length > 0;
  }

}

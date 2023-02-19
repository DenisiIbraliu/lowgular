import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { NotifierService } from "src/app/shared/components/notifier/notifier.service";
import { environment } from "src/environments/environment";
import { Task, TeamMembers } from "../models";
import { base } from "@uploadcare/upload-client";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.baseUrl}/tasks`);
  }

  getAllTeamMembers(): Observable<TeamMembers[]> {
    return this.httpClient.get<TeamMembers[]>(
      `${environment.baseUrl}/team-members`
    );
  }

  createTask(newTask: Partial<Task>): Observable<Task> {
    return this.httpClient.post<Task>(`${environment.baseUrl}/tasks`, newTask);
  }

  updateTask(task: Partial<Task>): Observable<Task[]> {
    return this.httpClient.put<Task[]>(
      `${environment.baseUrl}/tasks/${task.id}`,
      task
    );
  }

  deleteTask(taskId: string): Observable<Task[]> {
    return this.httpClient.delete<Task[]>(
      `${environment.baseUrl}/tasks/${taskId}`
    );
  }

  getTask(taskId: string): Observable<Task> {
    return this.httpClient.get<Task>(`${environment.baseUrl}/tasks/${taskId}`);
  }

  async uploadTaskImage(image: any) {
    return await base(image, {
      publicKey: "0039043dda57caa15828",
    });
  }
}

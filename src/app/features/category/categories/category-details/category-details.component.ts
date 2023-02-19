import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, map } from "rxjs";
import { Task } from "src/app/features/tasks/models";
import { TasksService } from "src/app/features/tasks/services/tasks.service";
import { NotifierService } from "src/app/shared/components/notifier/notifier.service";
import { Category } from "../../models";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-category-details",
  templateUrl: "./category-details.component.html",
  styleUrls: ["./category-details.component.scss"],
})
export class CategoryDetailsComponent implements OnInit {
  category: Category;
  displayedColumns: string[] = [
    "image",
    "name",
    "categoryId",
    "team-members",
    "edit",
    "remove",
  ];

  dataSource = [] as Task[];

  constructor(
    private router: Router,
    private tasksService: TasksService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {
    this.getCategory();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getCategory(): void {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.category = this.router.getCurrentNavigation()?.extras
        .state as Category;
    } else {
      const id = this.route.snapshot.paramMap.get("categoryId") as string;
      this.categoryService.getCategory(id).subscribe({
        next: (data) => {
          this.category = data;
        },
        error: () => {
          this.notifierService.showNotification(
            "There was an error in getting category data. Please try later!",
            "OK",
            "error"
          );
        },
      });
    }
  }

  getTasks(): void {
    combineLatest([
      this.tasksService.getAllTasks(),
      this.tasksService.getAllTeamMembers(),
    ]).subscribe(([tasks, teamMembers]) => {
      this.dataSource = tasks
        .filter((task) => task.categoryId === this.category?.id)
        .map((task) => {
          if (task.teamMemberIds) {
            task.teamMembers = teamMembers.filter((member) =>
              task.teamMemberIds?.includes(member.id)
            );
          }
          return task;
        });
    });
  }

  handleTaskCreation(): void {
    this.router.navigateByUrl(`/tasks/create?categoryId=${this.category.id}`);
  }

  handleTaskEdit(task: Task): void {
    this.router.navigateByUrl(`/tasks/edit/${task.id}`, {
      state: task,
    });
  }

  handleTaskDelete(task: Task): void {
    this.tasksService.deleteTask(task.id).subscribe({
      next: () => {
        this.getTasks();
        this.notifierService.showNotification(
          "Task deleted successfully.",
          "OK",
          "success"
        );
      },
      error: () => {
        this.notifierService.showNotification(
          "There was an error in deleting task. Please try later!",
          "OK",
          "error"
        );
      },
    });
  }
}

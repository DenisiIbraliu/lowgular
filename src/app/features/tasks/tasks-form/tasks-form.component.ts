import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Subject, tap } from "rxjs";
import { NotifierService } from "src/app/shared/components/notifier/notifier.service";
import { Category } from "../../category/models";
import { CategoryService } from "../../category/services/category.service";
import { Task } from "../models";
import { TasksService } from "../services/tasks.service";

@Component({
  selector: "app-tasks-form",
  templateUrl: "./tasks-form.component.html",
  styleUrls: ["./tasks-form.component.scss"],
})
export class TasksFormComponent {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  categories$: Subject<Category[]> = new Subject();
  existingTask: Task;
  teamMembers$ = this.taskService.getAllTeamMembers();
  teamMemberIds: string[] = [];

  imageSrc = "";

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.taskForm = this.formBuilder.group({
      name: [null, Validators.required],
      categoryId: [null, Validators.required],
      teamMemberIds: [[]],
    });

    this.getSelectedCategory();
    this.getTask();
  }

  getTask(): void {
    const id = this.route.snapshot.paramMap.get("taskId");

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.existingTask = this.router.getCurrentNavigation()?.extras
        .state as Task;

      this.isEditMode = true;

      this.taskForm.patchValue({
        name: this.existingTask.name,
        categoryId: this.existingTask.categoryId,
        teamMemberIds: this.existingTask.teamMemberIds,
      });

      this.teamMemberIds = this.existingTask.teamMemberIds;
    } else if (id) {
      this.taskService.getTask(id).subscribe({
        next: (data) => {
          this.taskForm.patchValue({
            name: data.name,
            catgoryId: this.existingTask.categoryId,
          });
          this.isEditMode = true;
        },
        error: () => {
          this.notifierService.showNotification(
            "There was an error in getting Task data. Please try later!",
            "OK",
            "error"
          );
        },
      });
    }
  }

  handleSubmit(): void {
    if (this.taskForm.valid) {
      this.isEditMode ? this.editTask() : this.createNewTask();
    }
  }

  handleTeamMemeberSelect({ source }: MatCheckboxChange) {
    if (this.teamMemberIds.includes(source.value.toString())) {
      const index = this.teamMemberIds.indexOf(source.value);
      this.teamMemberIds.splice(index, 1);
    } else {
      this.teamMemberIds.push(source.value.toString());
    }

    this.taskForm.patchValue({ teamMemberIds: this.teamMemberIds });
  }

  getSelectedCategory(): void {
    this.categoryService
      .getAllCategories()
      .pipe(
        tap((data) => this.categories$.next(data)),
        map((data) =>
          data.filter(
            (el) => el.id === this.route.snapshot.queryParams["categoryId"]
          )
        )
      )
      .subscribe((data) => {
        if (data.length) {
          this.taskForm.patchValue({
            categoryId: data[0].id,
          });
        }
      });
  }

  async createNewTask(): Promise<void> {
    let imageUrl;
    if (this.imageSrc) {
      imageUrl = await this.taskService.uploadTaskImage(this.imageSrc);
    }

    const newTask = {
      ...this.taskForm.value,
      imageUrl:
        imageUrl && imageUrl.file
          ? `https://ucarecdn.com/${imageUrl.file}/`
          : undefined,
    };

    this.taskService.createTask(newTask).subscribe({
      next: () => {
        this.notifierService.showNotification(
          "Task created successfully.",
          "OK",
          "success"
        );
        this.router.navigate([
          `/categories/${this.taskForm.value["categoryId"]}`,
        ]);
      },
      error: () => {
        this.notifierService.showNotification(
          "There was an error in saving category data. Please try later!",
          "OK",
          "error"
        );
      },
    });
  }

  async editTask(): Promise<void> {
    let imageUrl;
    if (this.imageSrc) {
      imageUrl = await this.taskService.uploadTaskImage(this.imageSrc);
    }

    const task: Partial<Task> = {
      categoryId: this.taskForm.value["categoryId"],
      name: this.taskForm.value["name"],
      id: this.existingTask.id,
      teamMemberIds: this.taskForm.value["teamMemberIds"],
      imageUrl:
        imageUrl && imageUrl.file
          ? `https://ucarecdn.com/${imageUrl.file}/`
          : undefined,
    };

    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.notifierService.showNotification(
          "Category updated successfully.",
          "OK",
          "success"
        );
        this.router.navigate([
          `/categories/${this.taskForm.value["categoryId"]}`,
        ]);
      },
      error: () => {
        this.notifierService.showNotification(
          "There was an error in saving category data. Please try later!",
          "OK",
          "error"
        );
      },
    });
  }

  handleTaskImageUpload(data: { file: string }) {
    this.imageSrc = data.file;
  }
}

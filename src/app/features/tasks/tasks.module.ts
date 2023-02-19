import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { TasksFormComponent } from "./tasks-form/tasks-form.component";
import { TasksRoutingModule } from "./tasks-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [TasksFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TasksModule {}

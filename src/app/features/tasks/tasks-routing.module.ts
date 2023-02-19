import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksFormComponent } from "./tasks-form/tasks-form.component";

const routes: Routes = [
  {
    path: "create",
    component: TasksFormComponent,
  },
  {
    path: "edit/:taskId",
    component: TasksFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}

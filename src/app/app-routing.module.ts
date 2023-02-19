import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./features/category/category.module").then(
        (mod) => mod.CategoryModule
      ),
  },
  {
    path: "tasks",
    loadChildren: () =>
      import("./features/tasks/tasks.module").then((mod) => mod.TasksModule),
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

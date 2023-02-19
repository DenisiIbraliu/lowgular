import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesFormComponent } from "./categories/categories-form/categories-form.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryDetailsComponent } from "./categories/category-details/category-details.component";

const routes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
  },
  {
    path: "categories/create",
    component: CategoriesFormComponent,
  },
  {
    path: "categories/edit/:categoryId",
    component: CategoriesFormComponent,
  },
  {
    path: "categories/:categoryId",
    component: CategoryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}

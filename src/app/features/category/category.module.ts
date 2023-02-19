import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryRoutingModule } from "./category-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoriesFormComponent } from "./categories/categories-form/categories-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoryDetailsComponent } from "./categories/category-details/category-details.component";

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesFormComponent,
    CategoryDetailsComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CategoryModule {}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "src/app/shared/components/notifier/notifier.service";
import { Category } from "../../models";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-categories-form",
  templateUrl: "./categories-form.component.html",
  styleUrls: ["./categories-form.component.scss"],
})
export class CategoriesFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode: boolean = false;
  existingCategory: Category;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
    this.getCategory();
  }

  ngOnInit(): void {}

  handleSubmit(): void {
    if (this.categoryForm.valid) {
      this.isEditMode ? this.editCategory() : this.createNewCategory();
    }
  }

  getCategory(): void {
    const id = this.route.snapshot.paramMap.get("categoryId") as string;
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.existingCategory = this.router.getCurrentNavigation()?.extras
        .state as Category;

      this.isEditMode = true;

      this.categoryForm.patchValue({ name: this.existingCategory.name });
    } else if (id) {
      this.categoryService.getCategory(id).subscribe({
        next: (data) => {
          this.existingCategory = data;
          this.categoryForm.patchValue({ name: this.existingCategory.name });
          this.isEditMode = true;
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

  createNewCategory(): void {
    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.notifierService.showNotification(
          "Category saved successfully.",
          "OK",
          "success"
        );

        this.router.navigate(["/"]);
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

  editCategory(): void {
    this.categoryService
      .updateCategory(this.existingCategory.id, this.categoryForm.value)
      .subscribe({
        next: () => {
          this.notifierService.showNotification(
            "Category updated successfully.",
            "OK",
            "success"
          );

          this.router.navigate(["/"]);
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
}

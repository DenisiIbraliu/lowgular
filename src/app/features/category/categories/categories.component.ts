import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map, shareReplay } from "rxjs";
import { LoaderService } from "src/app/shared/components/loader/loader.service";
import { Category } from "../models";
import { CategoryService } from "../services/category.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categories$ = this.categoryService.getAllCategories().pipe(shareReplay(1));

  filterOptions = [
    {
      label: "A-Z",
      value: "asc",
    },
    {
      label: "Z-A",
      value: "desc",
    },
  ];

  constructor(
    private categoryService: CategoryService,
    public loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleCategoryCreation(): void {
    this.router.navigateByUrl("/categories/create");
  }

  handleCategoryUpdate(category: Category): void {
    this.router.navigateByUrl(`/categories/edit/${category.id}`, {
      state: category,
    });
  }

  handleCategorySelect(category: Category): void {
    this.router.navigateByUrl(`/categories/${category.id}`, {
      state: category,
    });
  }

  handleCategorySort(sortBy: string) {
    this.categories$ = this.categories$.pipe(
      map((categories) =>
        categories.sort((a, b) => {
          if (sortBy === "desc") {
            return b.name.localeCompare(a.name);
          }
          return a.name.localeCompare(b.name);
        })
      )
    );
  }
}

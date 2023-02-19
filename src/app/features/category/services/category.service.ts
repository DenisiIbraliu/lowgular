import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, Subject } from "rxjs";
import { NotifierService } from "src/app/shared/components/notifier/notifier.service";
import { environment } from "src/environments/environment";
import { Category } from "../models";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private categories: Subject<Category[]> = new Subject();

  categories$ = this.categories.asObservable();

  constructor(
    private httpClient: HttpClient,
    private notifierService: NotifierService
  ) {}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(`${environment.baseUrl}/categories`)
      .pipe(
        catchError(() => {
          this.notifierService.showNotification(
            "There was a problem trying to fetch the data. Please try later!",
            "Ok",
            "error"
          );
          return of([]);
        })
      );
  }

  createCategory(category: Partial<Category>): Observable<Category[]> {
    return this.httpClient.post<Category[]>(
      `${environment.baseUrl}/categories`,
      category
    );
  }

  updateCategory(categoryId: string, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${environment.baseUrl}/categories/${categoryId}`,
      category
    );
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.httpClient.get<Category>(
      `${environment.baseUrl}/categories/${categoryId}`
    );
  }
}

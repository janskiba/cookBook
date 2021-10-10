import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { DataStorageService } from './data-storage.service';
import { Recipe } from './recipe.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataStorageService', () => {
  let service: DataStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataStorageService]
    });
    service = TestBed.inject(DataStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('be able to get posts from api via GET', () => {
    const recipes: Recipe[] = [{
      _id: '1',
      name: 'test',
      preparationTime: 40,
      description: 'Testing Angular Service',
      ingredients: [{
        _id: '1',
        name: 'test',
        quantity: '1 cup'
      }]
    }, {
      _id: '2',
      name: 'test',
      preparationTime: 40,
      description: 'Testing Angular Service',
      ingredients: [{
        _id: '1',
        name: 'test',
        quantity: '1 cup'
      }]
    }];

    service.getRecipes().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(recipes);
    });

    const request = httpMock.expectOne(`${service.apiUrl}?X-API-KEY=HoA`);
    expect(request.request.method).toBe('GET');
    request.flush(recipes);
  });
});

import { TestBed } from '@angular/core/testing';

import { ElementsService } from './elements.service';

describe('ElementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementsService = TestBed.get(ElementsService);
    expect(service).toBeTruthy();
  });
});

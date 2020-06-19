import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Pipe({
  name: 'obsWithStatus',
})
export class ObsWithStatus implements PipeTransform {
  transform(val) {
    return isObservable(val)
      ? val.pipe(
        map(value => ({ loading: false, value })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : val;
  }
}

import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PeriodicElement } from '@interfaces/periodic-element';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  private elementsCollection: AngularFirestoreCollection<PeriodicElement>;
  elements: Observable<PeriodicElement[]>;

  constructor(private afs: AngularFirestore) {
    this.elementsCollection = afs.collection<PeriodicElement>('elements');
    this.elements = this.elementsCollection.valueChanges();
  }

  getElements() {
    return this.elements;
  }

  addElement(element: PeriodicElement) {
    this.elementsCollection.add(element);
  }
}

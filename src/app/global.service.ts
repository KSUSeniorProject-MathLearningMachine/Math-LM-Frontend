import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  nativeGlobal() {
    return window;
  }
}

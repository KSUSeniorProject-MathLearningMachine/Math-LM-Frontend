import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MathLearningMachineApiService {
  constructor(private httpClient: HttpClient) { }

  solveImage(imageData: string): Observable<any> {
    return this.httpClient.post('/solve-image', { b64_img: imageData.substring(22) });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iSolved, iSolvedImage } from '../../interfaces/home-page.interface';

@Injectable({
  providedIn: 'root',
})
export class MathLearningMachineApiService {
  constructor(private httpClient: HttpClient) {}

  solveImage(imageData: string): Observable<iSolvedImage> {
    return this.httpClient.post<iSolvedImage>('/solve-image', {
      b64_img: imageData,
    });
  }

  solveLatex(latex: string): Observable<iSolved> {
    return this.httpClient.post<iSolved>('/solve-latex', {
      latex,
    });
  }
}

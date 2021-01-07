import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SentimentResult } from './sentiment';

@Injectable({
  providedIn: 'root'
})
export class CognitiveService {
  constructor(private httpClient: HttpClient) { }

  sentiment(text: string): Observable<string> {
    return this.getSentiment(text).pipe(
      map(sentimentResult => sentimentResult.documents[0].sentiment)
    );
  }

  private getSentiment(text: string): Observable<SentimentResult> {
    const body = {
      documents: [{
        language: 'en',
        id: '1',
        text: text
      }]
    };

    return this.httpClient.post<SentimentResult>(
      `${environment.cognitiveUrl}/text/analytics/v3.0/sentiment`,
      body,
      { headers: {'Ocp-Apim-Subscription-Key': environment.cognitiveKey } });
  }
}

import { cognitiveenv } from './cognitive.environment';

export const environment = {
  production: false,
  hnApi: 'https://hacker-news.firebaseio.com/v0',
  hnWeb: 'https://news.ycombinator.com',
  ...cognitiveenv
};

/*
content of cognitive.environment.ts:

export const cognitiveenv = {
  cognitiveKey: '',
  cognitiveUrl: ''
}
*/

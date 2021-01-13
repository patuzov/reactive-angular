# Reactive Angular
A practical example of Reactive Programming in Angular using RxJs. 

The demo shows top 20 Hacker News stories and allows filtering only positive news using Azure Cognitive Services. 

Explanation in details in this [medium article](https://medium.com/@paveltuzov/reactive-angular-b7914b0190f5)

## Running the code
A file named `cognitive.environment.ts` with the following export is expected to be in the `/src/environments` folder:

```js
export const cognitiveenv = {
  cognitiveKey: '',
  cognitiveUrl: ''
}
```

It will contain the url and the key for the Azure Cognitive Services. I surely didn't include mine in the repository.

If you want to run the code without the sentiment analysis of the title, comment out the corresponding step (mergeMap calling the cognitive service) in the pipeline from the _StoryService_. You'll have to create the `cognitive.environment.ts` file anyway, though.

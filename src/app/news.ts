export class News {
    constructor(hackerNews: any) {
        this.title = hackerNews.title;
        this.type = hackerNews.type;
        this.url = hackerNews.url;
        this.comments = hackerNews.kids;
    }

    title: string;
    type: string;
    url: string;
    discussion: string;
    comments: string[];
    sentiment: string;
}
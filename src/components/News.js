import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    console.log("constructor from news componenet");
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?q=tesla&from=2022-05-30&sortBy=publishedAt&apiKey=b78287b9eefe4d358e0295647cb85498&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    });
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-05-30&sortBy=publishedAt&apiKey=b78287b9eefe4d358e0295647cb85498&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("Next");
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    });
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {
    }
    else {
      let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-05-30&sortBy=publishedAt&apiKey=b78287b9eefe4d358e0295647cb85498&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Areena - Top Hedalines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="conatiner d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

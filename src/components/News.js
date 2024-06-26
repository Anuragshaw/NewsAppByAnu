import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async (pageNo) => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      props.setProgress(40);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles || []);  // Ensure articles is an array
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Failed to fetch news articles:", error);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  }

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles || []));  // Ensure articles is an array
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Failed to fetch more news articles:", error);
    }
  }

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0', marginTop: '70px' }}>NewsApp - Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return <div className="col-md-4" key={index}>
                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 150) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
}

export default News

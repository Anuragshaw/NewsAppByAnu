import React from 'react';

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            <div className="card h-100">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '88%', zIndex: '1' }}>{source}</span>
                <img src={!imageUrl ? "https://tse4.mm.bing.net/th?id=OIP.ewDa2eI464u8oj34rL7XlgHaE7&pid=Api&P=0" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text mt-auto"><small className="text-body-secondary"><strong> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</strong></small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm mt-auto">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;


import React from 'react';

const NewsResult = ({ newsData }) => {
  if (!newsData || newsData.length === 0) return null;
  
  return (
    <div className="news-card">
      {newsData.map((article, index) => (
        <div key={index} className="news-item">
          <div className="news-title">{article.title}</div>
          <div className="news-description">{article.description}</div>
          <div className="news-meta">
            <span className="news-source">{article.source}</span>
            <span className="news-time">{article.publishedAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsResult;

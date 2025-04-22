
import React from 'react';
import { NewsArticle } from '@/services/newsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NewsResultProps {
  newsData: NewsArticle[];
}

const NewsResult: React.FC<NewsResultProps> = ({ newsData }) => {
  return (
    <Card className="mt-4 news-result p-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4">
        <CardTitle>Latest News Headlines</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {newsData.map((article, index) => (
            <li key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
              <h4 className="font-medium text-base mb-1">{article.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{article.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{article.source}</span>
                <span>{article.publishedAt}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NewsResult;

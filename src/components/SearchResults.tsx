
import React from 'react';
import { SearchResult } from '@/services/searchService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SearchResultsProps {
  searchData: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchData }) => {
  return (
    <Card className="mt-4 search-result p-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white p-4">
        <CardTitle>Search Results</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {searchData.map((result, index) => (
            <li key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
              <h4 className="font-medium text-base mb-1">{result.title}</h4>
              <p className="text-sm text-gray-600">{result.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SearchResults;

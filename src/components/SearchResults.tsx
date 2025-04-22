
import React from 'react';
import { SearchResult } from '@/services/searchService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

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
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
              >
                <h4 className="font-medium text-base mb-1 text-primary group-hover:text-primary/80 flex items-center gap-2">
                  {result.title}
                  <ExternalLink size={16} className="inline-block opacity-50 group-hover:opacity-100" />
                </h4>
                <p className="text-sm text-gray-600">{result.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SearchResults;

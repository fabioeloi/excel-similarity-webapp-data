import React from 'react';

interface ResultItem {
  search: string;
  match: string;
  score: number;
}

interface Props {
  results: ResultItem[];
}

const ResultsTable: React.FC<Props> = ({ results }) => {
  if (results.length === 0) {
    return <p className="text-gray-500 mt-4">No results found.</p>;
  }
  const LOW_SIM_THRESHOLD = 0.5;
  const lowSimItems = results.filter(r => r.score < LOW_SIM_THRESHOLD);

  return (
    <div className="mt-4">
      {lowSimItems.length > 0 && (
        <p className="text-yellow-600 mb-2">
          Warning: {lowSimItems.length} result(s) have low similarity
        </p>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Search</th>
            <th className="py-2 px-4 border">Match</th>
            <th className="py-2 px-4 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td className="py-2 px-4 border">{r.search}</td>
              <td className="py-2 px-4 border">{r.match}</td>
              <td className="py-2 px-4 border">{(r.score * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;

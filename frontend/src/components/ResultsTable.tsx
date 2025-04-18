import React from 'react';

interface ResultItem {
  search: string;
  match: string;
  score: number;
}

interface Props {
  results: ResultItem[];
}

const ResultsTable: React.FC<Props> = ({ results }) => (
  <table className="min-w-full bg-white mt-4">
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
);

export default ResultsTable;

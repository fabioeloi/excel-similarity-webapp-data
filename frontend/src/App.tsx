import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ResultsTable from './components/ResultsTable';
import './index.css';

function App() {
  const [results, setResults] = useState<any[]>([]);
  const [downloadLink, setDownloadLink] = useState<string>('');

  const handleResults = (res: any[], link: string) => {
    setResults(res);
    setDownloadLink(link);
  };

  return (
    <div className="p-4">
      <UploadForm onResults={handleResults} />
      {results.length > 0 && (
        <>
          <ResultsTable results={results} />
          <a
            href={downloadLink}
            className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded"
            download
          >
            Download Results
          </a>
        </>
      )}
    </div>
  );
}

export default App;

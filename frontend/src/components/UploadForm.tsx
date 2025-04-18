import React, { useState } from 'react';
import { uploadFile, processFile, downloadUrl } from '../services/api';

interface Props {
  onResults: (results: any[], downloadLink: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UploadForm: React.FC<Props> = ({ onResults }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    if (!file.name.endsWith('.xlsx')) {
      setError('Only .xlsx files are supported');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File must be smaller than 5MB');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const uploadRes = await uploadFile(file);
      const fileId = uploadRes.data.file_id;
      const processRes = await processFile(fileId);
      const { result_id, results } = processRes.data;
      const link = downloadUrl(result_id);
      onResults(results, link);
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow w-full max-w-md">
      <input
        type="file"
        accept=".xlsx"
        aria-label="Upload file"
        onChange={e => {
          setFile(e.target.files?.[0] || null);
          setError('');
        }}
        className="mb-4"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Processing...
          </>
        ) : 'Upload & Process'}
      </button>
    </form>
  );
};

export default UploadForm;

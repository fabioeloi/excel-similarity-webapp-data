// API service using fetch

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:8000/upload/', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return { data };
};

export const processFile = async (fileId: string) => {
  const response = await fetch('http://localhost:8000/process/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file_id: fileId }),
  });
  const data = await response.json();
  return { data };
};

export const downloadUrl = (resultId: string) =>
  `http://localhost:8000/download/${resultId}`;

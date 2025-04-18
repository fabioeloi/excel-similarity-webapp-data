import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import UploadForm from '../UploadForm';
import * as api from '../../services/api';

describe('UploadForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows error if no file selected', async () => {
    const onResults = jest.fn();
    render(<UploadForm onResults={onResults} />);
    const button = screen.getByRole('button', { name: /upload & process/i });
    fireEvent.click(button);
    expect(await screen.findByText(/please select a file/i)).toBeInTheDocument();
    expect(onResults).not.toHaveBeenCalled();
  });

  it('calls onResults on successful upload', async () => {
    const mockUpload = jest.spyOn(api, 'uploadFile').mockResolvedValue({ data: { file_id: '123' } } as any);
    const resultsData = [{ search: 'apple', match: 'apple', score: 1 }];
    const mockProcess = jest.spyOn(api, 'processFile').mockResolvedValue({ data: { result_id: '123_result', results: resultsData } } as any);
    const onResults = jest.fn();
    render(<UploadForm onResults={onResults} />);

    const file = new File(['dummy'], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const input = screen.getByLabelText(/upload file/i) || screen.getByRole('textbox', { hidden: true });
    // Use input[type=file]
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    const button = screen.getByRole('button', { name: /upload & process/i });
    fireEvent.click(button);

    await waitFor(() => expect(onResults).toHaveBeenCalledWith(resultsData, expect.any(String)));
    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(mockProcess).toHaveBeenCalledTimes(1);
  });
});

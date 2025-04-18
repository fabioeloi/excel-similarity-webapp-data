import pandas as pd
import pytest
from app.domains.upload.file_storage import FileStorage

def test_write_and_read(tmp_path):
    # Prepare sample DataFrame
    df = pd.DataFrame({'A': [1, 2], 'B': ['x', 'y']})
    file_path = tmp_path / "test.xlsx"
    # Write and read back
    FileStorage.write(df, str(file_path))
    df_read = FileStorage.read(str(file_path))
    # Validate round-trip equality
    pd.testing.assert_frame_equal(df, df_read)

import pandas as pd

class FileStorage:
    @staticmethod
    def read(path: str) -> pd.DataFrame:
        """Read Excel file into DataFrame."""
        return pd.read_excel(path)

    @staticmethod
    def write(df: pd.DataFrame, path: str) -> None:
        """Write DataFrame to Excel file."""
        df.to_excel(path, index=False)

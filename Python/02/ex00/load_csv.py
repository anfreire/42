import pandas as pd


def load(path: str) -> pd.DataFrame:
    """Load a dataset from a csv file

    Args:
        path (str): path to the csv file

    Returns:
        pd.DataFrame: the dataset
    """
    try:
        return pd.read_csv(path)
    except Exception as e:
        print(f"Error: {e.args[-1:][0]}")
        return None


def main():
    pass


if __name__ == "__main__":
    main()

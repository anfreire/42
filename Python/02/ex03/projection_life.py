from load_csv import load
import pandas as pd
import matplotlib.pyplot as plt


def normalize(df: pd.DataFrame) -> pd.DataFrame:
    """Normalizes the dataframe
    - Sets the index to "country"
    - Transposes the dataframe
    - Selects the row with the index "1900"

    Args:
        df (pd.DataFrame): The dataframe to normalize

    Returns:
        pd.DataFrame: The normalized dataframe
    """
    df.set_index("country", inplace=True)
    df = df.transpose()
    df = df.loc["1900"]
    return df


def main():
    """Main function
    - Loads the data
    - Normalizes the data
    - Makes a relation between the two dataframes, using the scatter plot
    - Sets the title, x, y labels and the ticks
    - Applies the log scale to the x axis, so the data is more readable
    """
    income = load("income_per_person_gdppercapita_ppp_inflation_adjusted.csv")
    life = load("life_expectancy_years.csv")
    if income is None or life is None:
        return
    income = normalize(income)
    life = normalize(life)
    plt.scatter(income, life)
    plt.title("1900")
    plt.xlabel("Gross domestic product")
    plt.ylabel("Life expectancy")
    plt.xscale("log")
    plt.xticks([300, 1 * 1e3, 10 * 1e3], ["300", "1k", "10k"])
    plt.show()


if __name__ == "__main__":
    main()

from matplotlib import pyplot as plt
from matplotlib import ticker
from load_csv import load


def convert_to_float(value: str) -> float:
    """Convert the reded value from the csv file to a float

    Args:
        value (str): the string to convert

    Returns:
        float: the converted value
    """
    if "B" in value:
        return float(value.replace("B", "")) * 1e9
    elif "M" in value:
        return float(value.replace("M", "")) * 1e6
    elif "k" in value:
        return float(value.replace("k", "")) * 1e3
    else:
        return float(value)


def convert_to_string(value: float, pos: int) -> str:
    """Convert the value parsed back to the original format

    Args:
        value (float): the value to convert
        pos (int): the position of the value

    Returns:
        str: the converted value
    """
    if value >= 1e9:
        return f"{value / 1e9:.0f}B"
    elif value >= 1e6:
        return f"{value / 1e6:.0f}M"
    elif value >= 1e3:
        return f"{value / 1e3:.0f}k"
    else:
        return f"{value:.0f}"


def main():
    """Main function
    - Load the dataset
    - Convert the data to float
    - Set the index to "country"
    - Transpose the dataframe
    - Select the columns with the countrys
    - Plot the data
    """
    countrys = ["Portugal", "Belgium"]
    df = load("population_total.csv")
    if df is None:
        return
    df.set_index("country", inplace=True)
    df = df.map(convert_to_float)
    df = df.transpose()
    df = df.loc["1800":"2050"]
    df = df[countrys]
    df.index = df.index.map(int)
    df.plot()
    plt.title("Population Projections")
    plt.xlabel("Year")
    plt.ylabel("Population")
    plt.xticks(range(1800, 2050, 40))
    plt.legend(loc="lower right")
    plt.gca().yaxis.set_major_locator(plt.MaxNLocator(3))
    plt.gca().yaxis.set_major_formatter(
        ticker.FuncFormatter(convert_to_string)
        )
    plt.show()


if __name__ == "__main__":
    main()

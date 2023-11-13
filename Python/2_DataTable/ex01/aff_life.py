from matplotlib import pyplot as plt
from load_csv import load


def main():
    """Main function
    - Load the dataset
    - Normalize the dataset
    - Selects the data for the country, in this case Portugal
    - Plot the dataset
    """
    country = "Portugal"
    df = load("life_expectancy_years.csv")
    if df is None:
        return
    df.set_index("country", inplace=True)
    df = df.transpose()
    df = df[country]
    df.index = df.index.map(int)
    df.plot()
    plt.xticks(range(1800, 2081, 40))
    plt.title(f"{country} Life expectancy Projections")
    plt.xlabel("Year")
    plt.ylabel("Life expectancy")
    plt.show()


if __name__ == "__main__":
    main()

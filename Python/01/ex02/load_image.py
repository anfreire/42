import matplotlib.pyplot as plt
import numpy as np


class Array42:
    """Class to represent a numpy array with a custom __str__ method"""

    def __init__(self, array: np.ndarray):
        '''Class constructor

        Args:
            array (np.ndarray): Numpy array to be represented
        '''
        self.array = array
        self.print_rows = 3

    def __str__(self) -> str:
        '''Returns a string representation of the class

        Returns:
            str: String representation of the class
        '''
        if len(self.array) == 0:
            return "Empty array"
        rows = str(self.array).split("\n")
        return (
            "\n".join(rows[: self.print_rows])
            + "\n  ...\n"
            + "\n".join(rows[-self.print_rows:])
        )

    def set_print_rows(self, rows: int) -> None:
        '''Sets the number of edges rows to be printed

        Args:
            rows (int): Number of rows to be printed
        '''
        self.print_rows = rows


def ft_load(path: str) -> Array42:
    '''Loads an image from a file and returns a Array42 object

    Args:
        path (str): Path to the image file

    Returns:
        Array42: Array42 object with the image
    '''
    try:
        img = plt.imread(path)
    except Exception as e:
        if isinstance(e, FileNotFoundError):
            print("Error: File not found")
        else:
            print("Error: File not supported")
        return Array42(np.array([]))
    print(f"The shape of image is {img.shape}")
    array = Array42(img)
    return array


def main():
    pass


if __name__ == "__main__":
    main()

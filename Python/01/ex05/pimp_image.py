from load_image import Array42
import numpy as np


def ft_invert(array: Array42) -> None:
    """Inverts the color of the image received."""
    if len(array.array) == 0:
        return
    new_array = np.copy(array.array)
    new_array[:, :, :1] = 255 - new_array[:, :, :1]
    new_array[:, :, 1:2] = 255 - new_array[:, :, 1:2]
    new_array[:, :, 2:] = 255 - new_array[:, :, 2:]
    array.array = new_array


def ft_red(array: Array42) -> None:
    """Applies a red filter to the image"""
    if len(array.array) == 0:
        return
    new_array = np.copy(array.array)
    new_array[:, :, 1:2] = 0
    new_array[:, :, 2:] = 0
    array.array = new_array


def ft_green(array: Array42) -> None:
    """Applies a green filter to the image"""
    if len(array.array) == 0:
        return
    new_array = np.copy(array.array)
    new_array[:, :, :1] = 0
    new_array[:, :, 2:] = 0
    array.array = new_array


def ft_blue(array: Array42) -> None:
    """Applies a blue filter to the image"""
    if len(array.array) == 0:
        return
    new_array = np.copy(array.array)
    new_array[:, :, :1] = 0
    new_array[:, :, 1:2] = 0
    array.array = new_array


def ft_grey(array: Array42) -> None:
    """Applies a grey filter to the image"""
    if len(array.array) == 0:
        return
    new_array = np.copy(array.array)
    new_array[:, :, 1:2] = new_array[:, :, 1:2]
    new_array[:, :, 0:1] = new_array[:, :, 1:2]
    new_array[:, :, 2:] = new_array[:, :, 1:2]
    array.array = new_array


def main():
    pass


if __name__ == "__main__":
    main()

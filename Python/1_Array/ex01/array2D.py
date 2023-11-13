def check_types(container: list) -> bool:
    '''Check if all elements in a list are integers or floats

    Args:
        container (list): List to check

    Returns:
        bool: True if all elements are integers or floats, False otherwise
    '''
    return isinstance(container, list) and \
        all(isinstance(row, list) for row in container)


def check_sizes(container: list) -> bool:
    '''Check if all rows in a 2D list have the same size

    Args:
        container (list): List to check

    Returns:
        bool: True if all rows have the same size, False otherwise
    '''
    row_len = len(container[0])
    return all(len(row) == row_len for row in container)


def slice_me(family: list, start: int, end: int) -> list:
    '''Slice a 2D list

    Args:
        family (list): The 2D list to slice
        start (int): The start index
        end (int): The end index

    Returns:
        list: The sliced 2D list
    '''
    if not check_types(family):
        print('Error: Variable is not a 2D list')
        return []
    elif not check_sizes(family):
        print('Error: Lists are not the same size')
        return []
    elif not isinstance(start, int) or not isinstance(end, int):
        print('Error: start or end are not integers')
        return []
    print(f"My shape is : ({len(family)}, {len(family[0])})")
    family = family[start:end]
    print(f"My new shape is : ({len(family)}, {len(family[0])})")
    return family


def main():
    pass


if __name__ == "__main__":
    main()

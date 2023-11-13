def check_types(container: list[any]) -> bool:
    '''Check if all elements in a list are integers or floats

    Args:
        container (list[any]): List to check

    Returns:
        bool: True if all elements are integers or floats, False otherwise
    '''
    return isinstance(container, list) \
        and all([True
                if isinstance(x, int) or isinstance(x, float)
                else False
                for x in container])


def check_size(container1: list[int | float], container2: list[int | float]) \
        -> bool:
    '''Check if two lists have the same size

    Returns:
        bool: Description of return value(s).
    '''
    return len(container1) == len(container2)


def check_values(container: list[int | float]) -> bool:
    '''Check if all elements in a list are positive

    Args:
        container (list[int  |  float]): List to check

    Returns:
        bool: True if all elements are positive, False otherwise
    '''
    return not any([True if x <= 0 else False for x in container])


def calculate_bmi(height: int | float, weight: int | float) -> int | float:
    '''Calculate the BMI of a person

    Args:
        height (int | float): The height of the person
        weight (int | float): The weight of the person

    Returns:
        int | float: The BMI of the person
    '''
    return weight / pow(height, 2)


def give_bmi(height: list[int | float], weight: list[int | float]) \
        -> list[int | float]:
    '''Calculate the BMI of a list of people

    Returns:
        list[int | float]: The BMI of the people
    '''
    if not check_size(height, weight):
        print('Error: Lists dont have the same size.')
        return []
    elif not check_types([*height, *weight]):
        print('Error: Arguments are not integers neither floats')
        return []
    elif not check_values([*height, *weight]):
        print('Error: Arguments have 0 or a negative number')
        return []
    return [calculate_bmi(x, y) for x, y in zip(height, weight)]


def apply_limit(bmi: list[int | float], limit: int) -> list[bool]:
    '''Apply a limit to a list of BMI

    Args:
        bmi (list[int  |  float]): List of BMI
        limit (int): Limit to apply

    Returns:
        list[bool]: List of booleans
    '''
    if not check_types([*bmi, limit]):
        print('Error: Arguments are not integers neither floats')
        return []
    elif not check_values([*bmi, limit]):
        print('Error: Arguments have 0 or a negative number')
        return []
    return [True if x > limit else False for x in bmi]


def main():
    pass


if __name__ == "__main__":
    main()

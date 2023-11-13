import sys


def get_types() -> dict:
    """Returns a dictionary of functions that check if a character is of a
    certain type.

    Returns:
        dict: A dictionary of functions that check if a character is of a
        certain type.
    """
    return {
        "upper letters": lambda char: char.isupper(),
        "lower letters": lambda char: char.islower(),
        "punctuation marks": lambda char: ord(char) >= 33 and ord(char) <= 47,
        "spaces": lambda char: char.isspace() or char == "\r",
        "digits": lambda char: char.isdigit(),
    }


def print_n_chars(text: str, key: str) -> None:
    """Prints the number of characters of a certain type in a text.

    Args:
        text (str): The text to count the characters of a certain type.
        key (str): The key of the dictionary of functions that check if a
        character is of a certain type.
    """
    count = sum(1 for char in text if get_types()[key](char))
    print(f"{count} {key}")


def main():
    """Main function of the program.

    Description:
        The program counts the number of characters of a certain type in a
        text. The user can provide the text as an argument of the program.
        If no argument is provided, the program asks the user to input the
        text.
    """
    if len(sys.argv) > 2:
        print("AssertionError: more than one argument is provided")
        return
    text = input("What is the text to count?\n") if len(sys.argv) == 1 \
        else sys.argv[1]
    print(f"The text contains {len(text)} characters:")
    [print_n_chars(text, key) for key in get_types().keys()]


if __name__ == "__main__":
    main()

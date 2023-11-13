import sys


def check_text(text: str) -> bool:
    """Checks if the text is valid

    Args:
        text (str): text to check

    Returns:
        bool: True if the text is valid, False otherwise
    """
    return all([1 if char.isspace() or char.isalnum() else 0 for char in text])


def get_morse_code() -> dict:
    """Gets the morse code dictionary

    Returns:
        dict: morse code
    """
    return {
        " ": "/",
        "A": ".-",
        "B": "-...",
        "C": "-.-.",
        "D": "-..",
        "E": ".",
        "F": "..-.",
        "G": "--.",
        "H": "....",
        "I": "..",
        "J": ".---",
        "K": "-.-",
        "L": ".-..",
        "M": "--",
        "N": "-.",
        "O": "---",
        "P": ".--.",
        "Q": "--.-",
        "R": ".-.",
        "S": "...",
        "T": "-",
        "U": "..-",
        "V": "...-",
        "W": ".--",
        "X": "-..-",
        "Y": "-.--",
        "Z": "--..",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        "0": "-----",
    }


def main():
    """Main function

    Description:
        This function is the entry point of the program.
        It checks if the arguments are valid and prints the morse code.
    """
    if len(sys.argv) != 2 or not check_text(sys.argv[1]):
        print("AssertionError: the arguments are bad")
        return
    print(*[get_morse_code()[char] for char in sys.argv[1].upper()])


if __name__ == "__main__":
    main()

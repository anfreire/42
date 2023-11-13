import sys
from ft_filter import ft_filter


def main():
    '''Main function

    Description:
        This function is the entry point of the program.
        It checks if the arguments are valid and prints the result of
        ft_filter.
    '''
    if (len(sys.argv) != 3 or
            not sys.argv[2].isdigit() or
            sys.argv[1].isdigit()):
        print("AssertionError: the arguments are bad")
        return
    print(
        ft_filter(
            lambda word: len(word) > int(sys.argv[2]),
            [word for word in sys.argv[1].split()]))


if __name__ == "__main__":
    main()

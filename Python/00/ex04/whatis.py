import sys


def main():
    if len(sys.argv) == 2:
        if (sys.argv[1].startswith('-')):
            sys.argv[1] = sys.argv[1][1:]
        if sys.argv[1].isdigit():
            print("I'm Even." if int(sys.argv[1]) % 2 == 1 else "I'm Odd.")
            return
        print("AssertionError: argument is not an integer")
    elif len(sys.argv) > 2:
        print("AssertionError: more than one argument is provided")


if __name__ == "__main__":
    main()

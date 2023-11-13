class calculator:
    """A class to apply operations to a vector"""

    def __init__(self, vector: list) -> None:
        """Constructor for calculator"""
        self.vector = vector

    def apply(self, toApply: callable) -> None:
        """Apply a function to the vector

        Args:
            toApply (callable): The function to apply
        """
        self.vector = [toApply(x) for x in self.vector]

    def __add__(self, object) -> None:
        """Add an object to the vector"""
        self.apply(lambda x: x + object)
        print(self.vector)

    def __mul__(self, object) -> None:
        """Multiply an object to the vector"""
        self.apply(lambda x: x * object)
        print(self.vector)

    def __sub__(self, object) -> None:
        """Substract an object to the vector"""
        self.apply(lambda x: x - object)
        print(self.vector)

    def __truediv__(self, object) -> None:
        """Divide an object to the vector"""
        if object == 0:
            print("ERROR (div by zero)")
        else:
            self.apply(lambda x: x / object)
            print(self.vector)


def main():
    pass


if __name__ == "__main__":
    main()

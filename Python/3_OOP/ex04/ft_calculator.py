class calculator:
    """A class to apply operations to a vector"""

    @classmethod
    def dotproduct(cls, V1: list[float], V2: list[float]) -> None:
        print(f"Dot product is: {sum([a * b for a, b in zip(V1, V2)])}")

    @classmethod
    def add_vec(cls, V1: list[float], V2: list[float]) -> None:
        print(
            f"Add Vector is : {[float(a) + float(b) for a, b in zip(V1, V2)]}"
            )

    @classmethod
    def sous_vec(cls, V1: list[float], V2: list[float]) -> None:
        print(
            f"Sous Vector is : {[float(a) - float(b) for a, b in zip(V1, V2)]}"
            )


def main():
    pass


if __name__ == "__main__":
    main()

from abc import ABC, abstractmethod


class Character(ABC):
    """Abstract class for Character"""

    @abstractmethod
    def __init__(self, first_name: str, is_alive: bool = True):
        """Constructor for Character"""
        self.first_name = first_name
        self.is_alive = is_alive

    def die(self) -> None:
        """Kill the character"""
        self.is_alive = False


class Stark(Character):
    """Child class of Character"""

    def __init__(self, first_name: str, is_alive: bool = True):
        """Constructor for Stark"""
        super().__init__(first_name, is_alive)


def main():
    pass


if __name__ == "__main__":
    main()

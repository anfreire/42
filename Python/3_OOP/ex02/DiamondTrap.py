from S1E7 import Baratheon, Lannister


class King(Baratheon, Lannister):
    """DiamondTrap class inherits from Baratheon and Lannister classes"""

    def __init__(self, first_name: str, is_alive: bool = True):
        """Constructor for King"""
        Baratheon.__init__(self, first_name, is_alive)
        self.first_name = "Joffrey"
        self.is_alive = is_alive

    def set_eyes(self, eyes: str) -> None:
        '''Setter for eyes'''
        self.eyes = eyes

    def get_eyes(self) -> str:
        '''Getter for eyes'''
        return self.eyes

    def set_hairs(self, hairs: str) -> None:
        '''Setter for hairs'''
        self.hairs = hairs

    def get_hairs(self) -> str:
        '''Getter for hairs'''
        return self.hairs

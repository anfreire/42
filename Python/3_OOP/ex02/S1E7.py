from S1E9 import Character


class Baratheon(Character):
    """Representing the Baratheon family."""

    def __init__(self, first_name: str, is_alive: bool = True):
        """Constructor for Baratheon"""
        super().__init__(first_name, is_alive)
        self.family_name = "Baratheon"
        self.eyes = "brown"
        self.hairs = "dark"

    @classmethod
    def create_baratheon(cls, first_name: str, is_alive: bool = True):
        """Create a Baratheon"""
        return cls(first_name, is_alive)

    def __str__(self):
        """Return a string representation of the object."""
        return f"Vector: ('{self.family_name}', '{self.hairs}', '{self.eyes}')"

    def __repr__(self):
        """Return a string representation of the object."""
        return f"Vector: ('{self.family_name}', '{self.hairs}', '{self.eyes}')"


class Lannister(Character):
    """Representing the Lannister family."""

    def __init__(self, first_name: str, is_alive: bool = True):
        """Constructor for Lannister"""
        super().__init__(first_name, is_alive)
        self.family_name = "Lannister"
        self.eyes = "blue"
        self.hairs = "light"

    @classmethod
    def create_lannister(cls, first_name: str, is_alive: bool = True):
        """Create a Lannister"""
        return cls(first_name, is_alive)

    def __str__(self):
        """Return a string representation of the object."""
        return f"Vector: ('{self.family_name}', '{self.hairs}', '{self.eyes}')"

    def __repr__(self):
        """Return a string representation of the object."""
        return f"Vector: ('{self.family_name}', '{self.hairs}', '{self.eyes}')"

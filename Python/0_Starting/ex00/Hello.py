def list_replacer(container: list, index: int = 1, new_value: str = "World!"):
    container[index] = new_value


def tuple_replacer(
    container: tuple, index: int = 1, new_value: str = "Portugal!"
):
    tmp = list(container)
    tmp[index] = new_value
    container = tuple(tmp)
    return container


def set_replacer(
    container: set, original_value: str = "tutu!", new_value: str = "Lisboa!"
):
    container.remove(original_value)
    tmp = list(container)
    tmp.insert(1, new_value)
    container = tuple(tmp)
    # ? Sets are unorderd, so we use a tuple instead to keep the order.
    # ! container = set(tmp)
    return container


def dict_replacer(
    container: dict, key: str = "Hello", new_value: str = "42Lisboa!"
):
    container[key] = new_value


def main():
    ft_list = ["Hello", "tata!"]
    ft_tuple = ("Hello", "toto!")
    ft_set = {"Hello", "tutu!"}
    ft_dict = {"Hello": "titi!"}
    #########################################
    list_replacer(ft_list)
    ft_tuple = tuple_replacer(ft_tuple)
    ft_set = set_replacer(ft_set)
    dict_replacer(ft_dict)
    #########################################
    print(ft_list)
    print(ft_tuple)
    print(ft_set)
    print(ft_dict)


if __name__ == "__main__":
    main()

# import inspect
# import re
# try:
#     pattern = r".*NULL_not_found\(([\w\_]*)\).*"
#     base = inspect.stack()
#     found = re.match(pattern, str(base))
#     if found:
#         print(f"{found.groups()[0]}: {object} {type(object)}")
#     else:
#         print("Type not Found")
#     return 1
# except Exception:
#     return 0


def value_n_type(object: any) -> str:
    return f"{object} {type(object)}"


def get_NULL_type(object):
    if type(object).__name__ == "NoneType":
        print(f"Nothing: {value_n_type(object)}")
    elif type(object).__name__ == "float":
        print(f"Cheese: {value_n_type(object)}")
    elif type(object).__name__ == "int":
        print(f"Cheese: {value_n_type(object)}")
    elif type(object).__name__ == "str" and len(object) == 0:
        print(f"Cheese: {value_n_type(object)}")
    elif type(object).__name__ == "bool":
        print(f"Cheese: {value_n_type(object)}")
    else:
        print("Type not Found")


def NULL_not_found(object: any) -> int:
    try:
        get_NULL_type(object)
        return 1
    except Exception:
        return 0

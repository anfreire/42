def all_thing_is_obj(object: any) -> int:
    TYPES = [
        'set',
        'list',
        'tuple',
        'dict',
    ]
    obj_type = type(object)
    obj_name = obj_type.__name__
    to_print = ''
    if obj_name in TYPES:
        to_print = obj_type.__name__.capitalize() + ' : ' + str(obj_type)
    elif obj_name == 'str':
        to_print = object + ' is in the kitchen' + ' : ' + str(obj_type)
    else:
        to_print = 'Type not found'
    print(to_print)
    return 42

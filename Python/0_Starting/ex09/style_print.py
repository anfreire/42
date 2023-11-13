class NormalColors:
    RED = "\033[31m"
    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    BLUE = "\033[34m"
    PURPLE = "\033[35m"
    CYAN = "\033[36m"
    WHITE = "\033[37m"
    NORMAL = "\033[0m"


class BackgroundColors:
    RED = "\033[41m"
    GREEN = "\033[42m"
    YELLOW = "\033[43m"
    BLUE = "\033[44m"
    PURPLE = "\033[45m"
    CYAN = "\033[46m"
    WHITE = "\033[47m"
    NORMAL = "\033[0m"


class FontStyles:
    BOLD = "\033[1m"
    ITALIC = "\033[3m"
    UNDERLINE = "\033[4m"
    STRIKETHROUGH = "\033[9m"
    NORMAL = "\033[0m"


def stylePrint(
    text: str,
    text_color: str | None = None,
    background_color: str | None = None,
    font_style: str | None = None,
) -> None:
    """Prints text with color, background color and font style

    Args:
        text (str): text to print
        text_color (str, optional): text color. Defaults to
NormalColors.NORMAL.
        background_color (str, optional): background color. Defaults to
    BackgroundColors.NORMAL.
        font_style (str, optional): font style. Defaults to FontStyles.NORMAL.
    """
    print(
        f"\
{text_color if text_color is not None else ''}\
{background_color if background_color is not None else ''}\
{font_style if font_style is not None else ''}\
{text}\
{NormalColors.NORMAL}"
    )

from load_image import ft_load


def main():
    img = ft_load("animal.jpeg")
    if len(img.array) == 0:
        return
    print(img)
    img.cut((200, 400), (600, 800))
    img.gray_out()
    print(
        f"New shape after slicing: {img.array.shape} or ({img.height}, \
{img.width})"
    )
    print(img)
    img.show(gray=True)


if __name__ == "__main__":
    main()

from load_image import ft_load


def main():
    img = ft_load("animal.jpeg")
    if len(img.array) == 0:
        return
    img.cut((200, 400), (600, 800))
    img.gray_out()
    print(
        f"The shape of image is: {img.array.shape} or ({img.height}, \
{img.width})"
    )
    print(img)
    img.transpose90()
    print(
        f"The shape after Transpose: {img.array.shape}"
    )
    img.set_print_rows(1)
    print(img)
    img.show(gray=True)


if __name__ == '__main__':
    main()

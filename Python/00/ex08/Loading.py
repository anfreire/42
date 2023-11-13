def ft_tqdm(lst: range) -> None:
    """Cheap tqdm copy

    Args:
        lst (range): range to iterate over
    """
    total = lst.stop - lst.start
    for count in lst:
        curr = count - lst.start
        percentage = round(curr / total * 100 if curr > 0 else 0)
        space_percentage = " " * (3 - len(str(percentage)))
        ratio = round(percentage * .33)
        bar = '█' * ratio * 2
        space_bar = " " * (66 - ratio * 2)
        print(
            f"\r{space_percentage}{percentage}%|{bar}{space_bar}|\
 {curr if percentage < 100 else total}/{total} ",
            end="",
        )
        yield count

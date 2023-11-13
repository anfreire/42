from datetime import datetime


def main():
    past = datetime(1970, 1, 1)
    today = datetime.now()
    delta = today - past
    seconds = delta.total_seconds()
    print(
        f"Seconds since January 1, 1970: {seconds:,.4f} \
            or {seconds:.2e} in scientific notation"
    )
    print(datetime.today().strftime("%B %d %Y"))


if __name__ == "__main__":
    main()

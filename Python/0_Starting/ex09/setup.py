import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="stylePrint",
    version="0.0.1",
    author="anfreire",
    author_email="anfreire@student.42lisboa.com",
    description="Print with style",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="anfreire.com",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    package_dir={"": "."},
    packages=setuptools.find_packages(where="."),
    python_requires=">=3.10",
)

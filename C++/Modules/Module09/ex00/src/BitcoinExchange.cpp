/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   easyfind.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 16:53:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/30 16:54:07 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/BitcoinExchange.hpp"

// https://java2blog.com/read-csv-file-in-cpp/
// https://en.cppreference.com/w/cpp/utility/pair
// https://favtutor.com/blogs/split-string-cpp
// https://www.programiz.com/cpp-programming/library-function/cstring/strtok


BitcoinExchange::BitcoinExchange()
{
	return ;
}

BitcoinExchange::BitcoinExchange(const std::string dataPath, const std::string inputPath): _dataPath(dataPath), _inputPath(inputPath)
{
	
} 

BitcoinExchange::BitcoinExchange(const BitcoinExchange &src): _dataPath(src._dataPath), _inputPath(src._inputPath)
{
	
}

BitcoinExchange &BitcoinExchange::operator=(const BitcoinExchange &src)
{
	(void)src;
	return *this;
}

BitcoinExchange::~BitcoinExchange()
{
	return ;
}

std::ostream &operator<<(std::ostream &os, const BitcoinExchange &src)
{
	(void)src;
	return os;
}

std::string	BitcoinExchange::trim(std::string original)
{
	int	start = 0;
	while (start < static_cast<int>(original.length()) && (original[start] == ' ' || original[start] == '\t'))
		start++;
	int end = original.length() - 1;
	while (end >= 0 && (original[end] == ' ' || original[end] == '\t'))
		end--;
	std::string newString = original.substr(start, end - start + 1);
	return newString;
}

void	print(std::vector<std::pair<std::vector<int>, float> > data)
{
	for (size_t i = 0; i < data.size(); i++)
	{
		std::cout << "Date: ";
		for (size_t j = 0; j < data[i].first.size(); j++)
			std::cout << data[i].first[j] << " ";
		std::cout << "Price: " << data[i].second << std::endl;
	}
}

void BitcoinExchange::parseData()
{
	std::vector<std::vector<std::string> >	content;
	std::vector<std::string>	row;
	std::string	line, word, digit;

	std::fstream	file(this->_dataPath.c_str());
	if (!file.is_open())
		throw std::runtime_error("Data file could not be opened.");
	std::getline(file, line);
	while (std::getline(file, line))
	{
		row.clear();
		std::stringstream str(line);
		while (std::getline(str, word, ','))
			row.push_back(this->trim(word));
		content.push_back(row);
	}
	if (content.empty())
		throw std::runtime_error("Data file is empty.");
	std::vector<int>	date;
	std::pair<std::vector<int>, float>	pair;
	char	*tmpStr;
	float	tmpFloat = 0;
	for (size_t i = 0; i < content.size(); i++)
	{
		date.clear();
		pair.first.clear();
		pair.second = 0;
		tmpStr = std::strtok(const_cast<char *>(content[i][0].c_str()), "-");
		while(tmpStr != NULL)
		{
			date.push_back(std::atoi(tmpStr));
			tmpStr = std::strtok(NULL, "-");
		}
		if (date.size() != 3)
			throw std::runtime_error("Data file is corrupted.");
		pair.first = date;
		if (content[i].size() > 1 && !content[i][1].empty())
			tmpFloat = std::atof(content[i][1].c_str());
		else
			throw std::runtime_error("Data file is corrupted.");
		pair.second = tmpFloat;
		this->_data.push_back(pair);
	}
}

void BitcoinExchange::parseInput()
{
	std::vector<std::vector<std::string> >	content;
	std::vector<std::string>	row;
	std::string	line, word, digit;

	std::fstream	file(this->_inputPath.c_str());
	if (!file.is_open())
		throw std::runtime_error("Input file could not be opened.");
	std::getline(file, line);
	while (std::getline(file, line))
	{
		row.clear();
		std::stringstream str(line);
		while (std::getline(str, word, '|'))
			row.push_back(this->trim(word));
		content.push_back(row);
	}
	if (content.empty())
		throw std::runtime_error("Input file is empty.");
	std::vector<int>	date;
	std::pair<std::vector<int>, float>	pair;
	char	*tmpStr;
	for (size_t i = 0; i < content.size(); i++)
	{
		date.clear();
		pair.first.clear();
		tmpStr = std::strtok(const_cast<char *>(content[i][0].c_str()), "-");
		while(tmpStr != NULL)
		{
			date.push_back(std::atoi(tmpStr));
			tmpStr = std::strtok(NULL, "-");
		}
		pair.first = date;
		if (date.size() != 3 || date[0] < 0 || date[1] < 1 || date[1] > 12 || date[2] < 1 || date[2] > 31)
			pair.second = BAD_INPUT_DATE;
		else if (content[i][1].size() == 0 || content[i][1].empty())
			pair.second = BAD_INPUT_EMPTY;
		else if (std::atof(content[i][1].c_str()) < 0)
			pair.second = NOT_POSITIVE;
		else if (std::atof(content[i][1].c_str()) > 1000)
			pair.second = TOO_LARGE;
		else
			pair.second = std::atof(content[i][1].c_str());
		this->_input.push_back(pair);
	}
}

std::string	BitcoinExchange::get_date_right(int	date)
{
	std::string newStr;
	std::stringstream dateStr;
	dateStr << date;
	dateStr >> newStr;
	if (newStr.size() == 1)
		newStr = "0" + newStr;
	return (newStr);
}

void BitcoinExchange::run()
{
	for (size_t i = 0; i < this->_input.size(); i++)
	{
		if (this->_input[i].second == BAD_INPUT_DATE)
			std::cout << COLOR_RED << "Error: " << COLOR_WHITE << "bad input " << RESET << "=> " << COLOR_RED << this->_input[i].first[0] << "-" << this->get_date_right(this->_input[i].first[1]) << "-" << this->get_date_right(this->_input[i].first[2]) << RESET << std::endl;
		else if (this->_input[i].second == BAD_INPUT_EMPTY)
			std::cout << COLOR_RED << "Error: " << COLOR_WHITE << "empty value." << RESET << std::endl;
		else if (this->_input[i].second == NOT_POSITIVE)
			std::cout << COLOR_RED << "Error: " << COLOR_WHITE << "not a positive number." << RESET << std::endl;
		else if (this->_input[i].second == TOO_LARGE)
			std::cout << COLOR_RED << "Error: " << COLOR_WHITE << "too large a number." << RESET << std::endl;
		else
			std::cout << COLOR_WHITE << this->_input[i].first[0] << "-" << this->get_date_right(this->_input[i].first[1]) << "-" << this->get_date_right(this->_input[i].first[2]) << RESET << " => " << COLOR_WHITE << this->_input[i].second << RESET << " = " << COLOR_GREEN << this->getAmount(this->getDateIndex(this->_input[i].first), this->_input[i].second) << RESET << std::endl;
	}
}

int	BitcoinExchange::getDateIndex(std::vector<int> date)
{
	int	previous = 0;
	for (size_t i = 0; i < this->_data.size(); i++)
	{
		if (this->_data[i].first[2] == date[2] && this->_data[i].first[1] == date[1] && this->_data[i].first[0] == date[0])
			return (i);
		else if (this->_data[i].first[2] >= date[2] && this->_data[i].first[1] >= date[1] && this->_data[i].first[0] >= date[0])
			return (previous);
		previous = i;
	}
	return (this->_data.size() - 1);
}

float 		BitcoinExchange::getAmount(int index, float amount)
{
	if (index == -1)
		return (-2);
	return (this->_data[index].second * amount);

}

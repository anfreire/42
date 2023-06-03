/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PmergeMe.cpp                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 16:57:10 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/13 21:59:29 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/PmergeMe.hpp"

PmergeMe::PmergeMe()
{
	this->_listContainers = new std::list<unsigned int>[0];
	this->_dequeContainers = new std::deque<unsigned int>[0];
	this->_containersSize = 0;
	return ;
}

PmergeMe::PmergeMe(const PmergeMe &src)
{
	this->_deque = src._deque;
	this->_list = src._list;
	this->_containersSize = src._containersSize;
	this->_listContainers = new std::list<unsigned int>[this->_containersSize];
	this->_dequeContainers = new std::deque<unsigned int>[this->_containersSize];
	for (unsigned int i = 0; i < this->_containersSize; i++)
	{
		this->_listContainers[i] = src._listContainers[i];
		this->_dequeContainers[i] = src._dequeContainers[i];
	}
}

PmergeMe &PmergeMe::operator=(const PmergeMe &src)
{
	delete [] this->_dequeContainers;
	delete [] this->_listContainers;
	this->_deque = src._deque;
	this->_list = src._list;
	this->_containersSize = src._containersSize;
	this->_listContainers = new std::list<unsigned int>[this->_containersSize];
	this->_dequeContainers = new std::deque<unsigned int>[this->_containersSize];
	for (unsigned int i = 0; i < this->_containersSize; i++)
	{
		this->_listContainers[i] = src._listContainers[i];
		this->_dequeContainers[i] = src._dequeContainers[i];
	}
	return (*this);
}

PmergeMe::~PmergeMe()
{
	delete [] this->_dequeContainers;
	delete [] this->_listContainers;
}

PmergeMe::PmergeMe(char **av)
{
	char				*str;
	unsigned int		*array;
	unsigned int		*arrayCopy;
	unsigned int		arraySize;
	std::stringstream	ss;
	double				tmp;
	
	array = new unsigned int[1];
	arraySize = 0;
	this->_listContainers = new std::list<unsigned int>[0];
	this->_dequeContainers = new std::deque<unsigned int>[0];
	this->_containersSize = 0;
	for (int i = 1; av[i]; i++)
	{
		if (!this->checkString(av[i]))
		{
			delete [] array;
			delete [] this->_dequeContainers;
			delete [] this->_listContainers;
			throw std::runtime_error("Error: Only positive integers allowed.");
		}
		str = std::strtok(av[i], " ");
		while (str)
		{
			ss << str;
			ss >> tmp;
			if (tmp < 0 || tmp > std::numeric_limits<int>::max())
			{
				delete [] array;
				delete [] this->_dequeContainers;
				delete [] this->_listContainers;
				throw std::runtime_error("Error: Only positive integers allowed.");
			}
			arrayCopy = new unsigned int[arraySize + 1];
			for (unsigned int i = 0; i < arraySize; i++)
			{
				arrayCopy[i] = array[i];
			}
			delete [] array;
			arrayCopy[arraySize] = static_cast<unsigned int>(tmp);
			arraySize++;
			array = new unsigned int[arraySize];
			for (unsigned int i = 0; i < arraySize; i++)
			{
				array[i] = arrayCopy[i];
			}
			delete [] arrayCopy;
			ss.clear();
			str = std::strtok(NULL, " ");
		}
	}
	if (arraySize == 0)
	{
		delete [] array;
		delete [] this->_dequeContainers;
		delete [] this->_listContainers;
		throw std::runtime_error("Error: No arguments provided.");
	}
	if (this->checkDuplicates(array, arraySize))
	{
		delete [] array;
		delete [] this->_dequeContainers;
		delete [] this->_listContainers;
		throw std::runtime_error("Error: Duplicates found.");
	}
	this->run(array, arraySize, std::cout);
	delete [] array;
}

//---------------------------------------------------------------------------------------------------------
// Check Functions

bool	PmergeMe::checkString(std::string str) const
{
	for (unsigned int i = 0; i < str.length(); i++)
	{
		if (!isdigit(str[i]) && str[i] != ' ' && str[i] != '\t')
			return (false);
	}
	return (true);
}

bool	PmergeMe::checkDuplicates(unsigned int *array, unsigned int arraySize) const
{
	for (unsigned int i = 0; i < arraySize; i++)
	{
		for (unsigned int j = i + 1; j < arraySize; j++)
		{
			if (array[i] == array[j])
				return (true);
		}
	}
	return (false);
}

bool	PmergeMe::isDivideComplete(const int flag) const
{
	if (flag == LIST)
	{
		for (unsigned int i = 0; i < this->_containersSize; i++)
		{
			if (this->_listContainers[i].size() > 1)
				return (false);
		}
		return (true);
	}
	else if (flag == DEQUE)
	{
		for (unsigned int i = 0; i < this->_containersSize; i++)
			{
				if (this->_dequeContainers[i].size() > 1)
					return (false);
			}
			return (true);
	}
	else
	{
		std::stringstream	ss;
		ss << BACKGROUND_RED << "PmergeMe::isDivideComplete" << RESET << std::endl << COLOR_RED << "Error " << COLOR_WHITE << "Invalid Flag. Use 1 for List or 2 for Deque" << RESET;
		throw std::runtime_error(ss.str());
	}
}



//---------------------------------------------------------------------------------------------------------
// Print Functions

std::ostream	&PmergeMe::printSingle(const int flag, std::ostream &os)
{
	if (flag == LIST)
	{
		for (std::list<unsigned int>::const_iterator it = this->_list.begin(); it != this->_list.end(); it++)
			os << *it << " ";
	}
	else if (flag == DEQUE)
	{
		for (std::deque<unsigned int>::const_iterator it = this->_deque.begin(); it != this->_deque.end(); it++)
			os << *it << " ";
	}
	else
	{
		std::stringstream	ss;
		ss << BACKGROUND_RED << "PmergeMe::printSingle" << RESET << std::endl << COLOR_RED << "Error " << COLOR_WHITE << "Invalid Flag. Use 1 for List or 2 for Deque" << RESET;
		throw std::runtime_error(ss.str());
	}
	return (os);
}

std::ostream	&PmergeMe::printMultiple(const int flag, std::ostream &os)
{
	if (flag == LIST)
	{
		for (unsigned int i = 0; i < this->_containersSize; i++)
			{
				os << COLOR_BLUE << "Container " << i << RESET << std::endl;
				for (std::list<unsigned int>::const_iterator it = this->_listContainers[i].begin(); it != this->_listContainers[i].end(); it++)
					os << *it << " ";
				os << std::endl;
			}
	}
	else if (flag == DEQUE)
	{
		for (unsigned int i = 0; i < this->_containersSize; i++)
			{
				os << COLOR_BLUE << "Container " << i << RESET << std::endl;
				for (std::deque<unsigned int>::const_iterator it = this->_dequeContainers[i].begin(); it != this->_dequeContainers[i].end(); it++)
					os << *it << " ";
				os << std::endl;
			}
	}
	else
		os << BACKGROUND_RED << "PmergeMe::printMultiple" << RESET << std::endl << COLOR_RED << "Error " << COLOR_WHITE << "Invalid Flag. Use 1 for List or 2 for Deque" << RESET;
	return (os);
}



//---------------------------------------------------------------------------------------------------------
// Function to divide the list or deque into multiple containers

void	PmergeMe::divide(const int flag)
{
	if (flag == LIST)
	{
		this->_containersSize = 1;
		delete [] this->_listContainers;
		this->_listContainers = new std::list<unsigned int>[this->_containersSize];
		this->_listContainers[0] = this->_list;
		while (this->isDivideComplete(LIST) == false)
		{
			std::list<unsigned int> *tmp = new std::list<unsigned int>[this->_containersSize * 2];
			for (unsigned int i = 0; i < this->_containersSize; i++)
				this->splitContainer(tmp[i * 2], tmp[i * 2 + 1], this->_listContainers[i]);
			delete [] this->_listContainers;
			this->_listContainers = tmp;
			this->_containersSize *= 2;
		}
	}
	else if (flag == DEQUE)
	{
		this->_containersSize = 1;
		delete [] this->_dequeContainers;
		this->_dequeContainers = new std::deque<unsigned int>[this->_containersSize];
		this->_dequeContainers[0] = this->_deque;
		while (this->isDivideComplete(DEQUE) == false)
		{
			std::deque<unsigned int> *tmp = new std::deque<unsigned int>[this->_containersSize * 2];
			for (unsigned int i = 0; i < this->_containersSize; i++)
				this->splitContainer(tmp[i * 2], tmp[i * 2 + 1], this->_dequeContainers[i]);
			delete [] this->_dequeContainers;
			this->_dequeContainers = tmp;
			this->_containersSize *= 2;
		}
	}
	else
	{
		std::stringstream	ss;
		ss << BACKGROUND_RED << "PmergeMe::divide" << RESET << std::endl << COLOR_RED << "Error " << COLOR_WHITE << "Invalid Flag. Use 1 for List or 2 for Deque" << RESET;
		throw std::runtime_error(ss.str());
	}
}



//---------------------------------------------------------------------------------------------------------
// Function to merge the containers into one list or deque, while sorting the elements


// void	merge_insert(void)
// 		{
// 			while (this->_subContainersSize > 1)
// 			{
// 				T *tmp = new T[this->_subContainersSize / 2];
// 				for (unsigned int i = 0; i < this->_subContainersSize / 2; i++)
// 					this->ContainerSort(tmp[i], this->_subContainers[i * 2], this->_subContainers[i * 2 + 1]);
// 				delete [] this->_subContainers;
// 				this->_subContainers = tmp;
// 				this->_subContainersSize /= 2;
// 			}
// 			this->_container = this->_subContainers[0];
// 		}
void	PmergeMe::mergeInsert(const int flag)
{
	if (flag == LIST)
	{
		while (this->_containersSize > 1)
		{
			std::list<unsigned int> *tmp = new std::list<unsigned int>[this->_containersSize / 2];
			for (unsigned int i = 0; i < this->_containersSize / 2; i++)
				this->appendContainers(this->_listContainers[i * 2], this->_listContainers[i * 2 + 1], tmp[i]); 
			delete [] this->_listContainers;
			this->_listContainers = tmp;
			this->_containersSize /= 2;
		}
		this->_list = this->_listContainers[0];
	}
	else if (flag == DEQUE)
	{
		while (this->_containersSize > 1)
		{
			std::deque<unsigned int> *tmp = new std::deque<unsigned int>[this->_containersSize / 2];
			for (unsigned int i = 0; i < this->_containersSize / 2; i++)
				this->appendContainers(this->_dequeContainers[i * 2], this->_dequeContainers[i * 2 + 1], tmp[i]); 
			delete [] this->_dequeContainers;
			this->_dequeContainers = tmp;
			this->_containersSize /= 2;
		}
		this->_deque = this->_dequeContainers[0];
	}
	else
	{
		std::stringstream	ss;
		ss << BACKGROUND_RED << "PmergeMe::mergeInsert" << RESET << std::endl << COLOR_RED << "Error " << COLOR_WHITE << "Invalid Flag. Use 1 for List or 2 for Deque" << RESET;
		throw std::runtime_error(ss.str());
	}
}



//---------------------------------------------------------------------------------------------------------
// Function to execute the algorithm

std::ostream	&PmergeMe::run(unsigned int *array, unsigned int arraySize, std::ostream &os)
{
	struct timeval	start, end;
	float			miliseconds;
	std::stringstream	ss;

	try
	{
		gettimeofday(&start, NULL);
		for (unsigned int i = 0; i < arraySize; i++)
			this->_list.push_back(array[i]);
		this->printSingle(LIST, ss) << std::endl;
		this->divide(LIST);
		this->mergeInsert(LIST);
		gettimeofday(&end, NULL);
		os <<  "Before: " << ss.str();
		os << "After: ";
		this->printSingle(LIST, std::cout) << std::endl;
		miliseconds = static_cast<float>(static_cast<float>(end.tv_sec - start.tv_sec) * 1000 + static_cast<float>(end.tv_usec - start.tv_usec) / 1000);
		os << "Time to process a range of " << arraySize << " elements with a std::list   : " << std::fixed << std::setprecision(5) << miliseconds << " ms" << std::endl;
		gettimeofday(&start, NULL);
		ss.clear();
		for (unsigned int i = 0; i < arraySize; i++)
			this->_deque.push_back(array[i]);
		this->printSingle(DEQUE, ss) << std::endl;
		this->divide(DEQUE);
		this->mergeInsert(DEQUE);
		gettimeofday(&end, NULL);
		miliseconds = static_cast<float>(static_cast<float>(end.tv_sec - start.tv_sec) * 1000 + static_cast<float>(end.tv_usec - start.tv_usec) / 1000);
		os << "Time to process a range of " << arraySize << " elements with a std::deque  : " << std::fixed << std::setprecision(5) << miliseconds << " ms" << std::endl;
	}
	catch (std::exception &e)
	{
		delete [] this->_listContainers;
		delete [] this->_dequeContainers;
		delete [] array;
		std::cerr << e.what() << std::endl;
		exit(1);
	}
	return (os);
}

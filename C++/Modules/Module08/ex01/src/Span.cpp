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

#include "../inc/Span.hpp"

Span::Span(void)
{
    this->_size = 0;
}

Span::Span(const Span &src)
{
    *this = src;
}

Span &Span::operator=(const Span &src)
{
    this->_size = src._size;
    // https://www.techiedelight.com/copy-vector-cpp/
    this->_data = src._data;
    return *this;
}

Span::~Span()
{
    return ;
}

Span::Span(const unsigned int N)
{
    this->_size = N;
}

void Span::addNumber(const int number)
{
    if (this->_data.size() == this->_size)
        throw Span::MaximumSizeException();
    else
        this->_data.push_back(number);
}

int  Span::shortestSpan(void) const
{
    if (this->_data.size() == 0)
        throw (Span::NoNumbersStoredException());
    // https://www.geeksforgeeks.org/iterators-c-stl/
    int tmp = -1;
    for (std::list<int>::const_iterator it1 = this->_data.begin(); it1 != this->_data.end(); it1++)
    {
        for (std::list<int>::const_iterator it2 = this->_data.begin(); it2 != this->_data.end(); it2++)
        {
            if (it1 == it2)
                continue;
            else if (tmp == -1 || std::abs(*it1 - *it2) < tmp)
                tmp = std::abs(*it1 - *it2);
        }
    }
    return (tmp);
}

int  Span::longestSpan(void) const
{
    if (this->_data.size() == 0)
        throw (Span::NoNumbersStoredException());
    int tmp = -1;
    for (std::list<int>::const_iterator it1 = this->_data.begin(); it1 != this->_data.end(); it1++)
    {
        for (std::list<int>::const_iterator it2 = this->_data.begin(); it2 != this->_data.end(); it2++)
        {
            if (it1 == it2)
                continue;
            else if (tmp == -1 || std::abs(*it1 - *it2) > tmp)
                tmp = std::abs(*it1 - *it2);
        }
    }
    return (tmp);
}

const char *Span::MaximumSizeException::what() const _GLIBCXX_TXN_SAFE_DYN _GLIBCXX_NOTHROW
{
    return "Maximum size reached for the vector.";
}

const char *Span::NoNumbersStoredException::what() const _GLIBCXX_TXN_SAFE_DYN _GLIBCXX_NOTHROW
{
    return "No numbers stored in the vector.";
}

std::list<int>::iterator Span::begin(void)
{
    return this->_data.begin();
}
std::list<int>::iterator Span::end(void)
{
    return this->_data.end();
}

std::ostream &operator<<(std::ostream &os, Span &src)
{
    std::list<int>::iterator it;
    os << BACKGROUND_BLUE << "NUMBERS:" << RESET COLOR_BLUE << " > " << COLOR_WHITE;
    for (it = src.begin(); it != src.end(); it++)
    {
        os << *it << " ";
    }
    os << RESET;
    return os;
}
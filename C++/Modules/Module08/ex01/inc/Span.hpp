/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Span.hpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/07 20:37:24 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/08 16:42:33 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


#ifndef SPAN_HPP
# define SPAN_HPP

/*			Printing Constants			*/
# define	RESET				"\033[0m"
# define	COLOR_RED			"\033[1;31m"
# define	COLOR_GREEN			"\033[1;32m"
# define	COLOR_YELLOW		"\033[1;33m"
# define	COLOR_BLUE			"\033[1;34m"
# define	COLOR_MAGENTA		"\033[1;35m"
# define	COLOR_CYAN			"\033[1;36m"
# define	COLOR_WHITE			"\033[1;37m"
# define	BACKGROUND_RED		"\033[1;41m"
# define	BACKGROUND_GREEN	"\033[1;42m"
# define	BACKGROUND_YELLOW	"\033[1;43m"
# define	BACKGROUND_BLUE		"\033[1;44m"
# define	BACKGROUND_MAGENTA	"\033[1;45m"
# define	BACKGROUND_CYAN		"\033[1;46m"
# define	BACKGROUND_WHITE	"\033[1;47m"
# define	BACKGROUND_BLACK	"\033[1;48m"

# include <iostream>
# include <exception>
# include <string>
# include <algorithm>
# include <iterator>
# include <set>
# include <vector>
# include <list>

class Span
{
	public:
/*		Orthodox Canonical Form     */
		Span(void);
		Span(const Span &src);
		Span &operator=(const Span &src);
		~Span();
/*      Costum Constructor      */
		Span(const unsigned int N);
/*      Functions       */
		void addNumber(const int number);
		template <typename A>
		void addNumbers(A start, A end)
		{
			try
			{
				while (start != end)
				{
					addNumber(*start);
					start++;
				}
			}
			catch(std::exception &e)
			{
				std::cout << COLOR_RED << "Error: " << COLOR_WHITE << e.what() << RESET << std::endl;
				return;
			}
		}
		int  shortestSpan(void) const;
		int  longestSpan(void) const;
/*		Exceptions		*/
		class RepeatedNumberException : public std::exception
		{
			// /usr/include/c++/12/bits/exception.h
			public:
				const char *what() const _GLIBCXX_TXN_SAFE_DYN _GLIBCXX_NOTHROW;
		};
		class MaximumSizeException : public std::exception
		{
			// /usr/include/c++/12/bits/exception.h
			public:
				const char *what() const _GLIBCXX_TXN_SAFE_DYN _GLIBCXX_NOTHROW;
		};
		class NoNumbersStoredException : public std::exception
		{
			// /usr/include/c++/12/bits/exception.h
			public:
				const char *what() const _GLIBCXX_TXN_SAFE_DYN _GLIBCXX_NOTHROW;
		};
/*		Iterator Getters		*/
		std::list<int>::iterator begin(void);
		std::list<int>::iterator end(void);
		
	private:
/*		Attributes		*/
		std::list<int> 		_data;
		unsigned int		_size;
	
};

std::ostream &operator<<(std::ostream &os, Span &src);


#endif
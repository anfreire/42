/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   whatever.hpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 22:06:56 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/30 23:38:52 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


#ifndef WHATEVER_HPP
# define WHATEVER_HPP

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
# include <cstdlib>

// Trigger a compilation error if the template doesn't have all the comparison operators
template <typename T>
void	checkOperators(T &x, T &y)
{
	try
	{
		bool tmp = (x == y) || (x != y) || (x < y) || (x > y) || (x <= y) || (x >= y);
		(void)tmp;
	}
	catch (std::exception &e)
	{
		std::cout << COLOR_RED << "Error: " << RESET << e.what() << std::endl;
		exit(1);
	}
}

template <typename A> void	swap(A &x, A &y) {checkOperators(x, y); A tmp = x; x = y; y = tmp;};
/*
template <typename A>
void	swap(A &x, A &y)
{
	checkOperators(x, y);
	A	tmp;
	
	tmp = x;
	x = y;
	y = tmp;
};
*/


template <typename B> const B &min(const B &x, const B &y) {checkOperators(x, y); return x < y ? x : y;};
/*
template <typename B>
const	B	&min(const	B &x, const	B &y)
{
	checkOperators(x, y);
	if (x < y)
		return (x);
	return(y);
};
*/


template <typename C> const C &max(const C &x, const C &y) {checkOperators(x, y); return x > y ? x : y;};
/*
template <typename C>
const	C	&max(const	C &x, const	C &y)
{
	checkOperators(x, y);
	if (x > y)
		return (x);
	return(y);
};
*/



#endif
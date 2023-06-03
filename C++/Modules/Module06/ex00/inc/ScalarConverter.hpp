/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ScalarConverter.hpp                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/24 23:29:40 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/30 20:24:41 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef SCALARCONVERTER_HPP
# define SCALARCONVERTER_HPP

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

/*		State Constants		*/

# define	IMPOSSIBLE			-1
# define	NON_DISPLAYABLE		0
# define	POSSIBLE		1

# include <iostream>
# include <string>
# include <stdlib.h>
# include <cstring>
# include <cctype>
# include <math.h>
# include <iomanip>
# include <limits>

class ScalarConverter
{
	public:
		static void	convert(const	std::string	str);

	private:
/*		Orthodox Canonical Form		*/
		ScalarConverter();
		ScalarConverter(const ScalarConverter &src);
		ScalarConverter &operator=(const ScalarConverter &src);
		~ScalarConverter();
/*		Overridable Pure Virtual Function		*/
		virtual void	f() const = 0;
/*		Helper Functions		*/
		static void	charDisplayer(const int state, char c);
		static void	intDisplayer(const int state, int i);
		static void	floatDisplayer(const int state, float f);
		static void	doubleDisplayer(const int state, double d);
};

// ! THIS CLASS DOES NOT WORK !
// ? For observations and debate only
// class WannaInherit: public ScalarConverter
// {
// 	public:
// 		virtual void	f() const = 0;
// 	private:
// 		virtual void	f() const = 0;
		
// };

#endif
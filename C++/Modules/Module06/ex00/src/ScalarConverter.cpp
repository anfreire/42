/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ScalarConverter.cpp                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/24 23:29:40 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/01 12:36:15 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/ScalarConverter.hpp"

void	ScalarConverter::charDisplayer(const int state, char c)
{
	if (state == NON_DISPLAYABLE)
		std::cout << BACKGROUND_YELLOW << "char:" << RESET << COLOR_WHITE << " Non displayble" << std::endl;
	else if (state == IMPOSSIBLE)
		std::cout << BACKGROUND_RED << "char:" << RESET << COLOR_WHITE << " impossible" << std::endl;
	else
		std::cout << BACKGROUND_GREEN << "char:" << RESET << COLOR_WHITE << " '" << c << "'" << std::endl;
}

void	ScalarConverter::intDisplayer(const int state, int i)
{
	if (state == NON_DISPLAYABLE)
		std::cout << BACKGROUND_YELLOW << "int:" << RESET << COLOR_WHITE << " Non displayble" << std::endl;
	else if (state == IMPOSSIBLE)
		std::cout << BACKGROUND_RED << "int:" << RESET << COLOR_WHITE << " impossible" << std::endl;
	else
		std::cout << BACKGROUND_GREEN << "int:" << RESET << COLOR_WHITE << " " << i << std::endl;
}

void	ScalarConverter::floatDisplayer(const int state, float f)
{
	if (state == NON_DISPLAYABLE)
		std::cout << BACKGROUND_YELLOW << "float:" << RESET << COLOR_WHITE << " Non displayble" << std::endl;
	else if (state == IMPOSSIBLE)
		std::cout << BACKGROUND_RED << "float:" << RESET << COLOR_WHITE << " impossible" << std::endl;
	else
	{
		std::cout << BACKGROUND_GREEN << "float:" << RESET << COLOR_WHITE << " "<< std::fixed << std::setprecision(1) << f << 'f' << std::endl;
	}
}

void	ScalarConverter::doubleDisplayer(const int state, double d)
{
	if (state == NON_DISPLAYABLE)
		std::cout << BACKGROUND_YELLOW << "double:" << RESET << COLOR_WHITE << " Non displayble" << std::endl;
	else if (state == IMPOSSIBLE)
		std::cout << BACKGROUND_RED << "double:" << RESET << COLOR_WHITE << " impossible" << std::endl;
	else
		std::cout << BACKGROUND_GREEN << "double:" << RESET << COLOR_WHITE << " " << std::fixed << std::setprecision(1) << d << std::endl;
}


void	ScalarConverter::convert(const	std::string	str)
{
	char *pEnd;
	long double ld = strtold(str.c_str(), &pEnd);
	if (str.length() == 1 && !isdigit(str[0]) && isprint(str[0]))
		ld = static_cast<long double>(str[0]);
	else if ((strlen(pEnd) > 0 && pEnd[0] != 'f') || strlen(pEnd) > 1) 
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << "Only decimal notation and displayable single characters are accepted!" << std::endl;
		return;
	}
	if (str.compare("nan") == 0 || str.compare("nanf") == 0)
	{
		ScalarConverter::charDisplayer(IMPOSSIBLE, 0);
		ScalarConverter::intDisplayer(IMPOSSIBLE, 0);
		ScalarConverter::floatDisplayer(POSSIBLE, std::numeric_limits<float>::quiet_NaN());
		ScalarConverter::doubleDisplayer(POSSIBLE, std::numeric_limits<double>::quiet_NaN());
		return ;
	}
	else if (str.compare("inf") == 0 || str.compare("inff") == 0)
	{
		ScalarConverter::charDisplayer(IMPOSSIBLE, 0);
		ScalarConverter::intDisplayer(IMPOSSIBLE, 0);
		ScalarConverter::floatDisplayer(POSSIBLE, std::numeric_limits<float>::infinity());
		ScalarConverter::doubleDisplayer(POSSIBLE, std::numeric_limits<double>::infinity());
		return ;
	}
	if (static_cast<int>(ld) < std::numeric_limits<char>::min() || static_cast<int>(ld) > std::numeric_limits<char>::max())
		ScalarConverter::charDisplayer(IMPOSSIBLE, 0);
	else if (isprint(static_cast<char>(ld)))
		ScalarConverter::charDisplayer(POSSIBLE, static_cast<char>(ld));
	else
		ScalarConverter::charDisplayer(NON_DISPLAYABLE, 0);
	if (static_cast<float>(ld) < static_cast<float>(std::numeric_limits<int>::min()) || static_cast<float>(ld) >  static_cast<float>(std::numeric_limits<int>::max()))
		ScalarConverter::intDisplayer(IMPOSSIBLE, 0);
	else
		ScalarConverter::intDisplayer(POSSIBLE, static_cast<int>(ld));
	if (static_cast<double>(ld) < static_cast<double>(std::numeric_limits<float>::min()) || static_cast<double>(ld) >  static_cast<double>(std::numeric_limits<float>::max()))
		ScalarConverter::floatDisplayer(IMPOSSIBLE, 0);
	else
		ScalarConverter::floatDisplayer(POSSIBLE, static_cast<float>(ld));
	if (static_cast<long double>(ld) < static_cast<long double>(std::numeric_limits<double>::min()) || static_cast<long double>(ld) >  static_cast<long double>(std::numeric_limits<double>::max()))
		ScalarConverter::doubleDisplayer(IMPOSSIBLE, 0);
	else
		ScalarConverter::doubleDisplayer(POSSIBLE, static_cast<double>(ld));					
}

ScalarConverter::ScalarConverter()
{
	return;
}

ScalarConverter::ScalarConverter(const ScalarConverter &src)
{
	(void)src;
	return;
}

ScalarConverter &ScalarConverter::operator=(const ScalarConverter &src)
{
	(void)src;
	return *this;
}

ScalarConverter::~ScalarConverter()
{
	return ;
}


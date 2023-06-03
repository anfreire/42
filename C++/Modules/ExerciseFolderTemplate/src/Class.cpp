/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Class.cpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 16:57:10 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/30 17:22:19 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Class.hpp"

Class::Class()
{
	std::cout << BACKGROUND_BLUE << "Class" << RESET << COLOR_GREEN << " Default constructor " << COLOR_WHITE << "called" << RESET << std::endl;
}

Class::Class(const Class &src)
{
	std::cout << BACKGROUND_BLUE << "Class" << RESET << COLOR_GREEN << " Copy constructor " << COLOR_WHITE << "called" << RESET << std::endl;
	*this = src;
}

Class &Class::operator=(const Class &rhs)
{
	std::cout << BACKGROUND_BLUE << "Class" << RESET << COLOR_GREEN << " Assignation operator " << COLOR_WHITE << "called" << RESET << std::endl;
	this->_var = rhs._var;
	return (*this);
}

Class::~Class()
{
	std::cout << BACKGROUND_BLUE << "Class" << RESET << COLOR_RED << " Destructor " << COLOR_WHITE << "called" << RESET << std::endl;
}
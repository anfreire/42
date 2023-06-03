/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   WrongCat.cpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:33:06 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:23:15 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/WrongCat.hpp"

WrongCat::WrongCat() : WrongAnimal()
{
	std::cout << WHITE << "WrongCat " << GREEN << "constructor called" << RESET << std::endl;
	this->_type = "WrongCat";
}

WrongCat::WrongCat(const WrongCat &src) : WrongAnimal(src)
{
	std::cout << WHITE << "WrongCat " << GREEN << "copy constructor called" << RESET << std::endl;
	*this = src;
}

WrongCat &WrongCat::operator=(const WrongCat &src)
{
	std::cout << WHITE << "WrongCat " << GREEN << "assignation operator called" << RESET << std::endl;
	this->_type = src._type;
	return (*this);
}

WrongCat::~WrongCat()
{
	std::cout << WHITE << "WrongCat " << RED << "destructor called" << RESET << std::endl;
}

void WrongCat::makeSound() const
{
	std::cout << WHITE << "WrongCat " << ORANGE << "sound" << RESET << std::endl;
}

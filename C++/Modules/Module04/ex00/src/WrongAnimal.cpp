/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   WrongAnimal.cpp                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:33:24 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:22:27 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/WrongAnimal.hpp"

WrongAnimal::WrongAnimal()
{
	std::cout << WHITE << "WrongAnimal " << GREEN << "constructor called" << RESET << std::endl;
	this->_type = "WrongAnimal";
}

WrongAnimal::WrongAnimal(const WrongAnimal &src)
{
	std::cout << WHITE << "WrongAnimal " << GREEN << "copy constructor called" << RESET << std::endl;
	*this = src;
}

WrongAnimal &WrongAnimal::operator=(const WrongAnimal &src)
{
	std::cout << WHITE << "WrongAnimal " << GREEN << "assignation operator called" << RESET << std::endl;
	this->_type = src._type;
	return (*this);
}

WrongAnimal::~WrongAnimal()
{
	std::cout << WHITE << "WrongAnimal " << RED << "destructor called" << RESET << std::endl;
}

std::string WrongAnimal::getType() const
{
	return (this->_type);
}

void WrongAnimal::makeSound() const
{
	std::cout << WHITE << "WrongAnimal " << CYAN << "sound" << RESET << std::endl;
}
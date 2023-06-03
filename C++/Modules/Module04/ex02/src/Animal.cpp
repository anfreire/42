/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Animal.cpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:35:15 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:32:06 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Animal.hpp"

Animal::Animal()
{
	std::cout << WHITE << "Animal " << GREEN << "constructor called" << RESET << std::endl;
	this->_type = "Animal";
}

Animal::Animal(const Animal &src)
{
	std::cout << WHITE "Animal " << GREEN << "copy constructor called" << RESET << std::endl;
	*this = src;
}

Animal &Animal::operator=(const Animal &src)
{
	std::cout << WHITE "Animal " << GREEN << "assignation operator called" << RESET << std::endl;
	this->_type = src._type;
	return (*this);
}

Animal::~Animal()
{
	std::cout << WHITE << "Animal " << RED << "destructor called" << RESET << std::endl;
}

std::string Animal::getType() const
{
	return (this->_type);
}

void Animal::makeSound() const
{
	std::cout << WHITE << "Animal " << CYAN << "sound" << RESET << std::endl;
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Dog.cpp                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:59:03 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:29:46 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Dog.hpp"

Dog::Dog()
{
	std::cout << WHITE << "Dog " << GREEN << "constructor called" << RESET << std::endl;
	this->_type = "Dog";
}

Dog::Dog(const Dog &src) : Animal(src)
{
	std::cout << WHITE << "Dog " << GREEN << "copy constructor called" << RESET << std::endl;
	*this = src;
}

Dog &Dog::operator=(const Dog &src)
{
	std::cout << WHITE << "Dog " << GREEN << "assignation operator called" << RESET << std::endl;
	this->_type = src._type;
	return (*this);
}

Dog::~Dog()
{
	std::cout << WHITE << "Dog " << RED << "destructor called" << RESET << std::endl;
}

void Dog::makeSound() const
{
	std::cout << WHITE << "Dog " << BLUE << "sound" << RESET << std::endl;
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Cat.cpp                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:34:58 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:52:07 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Cat.hpp"

Cat::Cat() : Animal()
{
	std::cout << WHITE << "Cat " << GREEN << "default constructor called" << RESET << std::endl;
	this->_type = "Cat";
	this->_brain = new Brain();
}

Cat::Cat(const Cat &src) : Animal(src)
{
	std::cout << WHITE << "Cat " << GREEN << "copy constructor called" << RESET << std::endl;
	*this = src;
}

Cat &Cat::operator=(const Cat &src)
{
	std::cout << WHITE << "Cat " << GREEN << "assignation operator called" << RESET << std::endl;
	this->_type = src._type;
	this->_brain = new Brain(*src._brain);
	return (*this);
}

Cat::~Cat()
{
	delete this->_brain;
	std::cout << WHITE << "Cat " << RED << "destructor called" << RESET << std::endl;
}

void Cat::makeSound() const
{
	std::cout << WHITE << "Cat " << MAGENTA << "sound" << RESET << std::endl;
}

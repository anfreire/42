/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Ice.cpp                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/17 14:32:16 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 18:03:56 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Ice.hpp"
#include "../inc/ICharacter.hpp"

Ice::Ice() : AMateria("ice")
{
	this->_type = "ice";
}

Ice::~Ice()
{
	return ;
}

Ice::Ice(const Ice &src) : AMateria(src)
{
	*this = src;
}

Ice &Ice::operator=(const Ice &src)
{
	this->_type = src._type;
	return *this;
}

AMateria* Ice::clone() const
{
	return new Ice();
}

void Ice::use(ICharacter& target)
{
	std::cout << BLUE << "* shoots an ice bolt at " << RESET << WHITE << target.getName() << RESET << BLUE " *" << RESET << std::endl;
}
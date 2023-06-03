/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Cure.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/17 14:55:18 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 18:04:09 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Cure.hpp"
#include "../inc/ICharacter.hpp"

Cure::Cure() : AMateria("cure")
{
	this->_type = "cure";
}

Cure::~Cure()
{
	return ;
}

Cure::Cure(const Cure &src) : AMateria(src)
{
	*this = src;
}

Cure &Cure::operator=(const Cure &src)
{
	this->_type = src._type;
	return *this;
}

AMateria* Cure::clone() const
{
	return new Cure();
}

void Cure::use(ICharacter& target)
{
	std::cout << BLUE << "* heals " << RESET << WHITE << target.getName() << RESET << BLUE "'s wounds *" << RESET << std::endl;
}

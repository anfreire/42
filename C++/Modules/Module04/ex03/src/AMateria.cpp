/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AMateria.cpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/17 11:46:47 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 17:49:19 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/AMateria.hpp"

AMateria::AMateria()
{
	this->_type = "";
}

AMateria::~AMateria()
{
	return;
}

AMateria::AMateria(const AMateria &src)
{
	*this = src;
}

AMateria &AMateria::operator=(const AMateria &src)
{
	this->_type = src._type;
	return *this;
}

AMateria::AMateria(std::string const & type)
{
	this->_type = type;
}

const std::string &AMateria::getType() const
{
	return this->_type;
}

void AMateria::use(ICharacter& target)
{
	(void)target;
	return;
}
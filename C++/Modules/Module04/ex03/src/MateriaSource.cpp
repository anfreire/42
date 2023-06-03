/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MateriaSource.cpp                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/17 16:53:07 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 17:56:01 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/MateriaSource.hpp"

MateriaSource::MateriaSource() : IMateriaSource()
{
	for (int i = 0; i < 4; i++)
		this->_knowledge[i] = NULL;
}

MateriaSource::~MateriaSource()
{
	for (int i = 0; i < 4; i++)
	{
		if (this->_knowledge[i])
			delete this->_knowledge[i];
	}
	
}

MateriaSource::MateriaSource(const MateriaSource &src) : IMateriaSource()
{
	for (int i = 0; i < 4; i++)
	{
		if (this->_knowledge[i])
			delete this->_knowledge[i];
		this->_knowledge[i] = src._knowledge[i]->clone();
	}
}

MateriaSource &MateriaSource::operator=(const MateriaSource &src)
{
	for (int i = 0; i < 4; i++)
	{
		if (this->_knowledge[i])
			delete this->_knowledge[i];
		this->_knowledge[i] = src._knowledge[i]->clone();
	}
	return *this;
}

void MateriaSource::learnMateria(AMateria* m)
{
	if (this->_knowledge[3])
		return;
	for (int i = 0; i < 4; i++)
	{
		if (!this->_knowledge[i])
		{
			this->_knowledge[i] = m;
			return;
		}
	}
}

AMateria* MateriaSource::createMateria(std::string const &type)
{
	for (int i = 0; i < 4; i++)
	{
		if (this->_knowledge[i] && this->_knowledge[i]->getType() == type)
			return this->_knowledge[i]->clone();
	}
	return NULL;
}
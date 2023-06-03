/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Character.cpp                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/17 14:59:37 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 18:09:21 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Character.hpp"

Character::Character()
{
	this->_idx = 0;
	this->_floor = NULL;
	for (int i = 0; i < 4; i++)
		this->_loot[i] = NULL;
	this->_name = "Unnamed";
}

Character::Character(const std::string name)
{
	this->_idx = 0;
	this->_floor = NULL;
	for (int i = 0; i < 4; i++)
		this->_loot[i] = NULL;
	this->_name = name;
}

Character::~Character()
{
	for (int i = 0; this->_idx > i; this->_idx--)
		delete this->_loot[this->_idx];
	if (this->_floor)
		delete[] this->_floor;
}

Character::Character(const Character &src)
{
	this->_idx = src._idx;
	for (int i = 0; i < 4; i++)
	{
		if (this->_loot[i])
			delete this->_loot[i];
		this->_loot[i] = src._loot[i]->clone();
	}
	if (this->_floor)
		delete[] this->_floor;
	if (src._floor)
	{
		int i = 0;
		while (src._floor[i] != NULL)
			i++;
		this->_floor = new AMateria*[i + 1];
		for (int j = 0; j < i; j++)
			this->_floor[j] = src._floor[j]->clone();
		this->_floor[i] = NULL;
	}
	else
		this->_floor = NULL;
	this->_name = src._name;
}

Character &Character::operator=(const Character &src)
{
	this->_idx = src._idx;
	for (int i = 0; i < 4; i++)
	{
		if (this->_loot[i])
			delete this->_loot[i];
		this->_loot[i] = src._loot[i]->clone();
	}
	if (this->_floor)
		delete[] this->_floor;
	if (src._floor)
	{
		int i = 0;
		while (src._floor[i] != NULL)
			i++;
		this->_floor = new AMateria*[i + 1];
		for (int j = 0; j < i; j++)
			this->_floor[j] = src._floor[j]->clone();
		this->_floor[i] = NULL;
	}
	else
		this->_floor = NULL;
	this->_name = src._name;
	return *this;
}

std::string	const	&Character::getName() const
{
	return this->_name;
}

void	Character::equip(AMateria *m)
{
	if (this->_idx == 4 || !m)
		return;
	this->_loot[this->_idx] = m->clone();
	this->_idx++;
}

void	Character::unequip(int idx)
{
	if (this->_floor == NULL)
	{
		this->_floor = new AMateria*[2];
		this->_floor[0] = this->_loot[idx];
		this->_floor[1] = NULL;
	}
	else
	{
		int i = 0;
		while (this->_floor[i] != NULL)
			i++;
		AMateria **tmp = new AMateria*[i + 2];
		for (int j = 0; j < i; j++)
			tmp[j] = this->_floor[j];
		tmp[i] = this->_loot[idx];
		tmp[i + 1] = NULL;
		delete[] this->_floor;
		this->_floor = tmp;
	}
	for (int i = idx + 1; idx < 4; i++)
		this->_loot[i - 1] = this->_loot[i];
}

void	Character::use(int	idx, ICharacter& target)
{
	if (this->_loot[idx] != NULL)
		this->_loot[idx]->use(target);
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ClapTrap.cpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/11 12:30:32 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 11:41:36 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ClapTrap.hpp"

ClapTrap::ClapTrap()
{
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_BLUE << "Default constructor called" << COLOR_RESET << std::endl;
	this->_Name = "ClapTrap Unnamed";
	this->_HitPoints = 10;
	this->_EnergyPoints = 10;
	this->_AttackDamage = 0;
}

ClapTrap::~ClapTrap()
{
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_BLUE << "Destructor called" << COLOR_RESET << std::endl;
}

ClapTrap::ClapTrap(const ClapTrap&object)
{
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_BLUE << "Copy constructor called" << COLOR_RESET << std::endl;
	this->_Name = object._Name;
	this->_HitPoints = object._HitPoints;
	this->_EnergyPoints = object._EnergyPoints;
	this->_AttackDamage = object._AttackDamage;
}

ClapTrap&ClapTrap::operator=(const ClapTrap&object)
{
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_BLUE << "Assignation operator called" << COLOR_RESET << std::endl;
	this->_Name = object._Name;
	this->_HitPoints = object._HitPoints;
	this->_EnergyPoints = object._EnergyPoints;
	this->_AttackDamage = object._AttackDamage;
	return (*this);
}

ClapTrap::ClapTrap(const std::string name)
{
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_BLUE << "String constructor called" << COLOR_RESET << std::endl;
	this->_Name = name;
	this->_HitPoints = 10;
	this->_EnergyPoints = 10;
	this->_AttackDamage = 0;
}

void ClapTrap::attack(const std::string &target)
{
	if (this->_EnergyPoints == 0)
	{
		std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " has no energy to attack" << COLOR_RESET << std::endl;
		return ;
	}
	if (this->_HitPoints == 0)
	{
		std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " is dead" << COLOR_RESET << std::endl;
		return ;
	}
	this->_EnergyPoints--;
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_GREEN << " attacks " << COLOR_RESET << COLOR_YELLOW << target << COLOR_RESET << COLOR_GREEN << ", causing " << COLOR_RESET << COLOR_YELLOW << this->_AttackDamage << COLOR_RESET << COLOR_GREEN << " points of damage!" << COLOR_RESET << std::endl;
}

void ClapTrap::takeDamage(unsigned int amount)
{
	if (this->_HitPoints == 0)
	{
		std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " is already dead" << COLOR_RESET << std::endl;
		return ;
	}
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_GREEN << " takes " << COLOR_RESET << COLOR_YELLOW << amount << COLOR_RESET << COLOR_GREEN << " points of damage!" << COLOR_RESET << std::endl;
	this->_HitPoints -= amount;
}

void ClapTrap::beRepaired(unsigned int amount)
{
	if (this->_EnergyPoints == 0)
	{
		std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " has no energy to be repaired" << COLOR_RESET << std::endl;
		return ;
	}
	if (this->_HitPoints == 0)
	{
		std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " is dead" << COLOR_RESET << std::endl;
		return ;
	}
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_GREEN << " is repaired " << COLOR_RESET << COLOR_YELLOW << amount << COLOR_RESET << COLOR_GREEN << " points!" << COLOR_RESET << std::endl;
	this->_HitPoints += amount;
	this->_EnergyPoints--;
}
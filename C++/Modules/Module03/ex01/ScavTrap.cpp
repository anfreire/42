/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ScavTrap.cpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/15 11:04:04 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 11:42:33 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ScavTrap.hpp"

ScavTrap::ScavTrap() : ClapTrap()
{
	std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_BLUE << "Default constructor called" << COLOR_RESET << std::endl;
	this->_Name = "ScavTrap Unnamed";
	this->_HitPoints = 100;
	this->_EnergyPoints = 50;
	this->_AttackDamage = 20;
}

ScavTrap::~ScavTrap()
{
	std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_BLUE << "Destructor called" << COLOR_RESET << std::endl;
}

ScavTrap::ScavTrap(const ScavTrap&object) : ClapTrap(object)
{
	std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_BLUE << "Copy constructor called" << COLOR_RESET << std::endl;
	this->_Name = object._Name;
	this->_HitPoints = object._HitPoints;
	this->_EnergyPoints = object._EnergyPoints;
	this->_AttackDamage = object._AttackDamage;
}

ScavTrap&ScavTrap::operator=(const ScavTrap&object)
{
	std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_BLUE << "Assignation operator called" << COLOR_RESET << std::endl;
	this->_Name = object._Name;
	this->_HitPoints = object._HitPoints;
	this->_EnergyPoints = object._EnergyPoints;
	this->_AttackDamage = object._AttackDamage;
	return (*this);
}

ScavTrap::ScavTrap(const std::string name) : ClapTrap(name)
{
	std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_BLUE << "String constructor called" << COLOR_RESET << std::endl;
	this->_Name = name;
	this->_HitPoints = 100;
	this->_EnergyPoints = 50;
	this->_AttackDamage = 20;
}

void ScavTrap::attack(const std::string &target)
{
	if (this->_EnergyPoints == 0)
	{
		std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " has no energy to attack" << COLOR_RESET << std::endl;
		return ;
	}
	if (this->_HitPoints == 0)
	{
		std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " is dead" << COLOR_RESET << std::endl;
		return ;
	}
	this->_EnergyPoints--;
	std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_GREEN << " attacks " << COLOR_RESET << COLOR_YELLOW << target << COLOR_RESET << COLOR_GREEN << ", causing " << COLOR_RESET << COLOR_YELLOW << this->_AttackDamage << COLOR_RESET << COLOR_GREEN << " points of damage!" << COLOR_RESET << std::endl;
}

void	ScavTrap::guardGate()
{
	if (this->_HitPoints == 0)
	{
		std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " can't guard no gate, he is dead" << COLOR_RESET << std::endl;
		return ;
	}
	std::cout << FONT_BOLD << "ScavTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_GREEN << " has entered in Gate keeper mode" << COLOR_RESET << std::endl;
}
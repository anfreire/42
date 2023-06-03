/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   DiamondTrap.cpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/11 12:30:32 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 11:41:36 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "DiamondTrap.hpp"

DiamondTrap::DiamondTrap(): ClapTrap(), ScavTrap(), FragTrap()
{
	std::cout << FONT_BOLD << "DiamondTrap " << COLOR_RESET << COLOR_BLUE << "Default constructor called" << COLOR_RESET << std::endl;
	ClapTrap::_Name = "DiamondTrap Unnamed";
	DiamondTrap::_name = "DiamondTrap Unnamed";
	DiamondTrap::_HitPoints = FragTrap::_HitPoints;
	DiamondTrap::_EnergyPoints = ScavTrap::_EnergyPoints;
	DiamondTrap::_AttackDamage = FragTrap::_AttackDamage;
}

DiamondTrap::~DiamondTrap()
{
	std::cout << FONT_BOLD << "DiamondTrap " << COLOR_RESET << COLOR_BLUE << "Destructor called" << COLOR_RESET << std::endl;
}

DiamondTrap::DiamondTrap(const DiamondTrap&object) : ClapTrap(object), ScavTrap(object), FragTrap(object)
{
	std::cout << FONT_BOLD << "DiamondTrap " << COLOR_RESET << COLOR_BLUE << "Copy constructor called" << COLOR_RESET << std::endl;
	ClapTrap::_Name = object._Name;
	DiamondTrap::_name = object._name;
	DiamondTrap::_HitPoints = FragTrap::_HitPoints = object._HitPoints;
	DiamondTrap::_EnergyPoints = ScavTrap::_EnergyPoints = object._EnergyPoints;
	DiamondTrap::_AttackDamage = FragTrap::_AttackDamage = object._AttackDamage;	
}

DiamondTrap&DiamondTrap::operator=(const DiamondTrap&object)
{
	std::cout << FONT_BOLD << "DiamondTrap " << COLOR_RESET << COLOR_BLUE << "Assignation operator called" << COLOR_RESET << std::endl;
	ClapTrap::_Name = object._Name;
	DiamondTrap::_name = object._name;
	DiamondTrap::_HitPoints = FragTrap::_HitPoints = object._HitPoints;
	DiamondTrap::_EnergyPoints = ScavTrap::_EnergyPoints = object._EnergyPoints;
	DiamondTrap::_AttackDamage = FragTrap::_AttackDamage = object._AttackDamage;
	return (*this);
}

DiamondTrap::DiamondTrap(const std::string name): ScavTrap(name), FragTrap(name)
{
	std::cout << FONT_BOLD << "DiamondTrap " << COLOR_RESET << COLOR_BLUE << "Default constructor called" << COLOR_RESET << std::endl;
	ClapTrap::_Name = name;
	DiamondTrap::_name = name;
	DiamondTrap::_HitPoints = FragTrap::_HitPoints;
	DiamondTrap::_EnergyPoints = ScavTrap::_EnergyPoints;
	DiamondTrap::_AttackDamage = FragTrap::_AttackDamage;
}


void DiamondTrap::attack(const std::string &target)
{
	FragTrap::attack(target);
}

void DiamondTrap::whoAmI()
{
	std::cout << FONT_BOLD << "DiamondTrap " << COLOR_RESET << COLOR_BLUE << "Who am I?" << COLOR_RESET << std::endl;
	std::cout << FONT_BOLD << "DiamondTrap " << COLOR_RESET << COLOR_BLUE << "Name: " << DiamondTrap::_name << COLOR_RESET << std::endl;
	std::cout << FONT_BOLD << "ClapTrap " << COLOR_RESET << COLOR_BLUE << "Name: " << ClapTrap::_Name << COLOR_RESET << std::endl;
}


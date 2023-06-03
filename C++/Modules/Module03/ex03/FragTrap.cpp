/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FragTrap.cpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/15 11:04:04 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 11:42:33 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "FragTrap.hpp"

FragTrap::FragTrap() : ClapTrap()
{
	std::cout << FONT_BOLD << "FragTrap " << COLOR_RESET << COLOR_BLUE << "Default constructor called" << COLOR_RESET << std::endl;
	this->_Name = "FragTrap Unnamed";
	this->_HitPoints = 100;
	this->_EnergyPoints = 100;
	this->_AttackDamage = 30;
}

FragTrap::~FragTrap()
{
	std::cout << FONT_BOLD << "FragTrap " << COLOR_RESET << COLOR_BLUE << "Destructor called" << COLOR_RESET << std::endl;
}

FragTrap::FragTrap(const FragTrap&object) : ClapTrap(object)
{
	std::cout << FONT_BOLD << "FragTrap " << COLOR_RESET << COLOR_BLUE << "Copy constructor called" << COLOR_RESET << std::endl;
	this->_Name = object._Name;
	this->_HitPoints = object._HitPoints;
	this->_EnergyPoints = object._EnergyPoints;
	this->_AttackDamage = object._AttackDamage;
}

FragTrap&FragTrap::operator=(const FragTrap&object)
{
	std::cout << FONT_BOLD << "FragTrap " << COLOR_RESET << COLOR_BLUE << "Assignation operator called" << COLOR_RESET << std::endl;
	this->_Name = object._Name;
	this->_HitPoints = object._HitPoints;
	this->_EnergyPoints = object._EnergyPoints;
	this->_AttackDamage = object._AttackDamage;
	return (*this);
}

FragTrap::FragTrap(const std::string name) : ClapTrap(name)
{
	std::cout << FONT_BOLD << "FragTrap " << COLOR_RESET << COLOR_BLUE << "String constructor called" << COLOR_RESET << std::endl;
	this->_Name = name;
	this->_HitPoints = 100;
	this->_EnergyPoints = 100;
	this->_AttackDamage = 30;
}

void	FragTrap::highFivesGuys(void)
{
	if (this->_HitPoints == 0)
	{
		std::cout << FONT_BOLD << "FragTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_RED << " can't give no high fives, he's dead!" << COLOR_RESET << std::endl;
		return ;
	}
	std::cout << FONT_BOLD << "FragTrap " << COLOR_RESET << COLOR_YELLOW << this->_Name << COLOR_RESET << COLOR_GREEN << " wants to give a high five" << COLOR_RESET << std::endl;
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HumanB.cpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/05 16:27:36 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/05 21:17:08 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "HumanB.hpp"

HumanB::HumanB(std::string name)
{
    this->name = name;
}

HumanB::~HumanB(void)
{
    std::cout << this->name << " is dead" << std::endl;
    return;
}

void    HumanB::setWeapon(Weapon &weapon)
{
    this->weaponPointer = &weapon;
}

void    HumanB::attack(void)
{
    std::cout << this->name << " attacks with their " << this->weaponPointer->getType() << std::endl;
}
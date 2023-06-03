/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HumanA.cpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/05 16:12:34 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/05 21:17:32 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "HumanA.hpp"

HumanA::HumanA(std::string name, Weapon &weapon)
{
    this->name = name;
    this->weaponPointer = &weapon;
}

HumanA::~HumanA(void)
{
    std::cout << this->name << " is dead" << std::endl;
    return;
}

void    HumanA::attack(void)
{
    std::cout << this->name << " attacks with their " << this->weaponPointer->getType() << std::endl;
}
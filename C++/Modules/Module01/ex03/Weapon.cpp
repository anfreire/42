/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Weapon.cpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/05 16:24:52 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/23 17:51:12 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Weapon.hpp"

Weapon::Weapon(std::string  type)
{
    this->type = type;
}

Weapon::~Weapon(void)
{
    std::cout << this->type << " is dropped" << std::endl;
    return;
}

std::string Weapon::getType(void) const
{   
    return this->type;
}

void    Weapon::setType(std::string  type)
{
    this->type = type;
}
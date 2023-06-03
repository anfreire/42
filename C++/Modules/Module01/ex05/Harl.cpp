/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Harl.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/06 02:45:54 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/06 03:25:29 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Harl.hpp"
#include <map>

Harl::Harl(void)
{
    return;
}

Harl::~Harl(void)
{
    return;
}

void    Harl::complain(std::string level)
{
    std::map<std::string, void (Harl::*)(void)> map;
    map["DEBUG"] = &Harl::debug;
    map["debug"] = &Harl::debug;
    map["Debug"] = &Harl::error;
    map["INFO"] = &Harl::info;
    map["info"] = &Harl::info;
    map["Info"] = &Harl::info;
    map["WARNING"] = &Harl::warning;
    map["warning"] = &Harl::warning;
    map["Warning"] = &Harl::warning;
    map["ERROR"] = &Harl::error;
    map["error"] = &Harl::error;
    map["Error"] = &Harl::error;
    (this->*map[level])();
}

void    Harl::debug( void )
{
    std::cout << "I love to get extra bacon for my 7XL-double-cheese-triple-pickle-special-ketchup burger. I just love it!" << std::endl;
}

void    Harl::info( void )
{
    std::cout << "I cannot believe adding extra bacon cost more money. You don't put enough! If you did I would not have to ask for it!" << std::endl;
}

void    Harl::warning( void )
{
    std::cout << "I think I deserve to have some extra bacon for free. I've been coming here for years and you just started working here last month." << std::endl;
}

void    Harl::error( void )
{
    std::cout << "This is unacceptable, I want to speak to the manager now." << std::endl;
}


/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Harl.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/06 02:45:54 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/23 17:49:38 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Harl.hpp"

Harl::Harl(void)
{
    levelMap["DEBUG"] = DEBUG;
    levelMap["INFO"] = INFO;
    levelMap["WARNING"] = WARNING;
    levelMap["ERROR"] = ERROR;
}

Harl::~Harl(void)
{
    return;
}

void    Harl::complain(std::string level)
{
    std::map<std::string, Level>::iterator it = levelMap.find(level);
    if (it == levelMap.end())
    {
        std::cout << "[ Probably complaining about insignificant problems ]" << std::endl;
        return;
    }
    switch (levelMap[level])
    {
        case DEBUG:
            debug();
            info();
            warning();
            error();
            break;
        case INFO:
            info();
            warning();
            error();
            break;
        case WARNING:
            warning();
            error();
            break;
        case ERROR:
            error();
            break;
    }
}

void    Harl::debug( void )
{
    std::cout << "[ DEBUG ]" << std::endl;
    std::cout << "I love to get extra bacon for my 7XL-double-cheese-triple-pickle-special-ketchup burger. I just love it!" << std::endl << std::endl;
}

void    Harl::info( void )
{
    std::cout << "[ INFO ]" << std::endl;
    std::cout << "I cannot believe adding extra bacon cost more money. You don't put enough! If you did I would not have to ask for it!" << std::endl << std::endl;
}

void    Harl::warning( void )
{
    std::cout << "[ WARNING ]" << std::endl;
    std::cout << "I think I deserve to have some extra bacon for free. I've been coming here for years and you just started working here last month." << std::endl << std::endl;
}

void    Harl::error( void )
{
    std::cout << "[ ERROR ]" << std::endl;
    std::cout << "This is unacceptable, I want to speak to the manager now." << std::endl << std::endl;
}


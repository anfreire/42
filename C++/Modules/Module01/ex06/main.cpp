/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/06 03:20:26 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/23 17:48:41 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Harl.hpp"

int main(int ac, char **av)
{
    Harl harl;
    if (ac != 2)
    {
        std::cout << "[ Probably complaining about insignificant problems ]" << std::endl;
        return 0;
    }
    harl.complain(av[1]);
    return 0;
}
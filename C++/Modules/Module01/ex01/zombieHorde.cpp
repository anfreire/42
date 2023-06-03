/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   zombieHorde.cpp                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/04 20:11:28 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/13 21:17:01 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Zombie.hpp"

Zombie* zombieHorde( int N, std::string name )
{
	Zombie* horde = new Zombie[N];
    for (int i = 0; i < N; i++)
    {
        horde[i].setName(name);
    }

    return &horde[0];
}
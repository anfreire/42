/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/04 18:21:37 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/13 21:11:01 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Zombie.hpp"

int main(void)
{
	Zombie	*horde = zombieHorde(4 , "foo");
	
	for (int i = 0; i < 4; i++)
	{
		horde[i].announce();
	}

	delete[] horde;
	
	return (0);
}
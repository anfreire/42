/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/04 18:21:37 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/04 20:02:52 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Zombie.hpp"

int main(void)
{
	Zombie	*foo = newZombie("foo");
	foo->announce();
	delete foo;
	randomChump("bar");

	std::cout << std::endl;

	randomChump("corge");
	Zombie	*fred = newZombie("fred");
	fred->announce();
	delete fred;

	
	return 0;
}
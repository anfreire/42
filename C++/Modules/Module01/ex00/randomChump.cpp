/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   randomChump.cpp                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/04 17:49:43 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/04 18:40:46 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Zombie.hpp"


void	randomChump( std::string name )
{
	Zombie	newZombieInstance(name);
	newZombieInstance.announce();
	return;
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/11 13:00:05 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 15:18:03 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "DiamondTrap.hpp"

int main()
{
	DiamondTrap diamond("Diamond");
	diamond.whoAmI();
	diamond.attack("Enemy");
	diamond.takeDamage(10);
	diamond.beRepaired(10);
	diamond.guardGate();
	diamond.highFivesGuys();
	
	
	return (0);
}
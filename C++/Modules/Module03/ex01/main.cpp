/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/11 13:00:05 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 11:35:27 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ScavTrap.hpp"

int main()
{
	ScavTrap jeff("Jeff");
	ScavTrap noname;
	ScavTrap jeff_copy(jeff);
	ScavTrap jeff_assign;
	jeff_assign = jeff;

	jeff.attack("noname");
	jeff.takeDamage(5);
	jeff.beRepaired(5);
	noname.attack("jeff");
	noname.takeDamage(5);
	noname.beRepaired(5);
	jeff_copy.attack("jeff");
	jeff_copy.takeDamage(5);
	jeff_copy.beRepaired(5);
	jeff_assign.attack("jeff");
	jeff_assign.takeDamage(5);
	jeff_assign.beRepaired(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.guardGate();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.guardGate();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.guardGate();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.guardGate();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.guardGate();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.guardGate();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.guardGate();
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	return (0);
}
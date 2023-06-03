/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/11 13:00:05 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 11:40:53 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "FragTrap.hpp"

int main()
{
	FragTrap jeff("Jeff");
	FragTrap noname;
	FragTrap jeff_copy(jeff);
	FragTrap jeff_assign;
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
	noname.highFivesGuys();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.highFivesGuys();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.highFivesGuys();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.highFivesGuys();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.highFivesGuys();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.highFivesGuys();
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.highFivesGuys();
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
	jeff.attack("noname");
	return (0);
}
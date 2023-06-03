/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/11 13:00:05 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 11:01:40 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ClapTrap.hpp"

int main()
{
	ClapTrap jeff("Jeff");
	ClapTrap noname;
	ClapTrap jeff_copy(jeff);
	ClapTrap jeff_assign;
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
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	jeff.attack("noname");
	noname.takeDamage(5);
	noname.takeDamage(5);
	noname.takeDamage(5);
	return (0);
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/25 18:56:11 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/29 22:44:46 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Base.hpp"


int main(void)
{
	Base base;

	for (int i = 0; i < 100; i++)
	{						  
		std::cout << BACKGROUND_BLUE << "[ Iteration nº " << i + 1 << " ]" << RESET << std::endl;
		Base *someBase = base.generate();
		std::cout << std::endl << COLOR_WHITE << "Trying to identify the pointer..." << RESET << std::endl;
		base.identify(someBase);
		std::cout << std::endl << COLOR_WHITE << "Trying to identify the reference..." << RESET << std::endl;
		base.identify(*someBase);
		delete someBase;					
		std::cout << std::endl << BACKGROUND_BLACK << "----------------------------------------------------------------" << RESET << std::endl;
	}
	return (0);
}
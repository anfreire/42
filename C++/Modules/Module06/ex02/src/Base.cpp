/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Base.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/29 21:36:07 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/30 16:23:08 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Base.hpp"

Base	*Base::generate(void)
{
	int randNum = rand() % 3 + 1;
	if (randNum == 1)
		return (new A);
	else if (randNum == 2)
		return( new B);
	else
		return (new C);
}

void	Base::identify(Base *p)
{
	if (dynamic_cast<A*>(p))
		std::cout << COLOR_GREEN << "Found it! The pointer is type " << COLOR_WHITE << "A"  << RESET << std::endl;
	else if (dynamic_cast<B*>(p))
		std::cout << COLOR_GREEN << "Found it! The pointer is type " << COLOR_WHITE << "B"  << RESET << std::endl;
	else if (dynamic_cast<C*>(p))
		std::cout << COLOR_GREEN << "Found it! The pointer is type " << COLOR_WHITE << "C"  << RESET << std::endl;
	else
		std::cout << COLOR_RED << "Couldn't find it..." << RESET << std::endl;
}

void	Base::identify(Base &p)
{
	try
	{
		p = dynamic_cast<A&>(p);
		std::cout << COLOR_GREEN << "Found it! The reference is type " << COLOR_WHITE << "A"  << RESET << std::endl;
	}
	catch(std::exception &e)
	{
		std::cout << COLOR_RED << "Ok... Let's try the next one... At least we know it's not type " << COLOR_WHITE << "A" << RESET << std::endl;
		try
		{
			p = dynamic_cast<B&>(p);
			std::cout << COLOR_GREEN << "Found it! The reference is type " << COLOR_WHITE << "B"  << RESET << std::endl;
		
		}
		catch(std::exception &e)
		{
			std::cout << COLOR_RED << "Ok... Let's try the next one... At least we know it's not type " << COLOR_WHITE << "B" << RESET << std::endl;
			try
			{
				p = dynamic_cast<C&>(p);
				std::cout << COLOR_GREEN << "Found it! The reference is type " << COLOR_WHITE << "C"  << RESET << std::endl;
			}
			catch(std::exception &e)
			{
				std::cout << COLOR_RED << "Couldn't find it..." << RESET << std::endl;
				return;
			}
		}
	}
}
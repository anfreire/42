/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 16:52:36 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/07 18:15:59 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/BitcoinExchange.hpp"

int main(int ac, char **av)
{
	if (ac != 2)
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << "Invalid number of arguments. Recieved " << COLOR_RED << ac - 1 << COLOR_WHITE ", expected 1." << std::endl;
		return (1);
	}
	try
	{
		BitcoinExchange exchange("data.csv", av[1]);
		exchange.parseData();
		exchange.parseInput();
		exchange.run();
	}
	catch(const std::exception& e)
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << e.what() << RESET << std::endl;
		return (1);
	}
	return (0);
}
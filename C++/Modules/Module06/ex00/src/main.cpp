/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/25 18:56:11 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/29 18:20:36 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/ScalarConverter.hpp"


int main(int ac, char **av)
{
	if (ac != 2)
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << "Invalid number of arguments. Recieved " << COLOR_RED << ac - 1 << COLOR_WHITE ", expected 1." << std::endl;
		return (1);
	}
	else
	{
		ScalarConverter *staticScalarConverter;
		staticScalarConverter->convert(av[1]);
	};
	return (0);
}
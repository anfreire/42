/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   megaphone.cpp                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/02/28 23:47:03 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/10 18:54:27 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>
#include <cstring>

int	main(int ac, char **av)
{
	if (ac == 1)
		std::cout << "* LOUD AND UNBEARABLE FEEDBACK NOISE *" << std::endl;
	else
	{
		for (int i = 1; i < ac; i++)
		{
			if (i > 1)
				std::cout << " ";
			for (size_t j = 0; j < std::strlen(av[i]); j++)
				av[i][j] = std::toupper(av[i][j]);
			std::cout << av[i];
		}
		std::cout << std::endl;
	}
	return 0;
}
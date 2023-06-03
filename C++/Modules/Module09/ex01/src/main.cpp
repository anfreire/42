/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/13 18:52:05 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/13 21:19:47 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

# include "../inc/RPN.hpp"

int main(int ac, char **av)
{
	if (ac != 2)
	{
		std::cerr << COLOR_RED << "Error " << COLOR_WHITE << "Invalid number of arguments. Recieved " << COLOR_RED << ac - 1 << COLOR_WHITE ", expected 1." << std::endl;
		return (1);
	}
    try
    {       
        RPN rpn(av[1]);
        rpn.run();
    }
    catch (std::exception &e)
    {
        std::cerr << COLOR_RED << "Error " << COLOR_WHITE << e.what() << RESET << std::endl;
    }
	return (0);
}
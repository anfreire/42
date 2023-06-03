/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/13 18:52:05 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/14 14:49:14 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

# include "../inc/PmergeMe.hpp"

int main(int ac, char **av)
{
	if (ac < 2)
	{
		std::cerr << COLOR_RED << "Error " << COLOR_WHITE << "Invalid number of arguments." << RESET << std::endl;
		return (1);
	}
    try
    {       
        PmergeMe p(av);
        std::deque<int> d;
        std::list<int> l;
        std::cout << std::endl;
    }
    catch (std::exception &e)
    {
        std::cerr << COLOR_RED << "Error " << COLOR_WHITE << e.what() << RESET << std::endl;
    }
	return (0);
}
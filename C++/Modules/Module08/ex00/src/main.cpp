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

#include "../inc/easyfind.hpp"

int main(void)
{
	std::list<int> LIST;
	std::deque<int> DEQUE;
	std::vector<int> VECTOR;

	for (int i = 0; i < 42; i++)
	{
		LIST.push_back(i);
		DEQUE.push_back(i);
		VECTOR.push_back(i);
	}
	std::cout << COLOR_GREEN << "List: " << COLOR_WHITE << easyfind(LIST, 0) << std::endl;
	std::cout << COLOR_GREEN << "Deque: " << COLOR_WHITE << easyfind(DEQUE, 0) << std::endl;
	std::cout << COLOR_GREEN << "Vector: " << COLOR_WHITE << easyfind(VECTOR, 0) << std::endl;
	std::cout << COLOR_RED << "List: " << COLOR_WHITE << easyfind(LIST, 42) << std::endl;
	std::cout << COLOR_RED << "Deque: " << COLOR_WHITE << easyfind(DEQUE, 42) << std::endl;
	std::cout << COLOR_RED << "Vector: " << COLOR_WHITE << easyfind(VECTOR, 42) << std::endl;
	return (0);
}
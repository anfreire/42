/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/01 14:45:51 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/10 15:54:14 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/iter.hpp"

void intZero(int &n)
{
	n = 0;
}

void strZero(std::string &s)
{
	s.clear();
	s.append("0");
}

int main(void)
{
	int	intArray[5] = {1, 2, 3, 4, 5};
	std::string	strArray[5] = {"Hello", "World", "42", "Lisboa", "Portugal"};
	
	std::cout << "intArray: " << intArray[0] << " " << intArray[1] << " " << intArray[2] << " " << intArray[3] << " " << intArray[4] << std::endl;
	iter(intArray, 5, intZero);
	std::cout << "intArray: " << intArray[0] << " " << intArray[1] << " " << intArray[2] << " " << intArray[3] << " " << intArray[4] << std::endl;

	std::cout << "strArray: " << strArray[0] << " " << strArray[1] << " " << strArray[2] << " " << strArray[3] << " " << strArray[4] << std::endl;
	iter(strArray, 5, strZero);
	std::cout << "strArray: " << strArray[0] << " " << strArray[1] << " " << strArray[2] << " " << strArray[3] << " " << strArray[4] << std::endl;
	return (0);
}
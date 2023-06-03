/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:35:29 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 17:00:34 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Cat.hpp"
#include "../inc/Dog.hpp"
#include "../inc/WrongCat.hpp"
#include "../inc/Animal.hpp"
#include "../inc/WrongAnimal.hpp"


# define BLUE_BACKGROUND "\033[0;33;44m"

int main()
{
	std::cout << BLUE_BACKGROUND << "------------------------" << RESET << std::endl;
	Animal *array[10];
	for (int i = 0; i < 10; i ++)
	{
		std::cout << "Creating the Animal at index " << i << std::endl;
		if (i < 5)
			array[i] = new Dog();
		else
			array[i] = new Cat();
	}
	std::cout << BLUE_BACKGROUND << "------------------------" << RESET << std::endl;
	for (int i = 0; i < 10; i ++)
	{
		std::cout << "Deleting the Animal at index " << i << std::endl;
		delete array[i];
	}
	std::cout << BLUE_BACKGROUND << "------------------------" << RESET << std::endl;
	return (0);	
}
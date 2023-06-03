/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:35:29 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 14:22:42 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Cat.hpp"
#include "../inc/Dog.hpp"



# define BLUE_BACKGROUND "\033[0;33;44m"
# define RED_BACKGROUND "\033[0;33;41m"

int main()
{
	std::cout << BLUE_BACKGROUND << "------------------------" << RESET << std::endl;
	Cat cat;
	std::cout << "Animal type: " << cat.getType() << std::endl;
	cat.makeSound();
	std::cout << BLUE_BACKGROUND << "------------------------" << RESET << std::endl;
	Dog dog;
	std::cout << "Animal type: " << dog.getType() << std::endl;
	dog.makeSound();
	std::cout << BLUE_BACKGROUND << "------------------------" << RESET << std::endl;
	std::cout << RED_BACKGROUND << "Bellow is the non instantiable Animal class" << RESET << std::endl << RED_BACKGROUND << "*line 33 main.cpp" << RESET << std::endl;
	// Animal animal;
	// std::cout << "Animal type: " << animal.getType() << std::endl;
	// animal.makeSound();
	std::cout << BLUE_BACKGROUND << "------------------------" << RESET << std::endl;
	return (0);	
}
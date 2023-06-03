/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:35:29 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:36:16 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Cat.hpp"
#include "../inc/Dog.hpp"
#include "../inc/WrongCat.hpp"
#include "../inc/Animal.hpp"
#include "../inc/WrongAnimal.hpp"

# define RED_BACKGROUND "\033[0;33;41m"
# define BLUE_BACKGROUND "\033[0;33;44m"

int main()
{
	std::cout << RED_BACKGROUND << "------------------------" << RESET << std::endl;
	const Animal animal;
	const Cat cat;
	const Dog dog;
	const WrongAnimal wrongAnimal;
	const WrongCat wrongCat;
	std::cout << RED_BACKGROUND << "------------------------" << RESET << std::endl;
	std::cout << "This is how the " << animal.getType() << " sounds:" << std::endl;
	animal.makeSound();
	std::cout << "This is how the " << cat.getType() << " sounds:" << std::endl;
	cat.makeSound();
	std::cout << "This is how the " << dog.getType() << " sounds:" << std::endl;
	dog.makeSound();
	std::cout << "This is how the " << wrongAnimal.getType() << " sounds:" << std::endl;
	wrongAnimal.makeSound();
	std::cout << "This is how the " << wrongCat.getType() << " sounds:" << std::endl;
	wrongCat.makeSound();
	std::cout << RED_BACKGROUND << "------------------------" << RESET << std::endl;
	const Animal *animalPtr = new Animal();
	const Animal *catPtr = new Cat();
	const Animal *dogPtr = new Dog();
	const WrongAnimal *wrongAnimalPtr = new WrongAnimal();
	const WrongAnimal *wrongCatPtr = new WrongCat();
	std::cout << RED_BACKGROUND << "------------------------" << RESET << std::endl;
	std::cout << "This is how the " << animalPtr->getType() << " sounds:" << std::endl;
	animalPtr->makeSound();
	std::cout << "This is how the " << catPtr->getType() << " sounds:" << std::endl;
	catPtr->makeSound();
	std::cout << "This is how the " << dogPtr->getType() << " sounds:" << std::endl;
	dogPtr->makeSound();
	std::cout << "This is how the " << wrongAnimalPtr->getType() << " sounds:" << std::endl;
	wrongAnimalPtr->makeSound();
	std::cout << "This is how the " << wrongCatPtr->getType() << " sounds:" << std::endl;
	wrongCatPtr->makeSound();
	std::cout << RED_BACKGROUND << "------------------------" << RESET << std::endl;
	delete animalPtr;
	delete catPtr;
	delete dogPtr;
	delete wrongAnimalPtr;
	delete wrongCatPtr;
	return (0);	
}
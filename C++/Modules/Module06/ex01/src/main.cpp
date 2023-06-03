/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/25 18:56:11 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/29 20:33:07 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Serializer.hpp"
#include "../inc/Data.hpp"


int main(void)
{
	Data data;
	std::cout << COLOR_MAGENTA << "Hello Ladies and Gentlemen! Today you will witness the power of serialization!" << RESET << std::endl;
	std::cout << COLOR_MAGENTA << "Now, I will show you my fellow assistants, Data:" << RESET << std::endl;
	std::cout << COLOR_WHITE << data.memberChar << RESET << " as a character member." << std::endl;
	std::cout << COLOR_WHITE << data.memberDouble << RESET << " as a double member." << std::endl;
	std::cout << COLOR_WHITE << data.memberFloat << RESET << " as a float member." << std::endl;
	std::cout << COLOR_WHITE << data.memberInt << RESET << " as an integer member." << std::endl;
	std::cout << COLOR_WHITE << data.memberString << RESET << " as a string member." << std::endl;
	std::cout << COLOR_MAGENTA << "Impressive! Let's fit them into a uintptr_t, shall we?" << RESET << std::endl;
	uintptr_t serialized = Serializer::serialize(&data);
	std::cout << COLOR_MAGENTA << "Done! Let's see what we got:" << RESET << std::endl;
	std::cout << COLOR_WHITE << serialized << RESET << std::endl;
	std::cout << COLOR_MAGENTA << "Now, let's bring them back to life!" << RESET << std::endl;
	Data *deserialized = Serializer::deserialize(serialized);
	std::cout << COLOR_MAGENTA << "And here they are:" << RESET << std::endl;
	std::cout << COLOR_WHITE << deserialized->memberChar << RESET << " as a character member." << std::endl;
	std::cout << COLOR_WHITE << deserialized->memberDouble << RESET << " as a double member." << std::endl;
	std::cout << COLOR_WHITE << deserialized->memberFloat << RESET << " as a float member." << std::endl;
	std::cout << COLOR_WHITE << deserialized->memberInt << RESET << " as an integer member." << std::endl;
	std::cout << COLOR_WHITE << deserialized->memberString << RESET << " as a string member." << std::endl;
	std::cout << COLOR_MAGENTA << "Voilà! I hope you enjoyed the show!" << RESET << std::endl;
	
	
	return (0);
}
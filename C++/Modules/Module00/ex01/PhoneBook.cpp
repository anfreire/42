/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PhoneBook.cpp                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/02 03:19:39 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/10 16:05:52 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "PhoneBook.hpp"

PhoneBook::PhoneBook(void)
{
	return;
}

PhoneBook::~PhoneBook(void)
{
	for (int i = 0; i < 8; i++)
	{
		this->contacts[i].emptyContact();
	}
	return;
}

void	PhoneBook::add(void)
{
	std::string 		firstName;
	std::string 		lastName;
	std::string 		nickName;
	std::string			phoneNumberString;
	std::string 		darkestSecret;
	Contact				newContact;
	while (1)
	{
		std::cout << std::endl << "Enter first name: ";
		getline(std::cin, firstName);
		if (newContact.setterFirstName(firstName))
			break;
		std::cout << "Invalid first name!" << std::endl;
	}
	while (1)
	{
		std::cout << std::endl << "Enter last name: ";
		getline(std::cin, lastName);
		if (newContact.setterLastName(lastName))
			break;
		std::cout << "Invalid last name!" << std::endl;
	}
	while (1)
	{
		std::cout << std::endl << "Enter nickname: ";
		getline(std::cin, nickName);
		if (newContact.setterNickName(nickName))
			break;
		std::cout << "Invalid nickname!" << std::endl;
	}
	while (1)
	{
		std::cout << std::endl << "Enter phone number: ";
		getline(std::cin, phoneNumberString);
		if (newContact.setterPhoneNumber(phoneNumberString))
			break;
		std::cout << "Invalid phone number!" << std::endl;
	}
	while (1)
	{
		std::cout << std::endl << "Enter darkest secrest: ";
		getline(std::cin, darkestSecret);
		if (newContact.setterDarkestSecret(darkestSecret))
			break;
		std::cout << "Invalid darkest secret!" << std::endl;
	}
	if (this->phoneBookLength == 8)
	{
		for (size_t i = 0; i < 7; i++)
		{
			this->contacts[i] = this->contacts[i + 1];
		}
		this->contacts[7] = newContact;
		std::cout << std::endl << "Contact successfully added!" << std::endl << std::endl;
		return;
	}
	this->contacts[this->phoneBookLength] = newContact;
	this->phoneBookLength++;
	std::cout << "Contact successfully added!" << std::endl << std::endl;
	return;

}

std::string	PhoneBook::returnPrintableSearchString(std::string oldString)
{
	std::string	smallerNamesBuffer = "          ";
	std::string	newString;

	if (oldString.length() > 9)
	{
		newString = oldString.substr(0, 9);
		newString.append(".");
	}
	else
	{
		newString = oldString;
		newString.append(smallerNamesBuffer.substr(0, 10 - oldString.length()));
	}
	return ((std::string)newString);
}

void	PhoneBook::search(void)
{
	std::string 			FirstName;
	std::string			LastName;
	std::string			NickName;

	if (this->phoneBookLength == 0)
	{
		std::cout << "Phonebook is empty!" << std::endl << std::endl;
		return;
	}
	std::cout << std::endl << "+-------------------------------------------+" << std::endl;
	std::cout << "|   Index  |First Name| Last Name| Nickname |" << std::endl;
	std::cout << "+----------+----------+----------+----------+" << std::endl;
	for (size_t i = 0; (int)i < this->phoneBookLength; i++)
	{
		if (i > 0)
			std::cout << "+----------+----------+----------+----------+" << std::endl;
		std::cout << "|" << this->returnPrintableSearchString(mylib::ft_itoa((int)(i + 1)).append(".")) << "|";
		FirstName = this->contacts[(int)i].getterFirstName();
		std::cout << this->returnPrintableSearchString(FirstName) << "|";
		LastName = this->contacts[(int)i].getterLastName();
		std::cout << this->returnPrintableSearchString(LastName) << "|";
		NickName = this->contacts[(int)i].getterNickName();
		std::cout << this->returnPrintableSearchString(NickName) << "|" << std::endl;
	}
	std::cout << "+-------------------------------------------+" << std::endl << std::endl;
	std::string	index;
	while (1)
	{
		std::cout << "Enter the index of the contact you want to see: ";
		getline(std::cin, index);
		if (mylib::checkInput(index) && mylib::isNumber(index) && atoi(index.c_str()) <= this->phoneBookLength && atoi(index.c_str()) >= 1)
		{
			std::cout << std::endl << "First name: " << this->contacts[atoi(index.c_str()) - 1].getterFirstName() << std::endl;
			std::cout << "Last name: " << this->contacts[atoi(index.c_str()) - 1].getterLastName() << std::endl;
			std::cout << "Nickname: " << this->contacts[atoi(index.c_str()) - 1].getterNickName() << std::endl;
			std::cout << "Phone number: " << this->contacts[atoi(index.c_str()) - 1].getterPhoneNumber() << std::endl;
			std::cout << "Darkest Secret: " << this->contacts[atoi(index.c_str()) - 1].getterDarkestSecret() << std::endl << std::endl;
			return;
		}
		std::cout << "Invalid index!" << std::endl;
	}
	
}

void	PhoneBook::exit(void)
{
	this->~PhoneBook();
	std::exit(0);
}

int	PhoneBook::phoneBookLength = 0;
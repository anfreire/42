/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Contact.cpp                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/02 03:19:45 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/10 16:04:43 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Contact.hpp"

void	Contact::emptyContact(void)
{
	this->firstName.clear();
	this->lastName.clear();
	this->phoneNumber = 0;
	this->darkestSecret.clear();

	return;
}

Contact::Contact(void)
{
	this->emptyContact();

	return;
}

Contact::~Contact(void)
{
	this->emptyContact();

	return;
}

std::string	Contact::getterFirstName(void)
{
	return this->firstName;
}

std::string	Contact::getterLastName(void)
{
	return this->lastName;
}

std::string	Contact::getterNickName(void)
{
	return this->nickName;
}

unsigned int Contact::getterPhoneNumber(void)
{
	return this->phoneNumber;
}

std::string Contact::getterDarkestSecret(void)
{
	return this->darkestSecret;
}

bool	Contact::setterFirstName(std::string firstName)
{
	if (!mylib::checkInput(firstName))
		return false;
	this->firstName = firstName;
	return true;
}

bool	Contact::setterLastName(std::string lastName)
{
	if (!mylib::checkInput(lastName))
		return false;
	this->lastName = lastName;
	return true;
}

bool	Contact::setterNickName(std::string nickName)
{
	if (!mylib::checkInput(nickName))
		return false;
	this->nickName = nickName;
	return true;
}

bool	Contact::setterPhoneNumber(std::string phoneNumber)
{
	if (!mylib::checkInput(phoneNumber) || !isdigit(phoneNumber[0]))
		return false;
	this->phoneNumber = atoi(phoneNumber.c_str());
	return true;
}

bool	Contact::setterDarkestSecret(std::string darkestSecret)
{
	if (!mylib::checkInput(darkestSecret))
		return false;
	this->darkestSecret = darkestSecret;
	return true;
}

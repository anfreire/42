/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Intern.cpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/24 13:56:06 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 16:57:53 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Intern.hpp"

Intern::Intern()
{
	return ;
}

Intern::Intern(const Intern &src)
{
	(void)src;
	return;
}

Intern &Intern::operator=(const Intern &src)
{
	(void)src;
	return *this;
}

Intern::~Intern()
{
	return ;
}

int		Intern::identifyForm(const std::string name)
{
	std::string _name_ = name;
	for (int i = 0; i < (int)std::strlen(name.c_str()); i++)
		_name_[i] = std::tolower(name[i]);
	for (int i = 0; i < 6; i+=2)
	{
		if (!strcmp(this->_forms[i].c_str(), _name_.c_str()) || (_name_.find(this->_forms[i]) != std::string::npos && _name_.find(this->_forms[i]) != std::string::npos))
			return (i);
	}
	return (-1);
}

AForm	*Intern::makeForm(const std::string name, const std::string target)
{
	switch (this->identifyForm(name))
	{
		case (0):
			return new RobotomyRequestForm(target);
		case (2):
			return new PresidentialPardonForm(target);
		case (4):
			return new ShrubberyCreationForm(target);
		default:
			std::cout << B_RED << "Intern" << RESET << RED << " The form " << RESET << WHITE << name << RESET << RED << "  is nonexistent" << std::endl;
			return NULL;
	}
}

std::string Intern::_forms[] = {
	"robotomy",
	"request",
	"presidential",
	"pardon",
	"shrubbery",
	"creation"
};
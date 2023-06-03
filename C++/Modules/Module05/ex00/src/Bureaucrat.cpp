/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Bureaucrat.cpp                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/22 20:08:06 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/23 20:01:45 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Bureaucrat.hpp"


Bureaucrat::Bureaucrat() : _name("Bureaucrat")
{
	this->_grade = 75;
	return;
}

Bureaucrat::Bureaucrat(const int grade) : _name("Bureaucrat"), _grade(grade)
{
	if (this->_grade > 150)
		throw Bureaucrat::GradeTooLowException();
	else if (this->_grade < 1)
		throw Bureaucrat::GradeTooHighException();
	return;
}

Bureaucrat::Bureaucrat(const std::string name) : _name(name)
{
	this->_grade = 75;
	return;
}

Bureaucrat::Bureaucrat(const std::string name, const int grade) : _name(name), _grade(grade)
{
	if (this->_grade > 150)
		throw Bureaucrat::GradeTooLowException();
	else if (this->_grade < 1)
		throw Bureaucrat::GradeTooHighException();
	return;
}

Bureaucrat::Bureaucrat(const Bureaucrat &src) : _name(src._name)
{
	if (this->_grade > 150)
		throw Bureaucrat::GradeTooLowException();
	else if (this->_grade < 1)
		throw Bureaucrat::GradeTooHighException();
	this->_grade = src._grade;
	return;
}

Bureaucrat &Bureaucrat::operator=(const Bureaucrat &src)
{
	if (this->_grade > 150)
		throw Bureaucrat::GradeTooLowException();
	else if (this->_grade < 1)
		throw Bureaucrat::GradeTooHighException();
	this->_grade = src._grade;
	return *this;
}

Bureaucrat::~Bureaucrat()
{
	return;
}

const std::string Bureaucrat::getName() const
{
	return this->_name;
}

int Bureaucrat::getGrade() const
{
	return this->_grade;
}

void Bureaucrat::incrementGrade()
{
	if (this->_grade - 1 < 1)
		throw Bureaucrat::GradeTooHighException();
	this->_grade--;
	return;
}

void Bureaucrat::decrementGrade()
{
	if (this->_grade + 1 > 150)
		throw Bureaucrat::GradeTooLowException();
	this->_grade++;
	return;
}

std::ostream& operator<<(std::ostream &os, const Bureaucrat &src)
{
	os << BLUE << src.getName() << RESET << ", bureaucrat grade " << MAGENTA << src.getGrade() << RESET << std::endl;
	return os;
}

const char *Bureaucrat::GradeTooHighException::what() const throw()
{
	return "Grade too high";
}

const char *Bureaucrat::GradeTooLowException::what() const throw()
{
	return "Grade too low";
}
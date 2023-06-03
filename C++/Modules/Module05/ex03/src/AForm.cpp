/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AForm.cpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 13:56:17 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 16:41:49 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/AForm.hpp"

AForm::AForm() : _name("AForm"), _signGrade(75), _executeGrade(42)
{
	this->_signed = false;
}

AForm::AForm(const std::string name) : _name(name), _signGrade(75), _executeGrade(42)
{
	this->_signed = false;
}

AForm::AForm(const int signGrade, const int executeGrade) : _name("AForm"), _signGrade(signGrade), _executeGrade(executeGrade)
{
	if (this->_signGrade > 150)
		throw AForm::GradeTooLowException();
	else if (this->_signGrade < 1)
		throw AForm::GradeTooHighException();
	if (this->_executeGrade > 150)
		throw AForm::GradeTooLowException();
	else if (this->_executeGrade < 1)
		throw AForm::GradeTooHighException();
	this->_signed = false;
}


AForm::AForm(const std::string name, const int signGrade, const int executeGrade) : _name(name), _signGrade(signGrade), _executeGrade(executeGrade)
{
	if (this->_signGrade > 150)
		throw AForm::GradeTooLowException();
	else if (this->_signGrade < 1)
		throw AForm::GradeTooHighException();
	if (this->_executeGrade > 150)
		throw AForm::GradeTooLowException();
	else if (this->_executeGrade < 1)
		throw AForm::GradeTooHighException();
	this->_signed = false;
}

AForm::AForm(const AForm &src) : _name(src._name), _signGrade(src._signGrade), _executeGrade(src._executeGrade)
{
	if (this->_signGrade > 150)
		throw AForm::GradeTooLowException();
	else if (this->_signGrade < 1)
		throw AForm::GradeTooHighException();
	if (this->_executeGrade > 150)
		throw AForm::GradeTooLowException();
	else if (this->_executeGrade < 1)
		throw AForm::GradeTooHighException();
	this->_signed = src._signed;
	return;
}

AForm &AForm::operator=(const AForm &src)
{
	this->_signed = src._signed;
	return *this;
}

AForm::~AForm()
{
	return;
}

int	AForm::getSignGrade(void) const
{
	return this->_signGrade;
}

int	AForm::getExecuteGrade(void) const
{
	return this->_executeGrade;
}

void		AForm::beSigned(const Bureaucrat &src)
{
	if (src.getGrade() <= this->_signGrade)
		this->_signed = true;
	else
		throw GradeTooLowException();
}

const std::string AForm::getName(void) const
{
	return this->_name;
}

bool 	AForm::getSignedState(void) const
{
	return this->_signed;	
}

const char  *AForm::GradeTooLowException::what() const throw()
{
	return "Grade too low";
}

const char  *AForm::GradeTooHighException::what() const throw()
{
	return "Grade too high";
}

std::ostream &operator<<(std::ostream &os, const AForm &src)
{
	os << YELLOW << src.getName() << RESET ", Aform ";
	if (src.getSignedState())
		os << GREEN << "signed " << RESET;
	else
		os << RED << "not signed " << RESET;
	os << ",grade " MAGENTA << src.getSignGrade() << RESET " required to sign and " MAGENTA << src.getExecuteGrade() << RESET " required to execute" << std::endl;  
	return os;
}
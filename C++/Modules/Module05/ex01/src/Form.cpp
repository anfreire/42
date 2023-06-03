/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Form.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 13:56:17 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/23 20:04:52 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Form.hpp"

Form::Form() : _name("Form"), _signGrade(75), _executeGrade(42)
{
	this->_signed = false;
}

Form::Form(const std::string name) : _name(name), _signGrade(75), _executeGrade(42)
{
	this->_signed = false;
}

Form::Form(const int signGrade, const int executeGrade) : _name("Form"), _signGrade(signGrade), _executeGrade(executeGrade)
{
	if (this->_signGrade > 150)
		throw Form::GradeTooLowException();
	else if (this->_signGrade < 1)
		throw Form::GradeTooHighException();
	if (this->_executeGrade > 150)
		throw Form::GradeTooLowException();
	else if (this->_executeGrade < 1)
		throw Form::GradeTooHighException();
	this->_signed = false;
}


Form::Form(const std::string name, const int signGrade, const int executeGrade) : _name(name), _signGrade(signGrade), _executeGrade(executeGrade)
{
	if (this->_signGrade > 150)
		throw Form::GradeTooLowException();
	else if (this->_signGrade < 1)
		throw Form::GradeTooHighException();
	if (this->_executeGrade > 150)
		throw Form::GradeTooLowException();
	else if (this->_executeGrade < 1)
		throw Form::GradeTooHighException();
	this->_signed = false;
}


Form::Form(const Form &src) : _name(src._name), _signGrade(src._signGrade), _executeGrade(src._executeGrade)
{
	if (this->_signGrade > 150)
		throw Form::GradeTooLowException();
	else if (this->_signGrade < 1)
		throw Form::GradeTooHighException();
	if (this->_executeGrade > 150)
		throw Form::GradeTooLowException();
	else if (this->_executeGrade < 1)
		throw Form::GradeTooHighException();
	this->_signed = src._signed;
	return;
}

Form &Form::operator=(const Form &src)
{
	this->_signed = src._signed;
	return *this;
}

Form::~Form()
{
	return;
}

int	Form::getSignGrade(void) const
{
	return this->_signGrade;
}

int	Form::getExecuteGrade(void) const
{
	return this->_executeGrade;
}

void		Form::beSigned(const Bureaucrat &src)
{
	if (src.getGrade() <= this->_signGrade)
		this->_signed = true;
	else
		throw GradeTooLowException();
}

const std::string Form::getName(void) const
{
	return this->_name;
}

bool 	Form::getSignedState(void) const
{
	return this->_signed;	
}

const char  *Form::GradeTooLowException::what() const throw()
{
	return "Grade too low";
}

const char  *Form::GradeTooHighException::what() const throw()
{
	return "Grade too high";
}

std::ostream &operator<<(std::ostream &os, const Form &src)
{
	os << YELLOW << src.getName() << RESET ", form ";
	if (src.getSignedState())
		os << GREEN << "signed " << RESET;
	else
		os << RED << "not signed " << RESET;
	os << ",grade " MAGENTA << src.getSignGrade() << RESET " required to sign and " MAGENTA << src.getExecuteGrade() << RESET " required to execute" << std::endl;  
	return os;
}
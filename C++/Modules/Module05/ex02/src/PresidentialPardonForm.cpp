/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PresidentialPardonForm.cpp                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 23:52:32 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 13:06:18 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/PresidentialPardonForm.hpp"

PresidentialPardonForm::PresidentialPardonForm() :  AForm("PresidentialPardonForm", 25, 5), _target("")
{
	return;
}

PresidentialPardonForm::PresidentialPardonForm(const std::string target) :  AForm("PresidentialPardonForm", 25, 5),  _target(target)
{
	return;
}

PresidentialPardonForm::PresidentialPardonForm(const PresidentialPardonForm &src) :  AForm(src.getName(), src.getSignGrade(), src.getExecuteGrade()), _target(src._target)
{
	return;
}

PresidentialPardonForm &PresidentialPardonForm::operator=(const PresidentialPardonForm &src)
{
	AForm::operator=(src);
	return (*this);
}


PresidentialPardonForm::~PresidentialPardonForm()
{
	return;	
}

const char	*PresidentialPardonForm::FormNotSignedException::what() const throw()
{
	return "Form not Signed";
}

const std::string PresidentialPardonForm::getTarget() const
{
	return this->_target;
}

void PresidentialPardonForm::execute(Bureaucrat const & executor) const
{
	if (executor.getGrade() > this->getExecuteGrade() || executor.getGrade() > this->getSignGrade())
	{
		throw PresidentialPardonForm::GradeTooLowException();
		return;
	}
	else if (!this->getSignedState())
	{
		throw PresidentialPardonForm::FormNotSignedException();
		return;
	}
	std::cout << B_YELLOW << "PresidentialPardonForm" << RESET << YELLOW << " I inform that " << RESET << WHITE << this->getTarget() << RESET << YELLOW << " has been pardoned by Zaphod Beeblebrox." << RESET << std::endl;
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RobotomyRequestForm.cpp                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 22:52:01 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 16:04:19 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/RobotomyRequestForm.hpp"

RobotomyRequestForm::RobotomyRequestForm() : AForm("RobotomyRequestForm", 72, 45), _target("")
{
	return;
}

RobotomyRequestForm::RobotomyRequestForm(const std::string target) :  AForm("RobotomyRequestForm", 72, 45), _target(target)
{
	return;
}

RobotomyRequestForm::RobotomyRequestForm(const RobotomyRequestForm &src) : AForm(src.getName(), src.getSignGrade(), src.getExecuteGrade()), _target(src.getTarget())
{
	return;
}

RobotomyRequestForm &RobotomyRequestForm::operator=(const RobotomyRequestForm &src)
{
	AForm::operator=(src);
	return (*this);
}

RobotomyRequestForm::~RobotomyRequestForm()
{
	return;
}

const char	*RobotomyRequestForm::FormNotSignedException::what() const throw()
{
	return "Form not Signed";
}

const std::string RobotomyRequestForm::getTarget() const
{
	return this->_target;
}

void RobotomyRequestForm::execute(Bureaucrat const & executor) const
{
	if (executor.getGrade() > this->getExecuteGrade() || executor.getGrade() > this->getSignGrade())
	{
		throw RobotomyRequestForm::GradeTooLowException();
		return;
	}
	else if (!this->getSignedState())
	{
		throw RobotomyRequestForm::FormNotSignedException();
		return;
	}
	std::cout << CYAN << "[ DRILLING NOISES ] " << RESET;
	for (int i = 0; i < 50; i++)
	{
		std::cout << 'R';
	}
	std::cout << std::endl;
	srand((unsigned)time(NULL));
	if (rand() >= RAND_MAX / 2)
		std::cout<< B_BLUE << "RobotomyRequestForm" << RESET << WHITE <<" "<< this->getTarget() << RESET << GREEN << " has bee robomized" << RESET << std::endl;
	else
		std::cout<< B_BLUE << "RobotomyRequestForm" << RESET << RED << " The robomy failed" << RESET << std::endl;
}

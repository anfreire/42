/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ShrubberyCreationForm.cpp                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 22:18:45 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 13:04:51 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/ShrubberyCreationForm.hpp"

ShrubberyCreationForm::ShrubberyCreationForm() : AForm("ShrubberyCreationForm", 145, 137), _target("")
{
	return;
}

ShrubberyCreationForm::ShrubberyCreationForm(const std::string target) : AForm("ShrubberyCreationForm", 145, 137), _target(target)
{
	return;
}

ShrubberyCreationForm::ShrubberyCreationForm(const ShrubberyCreationForm &src) : AForm(src.getName(), src.getSignGrade(), src.getExecuteGrade()), _target(src.getTarget())
{
	return;
}

ShrubberyCreationForm &ShrubberyCreationForm::operator=(const ShrubberyCreationForm &src)
{
	AForm::operator=(src);
	return (*this);
}

ShrubberyCreationForm::~ShrubberyCreationForm()
{
	return;	
}

const char	*ShrubberyCreationForm::FormNotSignedException::what() const throw()
{
	return "Form not Signed";
}

const std::string ShrubberyCreationForm::getTarget() const
{
	return this->_target;
}

void	ShrubberyCreationForm::execute(Bureaucrat const & executor) const
{
	if (executor.getGrade() > this->getExecuteGrade() || executor.getGrade() > this->getSignGrade())
	{
		throw ShrubberyCreationForm::GradeTooLowException();
		return;
	}
	else if (!this->getSignedState())
	{
		throw ShrubberyCreationForm::FormNotSignedException();
		return;
	}
	std::string fileName = this->getTarget() + "_shrubbery";
	std::ofstream file(fileName.c_str());
	file << "               ,@@@@@@@," << std::endl << \
"       ,,,.   ,@@@@@@/@@,  .oo8888o."<< std::endl << \
"    ,&%%&%&&%,@@@@@/@@@@@@,8888\\88/8o"<< std::endl << \
"   ,%&\\%&&%&&%,@@@\\@@@/@@@88\\88888/88'"<< std::endl << \
"   %&&%&%&/%&&%@@\\@@/ /@@@88888\\88888'"<< std::endl << \
"   %&&%/ %&%%&&@@\\ V /@@' `88\\8 `/88'"<< std::endl << \
"   `&%\\ ` /%&'    |.|        \\ '|8'"<< std::endl << \
"       |o|        | |         | |"<< std::endl << \
"       |.|        | |         | |"<< std::endl;
	return ;
}

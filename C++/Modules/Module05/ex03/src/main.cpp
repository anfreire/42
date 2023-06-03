/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/22 21:02:03 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 16:58:29 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/ShrubberyCreationForm.hpp"
#include "../inc/PresidentialPardonForm.hpp"
#include "../inc/RobotomyRequestForm.hpp"
#include "../inc/Bureaucrat.hpp"
#include "../inc/Intern.hpp"



int main()
{
	Bureaucrat	TheOneAndOnly("The One & Only", 1);
	Bureaucrat	ThatOne("That one....", 150);
	Intern		Marvin;
	Form*		WannaBe;
	
	WannaBe = Marvin.makeForm("", "42");
	if (WannaBe)
	{
		TheOneAndOnly.signForm(*WannaBe);
		ThatOne.signForm(*WannaBe);
		TheOneAndOnly.executeForm(*WannaBe);
		ThatOne.executeForm(*WannaBe);
		delete WannaBe;
	}
	else
	{
		std::cout <<  RED << "Empty Form :(" << RESET<<  std::endl;
	}
	WannaBe = Marvin.makeForm("Robotomy                 request  Form", ":)");
	if (WannaBe)
	{
		TheOneAndOnly.signForm(*WannaBe);
		ThatOne.signForm(*WannaBe);
		TheOneAndOnly.executeForm(*WannaBe);
		ThatOne.executeForm(*WannaBe);
		delete WannaBe;
	}
	else
	{
		std::cout <<  RED << "Empty Form :(" << RESET<<  std::endl;
	}
	WannaBe = Marvin.makeForm("                                   Presidential", "_________________________________");
	if (WannaBe)
	{
		TheOneAndOnly.signForm(*WannaBe);
		ThatOne.signForm(*WannaBe);
		TheOneAndOnly.executeForm(*WannaBe);
		ThatOne.executeForm(*WannaBe);
		delete WannaBe;
	}
	else
	{
		std::cout <<  RED << "Empty Form :(" << RESET<<  std::endl;
	}
	WannaBe = Marvin.makeForm("Shrubbery", "_________________________________");
	if (WannaBe)
	{
		TheOneAndOnly.signForm(*WannaBe);
		ThatOne.signForm(*WannaBe);
		TheOneAndOnly.executeForm(*WannaBe);
		ThatOne.executeForm(*WannaBe);
		delete WannaBe;
	}
	else
	{
		std::cout <<  RED << "Empty Form :(" << RESET<<  std::endl;
	}
	return (0);
}
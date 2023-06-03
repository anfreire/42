/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/22 21:02:03 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/23 21:54:25 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Bureaucrat.hpp"
#include "../inc/Form.hpp"


void	formSign(const Bureaucrat &srcB, Form &srcF)
{
	try
	{
		srcF.beSigned(srcB);
		std::cout << CYAN <<"[main]" << RESET << GREEN <<" Successfully " << RESET << "signed " << WHITE << srcF.getName() << RESET << " with " << WHITE <<  srcB.getName() << RESET << " grade" << std::endl;
		return;
	}
	catch (std::exception &e)
	{
		std::cout << CYAN <<"[main]" << RESET << RED << " Failed " << RESET << "to sign " << WHITE << srcF.getName() << RESET << " with " << WHITE <<  srcB.getName() << RESET << " grade" << std::endl;
		return;
	}
}

int main()
{
	Bureaucrat	phill("Phill", 40);
	Bureaucrat	bob("Bob", 60);
	Form		cs50("CS50", 75, 25);
	Form		_42_("42", 42, 1);

	std::cout << bob << phill << _42_ << cs50;
	formSign(phill, _42_);
	formSign(bob, _42_);
	formSign(phill, cs50);
	formSign(bob, cs50);
	for (int i = 0; i < 20; i++)
	{
		bob.incrementGrade();
		phill.decrementGrade();
	}
	formSign(phill, _42_);
	formSign(bob, _42_);
	formSign(phill, cs50);
	formSign(bob, cs50);
	phill.signForm(_42_);
	bob.signForm(_42_);
	phill.signForm(cs50);
	bob.signForm(cs50);
	std::cout << bob << phill << _42_ << cs50 << std::endl;
	return (0);
}
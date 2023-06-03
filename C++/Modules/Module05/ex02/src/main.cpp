/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/22 21:02:03 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 13:31:56 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/ShrubberyCreationForm.hpp"
#include "../inc/PresidentialPardonForm.hpp"
#include "../inc/RobotomyRequestForm.hpp"
#include "../inc/Bureaucrat.hpp"



int main()
{
	Bureaucrat				b1("Dummy1", 1);
	Bureaucrat				b2("Dummy2", 50);
	Bureaucrat				b3("Dummy3", 100);
	RobotomyRequestForm		f1("Mr.Robot");
	PresidentialPardonForm	f2("Pardon?");
	ShrubberyCreationForm	f3("T_Tree_T");
	std::cout << b1 << b2 << b3 << f1 << f2 << f3;
	b1.signForm(f1);
	b1.signForm(f2);
	b1.signForm(f3);
	b1.executeForm(f1);
	b1.executeForm(f2);
	b1.executeForm(f3);
	std::cout << f1 << f2 << f3;
	b2.signForm(f1);
	b2.signForm(f2);
	b2.signForm(f3);
	b2.executeForm(f1);
	b2.executeForm(f2);
	b2.executeForm(f3);
	std::cout << f1 << f2 << f3;
	b3.signForm(f1);
	b3.signForm(f2);
	b3.signForm(f3);
	b3.executeForm(f1);
	b3.executeForm(f2);
	b3.executeForm(f3);
	std::cout << f1 << f2 << f3;

	
	
	return (0);
}
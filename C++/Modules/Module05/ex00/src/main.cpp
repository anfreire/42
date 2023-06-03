/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/22 21:02:03 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/23 17:56:41 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Bureaucrat.hpp"

int main()
{
	Bureaucrat _default_;
	Bureaucrat _noName_(5);
	Bureaucrat _noGrade_("Phill");
	Bureaucrat _normal_("Bob", 150);

	while (true)
	{
		try
		{
			std::cout << _default_ << _noName_ << _noGrade_ << _normal_ << std::endl;
			_default_.incrementGrade();
			_noName_.incrementGrade();
			_noGrade_.incrementGrade();
			_normal_.incrementGrade();
		}
		catch(Bureaucrat::GradeTooHighException &e)
		{
			std::cout << RED << e.what() << RESET << std::endl;
			break ;
		}
	}
	while (true)
	{
		try
		{
			std::cout << _default_ << _noName_ << _noGrade_ << _normal_ << std::endl;
			_default_.decrementGrade();
			_noName_.decrementGrade();
			_noGrade_.decrementGrade();
			_normal_.decrementGrade();
		}
		catch(Bureaucrat::GradeTooLowException &e)
		{
			std::cout << RED << e.what() << RESET << std::endl;
			break ;
		}
	}
	return (0);
}
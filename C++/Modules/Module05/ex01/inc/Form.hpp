/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Form.hpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 13:24:37 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/23 21:28:37 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FORM_HPP
# define FORM_HPP

# include <iostream>

# define	RESET		"\033[0m"
# define	RED			"\033[1;31m"
# define	GREEN		"\033[1;32m"
# define	YELLOW		"\033[1;33m"
# define	BLUE		"\033[1;34m"
# define	MAGENTA		"\033[1;35m"
# define	CYAN		"\033[1;36m"
# define	WHITE		"\033[1;37m"

class Bureaucrat;

class Form
{
	public:
/*		Orthodox Canonical Form		*/
		Form();
		Form(const Form &src);
		Form &operator=(const Form &src);
		~Form();
/*		Costum Constructors		*/
		Form(const std::string name);
		Form(const int signGrade, const int executeGrade);
		Form(const std::string name, const int signGrade, const int executeGrade);
/*		Getters			*/
		int					getSignGrade(void) const;
		int					getExecuteGrade(void) const;
		bool				getSignedState(void) const;
		const std::string	getName(void) const;
/*		Functions		*/
		void		beSigned(const Bureaucrat &src);
/*		Exceptions		*/
		class GradeTooHighException : public std::exception
		{
			virtual const char *what() const throw();
		};
		class GradeTooLowException : public std::exception
		{
			virtual const char *what() const throw();
		};
	
	private:
/*		Attributes		*/
		const std::string	_name;
		bool				_signed;
		const int			_signGrade;
		const int			_executeGrade;
};
/*		<< Overload		*/
std::ostream &operator<<(std::ostream &os, const Form &src);

#include "../inc/Bureaucrat.hpp"

#endif
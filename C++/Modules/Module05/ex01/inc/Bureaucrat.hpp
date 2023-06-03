/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Bureaucrat.hpp                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/22 19:37:12 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/23 21:25:11 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef BUREACRAT_HPP
# define BUREACRAT_HPP

# include <iostream>

# define	RESET		"\033[0m"
# define	RED			"\033[1;31m"
# define	GREEN		"\033[1;32m"
# define	YELLOW		"\033[1;33m"
# define	BLUE		"\033[1;34m"
# define	MAGENTA		"\033[1;35m"
# define	CYAN		"\033[1;36m"
# define	WHITE		"\033[1;37m"

class Form;

class Bureaucrat
{
	public:
/*		Orthodox Canonical Form		*/
		Bureaucrat();
		Bureaucrat(const Bureaucrat &src);
		Bureaucrat &operator=(const Bureaucrat &src);
		~Bureaucrat();
/*		Costum Constructors		*/
		Bureaucrat(const std::string name);
		Bureaucrat(const int grade);
		Bureaucrat(const std::string name, const int grade);
/*		Getters			*/
		const std::string	getName() const;
		int					getGrade() const;
/*		Functions		*/
		void				incrementGrade();
		void				decrementGrade();
		void				signForm(Form &src);
/*		Exceptions		*/
		class GradeTooHighException : public std::exception
		{
			public:
				virtual const char *what() const throw();
		};
		class GradeTooLowException : public std::exception 
		{
			public:
				virtual const char *what() const throw();
		};
		
	private:
/*		Attributes		*/
		const std::string			_name;
		int							_grade;
};
/*		<< Overload		*/
std::ostream& operator<<(std::ostream &os, const Bureaucrat &src);

# include "Form.hpp"

#endif
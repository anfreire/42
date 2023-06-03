/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AForm.hpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 13:24:37 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/23 21:28:37 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef AFORM_HPP
# define AFORM_HPP

# include <iostream>

# define	RESET		"\033[0m"
# define	RED			"\033[1;31m"
# define	GREEN		"\033[1;32m"
# define	YELLOW		"\033[1;33m"
# define	BLUE		"\033[1;34m"
# define	MAGENTA		"\033[1;35m"
# define	CYAN		"\033[1;36m"
# define	WHITE		"\033[1;37m"
# define	B_YELLOW	"\033[1;43m"
# define	B_RED		"\033[1;41m"
# define	B_BLUE		"\033[1;44m"

# define	Form		AForm

class Bureaucrat;

class AForm
{
	public:
/*		Orthodox Canonical AForm		*/
		AForm();
		AForm(const AForm &src);
		AForm &operator=(const AForm &src);
		virtual ~AForm();
/*		Costum Constructors		*/
		AForm(const std::string name);
		AForm(const int signGrade, const int executeGrade);
		AForm(const std::string name, const int signGrade, const int executeGrade);
/*		Getters			*/
		int					getSignGrade(void) const;
		int					getExecuteGrade(void) const;
		bool				getSignedState(void) const;
		const std::string	getName(void) const;
/*		Functions		*/
		void			beSigned(const Bureaucrat &src);
		virtual void	execute(Bureaucrat const & executor) const = 0;
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
std::ostream &operator<<(std::ostream &os, const AForm &src);

#include "../inc/Bureaucrat.hpp"


#endif
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RobotomyRequestForm.hpp                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 19:41:15 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 12:56:53 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef ROBOTOMYREQUESTFORM_HPP
# define ROBOTOMYREQUESTFORM_HPP

# include "AForm.hpp"
# include <cstdlib>

class RobotomyRequestForm : public AForm
{
	public:
/*		Orthodox Canonical AForm		*/
		RobotomyRequestForm();
		RobotomyRequestForm(const RobotomyRequestForm &src);
		RobotomyRequestForm &operator=(const RobotomyRequestForm &src);
		~RobotomyRequestForm();
/*		Costum Constructor		*/
		RobotomyRequestForm(const std::string target);
/*		Functions		*/
		void	execute(Bureaucrat const & executor) const;
/*		Getters		*/
		const	std::string	getTarget(void) const;
/*		Exceptions		*/		
		class FormNotSignedException : public std::exception
		{
			virtual const char *what() const throw();
		};
	private:
/*		Attributes		*/
		const	std::string	_target;
};

#endif
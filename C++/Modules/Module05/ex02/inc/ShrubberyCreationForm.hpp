/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ShrubberyCreationForm.hpp                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 19:47:45 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 12:56:58 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef SHRUBBERYCREATINFORM_HPP
# define SHRUBBERYCREATINFORM_HPP

# include <iostream>
# include <fstream>
# include "AForm.hpp"

class ShrubberyCreationForm : public AForm
{
	public:
/*		Orthodox Canonical AForm		*/
		ShrubberyCreationForm();
		ShrubberyCreationForm(const ShrubberyCreationForm &src);
		ShrubberyCreationForm &operator=(const ShrubberyCreationForm &src);
		~ShrubberyCreationForm();
/*		Costum Constructor		*/
		ShrubberyCreationForm(const std::string target);
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
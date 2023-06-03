/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PresidentialPardonForm.hpp                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/23 19:32:17 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 16:05:00 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef PRESIDENTIALPARDONFORM_HPP
# define PRESIDENTIALPARDONFORM_HPP

# include "AForm.hpp"

class PresidentialPardonForm : public AForm
{
	public:
/*		Orthodox Canonical AForm		*/
		PresidentialPardonForm();
		PresidentialPardonForm(const PresidentialPardonForm &src);
		PresidentialPardonForm &operator=(const PresidentialPardonForm &src);
		~PresidentialPardonForm();
/*		Costum Constructor		*/
		PresidentialPardonForm(const std::string target);
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
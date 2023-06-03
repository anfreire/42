/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Intern.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/24 13:32:50 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/24 16:56:57 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef INTERN_HPP
# define INTERN_HPP

#include "RobotomyRequestForm.hpp"
#include "PresidentialPardonForm.hpp"
#include "ShrubberyCreationForm.hpp"
#include <cstring>

class Intern
{
	public:
/*		Orthodox Canonical AForm		*/
		Intern();
		Intern(const Intern &src);
		Intern &operator=(const Intern &src);
		~Intern();
/*		Functions		*/
		AForm	*makeForm(const std::string name, const std::string target);
	private:
/*		Attributtes		*/
		static std::string	_forms[6];
/*		Functions		*/
		int		identifyForm(const std::string name);

};

#endif
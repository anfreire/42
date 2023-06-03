/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PhoneBook.hpp                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/10 15:12:25 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/10 15:45:02 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef PHONEBOOK_HPP
# define PHONEBOOK_HPP

# include "mylib.hpp"
# include "Contact.hpp"


class PhoneBook
{
	public:
		PhoneBook(void);
		~PhoneBook(void);
		void	add(void);
		void	search(void);
		void	exit(void);

	private:
		Contact			contacts[8];
		std::string		returnPrintableSearchString(std::string oldString);
		static int		phoneBookLength;
};





#endif
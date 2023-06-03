/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Contact.hpp                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/10 15:12:23 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/10 16:01:36 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "mylib.hpp"


class Contact
{

	public:

		Contact(void);
		~Contact(void);
		Contact			*newContact(void);
		std::string 	getterFirstName(void);
		std::string 	getterLastName(void);
		std::string		getterNickName(void);
		bool			setterFirstName(std::string firstName);
		bool			setterLastName(std::string lastName);
		bool			setterNickName(std::string nickName);
		bool			setterPhoneNumber(std::string phoneNumber);
		bool			setterDarkestSecret(std::string darkestSecret);
		unsigned int 	getterPhoneNumber(void);
		void			emptyContact(void);
		std::string 	getterDarkestSecret(void);


	private:

		std::string 	firstName;
		std::string 	lastName;
		std::string		nickName;
		unsigned int 	phoneNumber;
		std::string 	darkestSecret;

};

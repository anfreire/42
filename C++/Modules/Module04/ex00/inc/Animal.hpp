/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Animal.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:34:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 15:55:53 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef ANIMAL_HPP
# define ANIMAL_HPP

# include <iostream>

# define RESET "\033[0m"
# define RED "\033[1m\033[31m"
# define GREEN "\033[1m\033[32m"
# define YELLOW "\033[1m\033[33m"
# define BLUE "\033[1m\033[34m"
# define MAGENTA "\033[1m\033[35m"
# define CYAN "\033[1m\033[36m"
# define WHITE "\033[1m\033[37m"

class Animal
{
	public:
		Animal();
		Animal(const Animal &src);
		Animal &operator=(const Animal &src);
		virtual ~Animal();
		std::string getType() const;
		virtual void makeSound() const;

	protected:
		std::string _type;
};

#endif
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   WrongAnimal.hpp                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 15:29:59 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:05:33 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef WRONGANIMAL_HPP
# define WRONGANIMAL_HPP

# include <iostream>

# define RESET "\033[0m"
# define RED "\033[1m\033[31m"
# define GREEN "\033[1m\033[32m"
# define YELLOW "\033[1m\033[33m"
# define BLUE "\033[1m\033[34m"
# define MAGENTA "\033[1m\033[35m"
# define CYAN "\033[1m\033[36m"
# define ORANGE "\033[1m\033[33m"
# define WHITE "\033[1m\033[37m"

class WrongAnimal
{
	public:
		WrongAnimal();
		WrongAnimal(const WrongAnimal &src);
		WrongAnimal &operator=(const WrongAnimal &src);
		virtual ~WrongAnimal();
		std::string getType() const;
		void makeSound() const;

	protected:
		std::string _type;
};

#endif
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AMateria.hpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/17 11:05:44 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 17:25:59 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef AMATERIA_HPP
# define AMATERIA_HPP

# include <iostream>
# include <cstring>
# include <string>

# define RESET "\033[0m"
# define RED "\033[1m\033[31m"
# define GREEN "\033[1m\033[32m"
# define YELLOW "\033[1m\033[33m"
# define BLUE "\033[1m\033[34m"
# define MAGENTA "\033[1m\033[35m"
# define CYAN "\033[1m\033[36m"
# define ORANGE "\033[1m\033[33m"
# define WHITE "\033[1m\033[37m"

class ICharacter;

class AMateria
{
	public:
		AMateria();
		virtual ~AMateria();
		AMateria(const AMateria &src);
		AMateria &operator=(const AMateria &src); 
		AMateria(std::string const & type);
		std::string const & getType() const;
		virtual AMateria* clone() const = 0;
		virtual void use(ICharacter& target);
	
	protected:
		std::string	_type;
};

#endif
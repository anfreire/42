/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Zombie.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/04 17:41:41 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/13 21:16:36 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>


class Zombie
{
	public:
		Zombie(void);
		Zombie(std::string name);
		~Zombie(void);
		void	announce( void );
		void	setName(std::string name);

	private:
		std::string		_name;
	
};

Zombie* zombieHorde( int N, std::string name );
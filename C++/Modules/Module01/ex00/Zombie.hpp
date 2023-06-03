/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Zombie.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/04 17:41:41 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/04 20:05:46 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>

class Zombie
{
	public:
		Zombie(std::string name);
		~Zombie(void);
		void	announce( void );

	private:
		std::string		_name;
	
};

Zombie* newZombie( std::string name );
void 	randomChump( std::string name );


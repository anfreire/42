/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Weapon.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/05 15:51:55 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/23 17:50:40 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef WEAPON_HPP
# define WEAPON_HPP

# include <iostream>

class Weapon
{

	public:
        Weapon(std::string  type);
        ~Weapon(void);
		std::string	getType(void) const;
		void		setType(std::string type);		

	private:
		std::string	type;
		
};


#endif
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HumanB.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/05 16:07:54 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/05 21:17:46 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef HUMANB_HPP
# define HUMANB_HPP

# include <iostream>
# include "Weapon.hpp"

class HumanB
{
	public:
        HumanB(std::string name);
        ~HumanB(void);
        void    setWeapon(Weapon &weapon);
        void    attack(void);


	private:
        std::string name;
        Weapon      *weaponPointer;
	
};

#endif
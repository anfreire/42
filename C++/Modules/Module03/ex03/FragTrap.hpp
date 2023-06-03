/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   FragTrap.hpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/15 11:29:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/15 15:44:51 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FRAGTRAP_HPP
# define FRAGTRAP_HPP

# include "ClapTrap.hpp"

class FragTrap : virtual public ClapTrap
{
	public:
		FragTrap();
		~FragTrap();
		FragTrap(const FragTrap &object);
		FragTrap &operator=(const FragTrap &object);
		FragTrap(const std::string name);
		void highFivesGuys();
};

#endif
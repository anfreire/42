/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Character.hpp                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/17 11:18:49 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/17 15:54:02 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef CHARACTER_HPP
# define CHARACTER_HPP

#include "ICharacter.hpp"

class Character : public ICharacter
{
	public:
		Character();
		Character(const std::string name);
		~Character();
		Character(const Character &src);
		Character &operator=(const Character &src);
		std::string	const	&getName() const;
		void	equip(AMateria *m);
		void	unequip(int idx);
		void	use(int	idx, ICharacter& target);

	private:
		std::string _name;
		int			_idx;
		AMateria	*_loot[4];
		AMateria	**_floor;
		
};

#endif
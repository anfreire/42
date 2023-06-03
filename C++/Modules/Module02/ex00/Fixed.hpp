/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fixed.hpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/25 23:22:41 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/25 23:56:05 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>

class Fixed
{
	public:
		Fixed();
		~Fixed();
		Fixed(const Fixed &obj);
		Fixed& operator=(const Fixed& obj);
		int		getRawBits( void ) const;
		void	setRawBits( int const raw );

	private:
		int			_FixedPointNumber;
		static int	_FractionalBits;
};
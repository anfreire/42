/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fixed.hpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/25 23:22:41 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/26 14:25:52 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <iostream>
#include <cmath>

class Fixed
{
	public:
		Fixed();
		~Fixed();
        Fixed(const int raw);
        Fixed(const float raw);
		Fixed(const Fixed &obj);
		Fixed&  operator=(const Fixed& obj);
		int		getRawBits( void ) const;
		void	setRawBits( int const raw );
        int     toInt( void ) const;
        float   toFloat( void ) const;

	private:
		int			_FixedPointNumber;
		static int	_FractionalBits;
};

std::ostream& operator<<(std::ostream& os, const Fixed& fixed);
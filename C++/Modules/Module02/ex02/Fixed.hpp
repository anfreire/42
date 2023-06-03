/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fixed.hpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/25 23:22:41 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/27 14:49:22 by anfreire         ###   ########.fr       */
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
		Fixed& 	operator=(const Fixed& obj);
		bool	operator>(const Fixed& obj);
		bool	operator<(const Fixed& obj);
		bool	operator>=(const Fixed& obj);
		bool	operator<=(const Fixed& obj);
		bool	operator==(const Fixed& obj);
		bool	operator!=(const Fixed& obj);
		Fixed& 	operator+(const		Fixed& obj);
		Fixed& 	operator-(const		Fixed& obj);
		Fixed& 	operator*(const		Fixed& obj);
		Fixed& 	operator/(const		Fixed& obj);
		Fixed& 	operator++(void);
		Fixed& 	operator--(void);
		Fixed& 	operator++(int);
		Fixed& 	operator--(int);
		static Fixed& 		min(Fixed& a, Fixed& b);
		static Fixed& 		max(Fixed& a, Fixed& b);
		static const Fixed& 	min(const Fixed& a, const Fixed& b);
		static const Fixed& 	max(const Fixed& a, const Fixed& b);
		
		
		int		getRawBits( void ) const;
		void	setRawBits( int const raw );
        int     toInt( void ) const;
        float   toFloat( void ) const;

	private:
		int			_FixedPointNumber;
		static int	_FractionalBits;
		Fixed		*tmp;
};

std::ostream& operator<<(std::ostream& os, const Fixed& fixed);
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fixed.cpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/25 23:22:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/27 14:14:39 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Fixed.hpp"

int	Fixed::_FractionalBits = 8;

Fixed::Fixed()
{
	std::cout << "Default constructor called" << std::endl;
	this->_FixedPointNumber = 0;
}

Fixed::Fixed(const int raw)
{
	std::cout << "Int constructor called" << std::endl;
	this->_FixedPointNumber = raw * (1 << this->_FractionalBits);
}

Fixed::Fixed(const float raw)
{
	std::cout << "Float constructor called" << std::endl;
	this->_FixedPointNumber = std::floor(raw * (1 << this->_FractionalBits) + 0.5);
}

Fixed::Fixed(const Fixed &obj)
{
	std::cout << "Copy constructor called" << std::endl;
	this->_FixedPointNumber = obj._FixedPointNumber;
}

Fixed::~Fixed()
{
	std::cout << "Destructor called" << std::endl;
}

Fixed& Fixed::operator=(const Fixed& obj)
{
    std::cout << "Copy assignment operator called " << std::endl;
    this->_FixedPointNumber = obj.getRawBits();
    return *this;
}

std::ostream& operator<<(std::ostream& os, const Fixed& fixed)
{
	os << fixed.toFloat();
	return os;
}

int	Fixed::getRawBits(void)	const
{
	return (this->_FixedPointNumber);
}

void	Fixed::setRawBits(int const raw )
{
	this->_FixedPointNumber = raw;
}

int		Fixed::toInt(void)	const
{
	return static_cast<int>(std::floor(this->toFloat() + 0.5));
}

float	Fixed::toFloat(void)	const
{
	return static_cast<float>(this->_FixedPointNumber) / (1 << this->_FractionalBits);
}
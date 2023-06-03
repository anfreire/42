/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fixed.cpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/25 23:22:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/25 23:59:37 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Fixed.hpp"

int	Fixed::_FractionalBits = 8;

Fixed::Fixed()
{
	std::cout << "Default constructor called" << std::endl;
	this->_FixedPointNumber = 0;
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

int	Fixed::getRawBits(void)	const
{
	std::cout << "getRawBits member function called" << std::endl;
	return this->_FixedPointNumber;
}

void	Fixed::setRawBits(int const raw )
{
	std::cout << "setRawBits member function called" << std::endl;
	this->_FixedPointNumber = raw;
}
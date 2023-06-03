/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Fixed.cpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/25 23:22:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/27 14:51:19 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Fixed.hpp"

int Fixed::_FractionalBits = 8;

Fixed::Fixed()
{
	this->_FixedPointNumber = 0;
	this->tmp = NULL;
}

Fixed::Fixed(const int raw)
{
	this->_FixedPointNumber = raw * (1 << this->_FractionalBits);
	this->tmp = NULL;
}

Fixed::Fixed(const float raw)
{
	this->_FixedPointNumber = std::floor(raw * (1 << this->_FractionalBits) + 0.5);
	this->tmp = NULL;
}

Fixed::Fixed(const Fixed &obj)
{
	this->_FixedPointNumber = obj._FixedPointNumber;
	this->tmp = NULL;
}

Fixed::~Fixed()
{
	if (this->tmp != NULL)
		delete this->tmp;
}

Fixed &Fixed::operator=(const Fixed &obj)
{
	this->_FixedPointNumber = obj.getRawBits();
	return *this;
}

bool Fixed::operator>(const Fixed &obj)
{
	return (this->_FixedPointNumber > obj._FixedPointNumber);
}

bool Fixed::operator<(const Fixed &obj)
{
	return (this->_FixedPointNumber < obj._FixedPointNumber);
}

bool Fixed::operator>=(const Fixed &obj)
{
	return (this->_FixedPointNumber >= obj._FixedPointNumber);
}

bool Fixed::operator<=(const Fixed &obj)
{
	return (this->_FixedPointNumber <= obj._FixedPointNumber);
}

bool Fixed::operator==(const Fixed &obj)
{
	return (this->_FixedPointNumber == obj._FixedPointNumber);
}

bool Fixed::operator!=(const Fixed &obj)
{
	return (this->_FixedPointNumber != obj._FixedPointNumber);
}

Fixed &Fixed::min(Fixed &a, Fixed &b)
{
	if (a.toFloat() < b.toFloat())
		return a;
	return b;
}

Fixed &Fixed::max(Fixed &a, Fixed &b)
{
	if (a.toFloat() > b.toFloat())
		return a;
	return b;
}

const Fixed &Fixed::min(const Fixed &a, const Fixed &b)
{
	if (a.toFloat() < b.toFloat())
		return a;
	return b;
}

const Fixed &Fixed::max(const Fixed &a, const Fixed &b)
{
	if (a.toFloat() > b.toFloat())
		return a;
	return b;
}

std::ostream &operator<<(std::ostream &os, const Fixed &fixed)
{
	os << fixed.toFloat();
	return os;
}

Fixed &Fixed::operator+(const Fixed &obj)
{
	this->setRawBits(this->getRawBits() + obj.getRawBits());
	return *this;
}

Fixed &Fixed::operator-(const Fixed &obj)
{
	this->setRawBits(this->getRawBits() - obj.getRawBits());
	return *this;
}

Fixed &Fixed::operator*(const Fixed &obj)
{
	this->setRawBits(this->getRawBits() * obj.getRawBits() / (1 << this->_FractionalBits));
	return *this;
}

Fixed &Fixed::operator/(const Fixed &obj)
{
	this->setRawBits(this->getRawBits() / obj.getRawBits() * (1 << this->_FractionalBits));
	return *this;
}
Fixed &Fixed::operator++(void)
{
	this->_FixedPointNumber++;
	return *this;
}

Fixed &Fixed::operator++(int)
{
	if (this->tmp != NULL)
	{
		delete this->tmp;
		this->tmp = NULL;
	}
	tmp = new Fixed(*this);
	this->_FixedPointNumber++;
	return *tmp;
}

Fixed &Fixed::operator--(void)
{
	this->_FixedPointNumber--;
	return *this;
}

Fixed &Fixed::operator--(int)
{
	if (this->tmp != NULL)
	{
		delete this->tmp;
		this->tmp = NULL;
	}
	tmp = new Fixed(*this);
	this->_FixedPointNumber--;
	return *tmp;
}

int Fixed::getRawBits(void) const
{
	return (this->_FixedPointNumber);
}

void Fixed::setRawBits(int const raw)
{
	this->_FixedPointNumber = raw;
}

int Fixed::toInt(void) const
{
	return static_cast<int>(std::floor(this->toFloat() + 0.5));
}

float Fixed::toFloat(void) const
{
	return static_cast<float>(this->_FixedPointNumber) / (1 << this->_FractionalBits);
}
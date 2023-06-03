/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Data.cpp                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/24 23:29:40 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/29 19:59:41 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Data.hpp"


Data::Data()
{
	this->memberChar = '4';
	this->memberDouble = 4200.0024;
	this->memberFloat = 42.42f;
	this->memberInt = 42;
	this->memberString = "42 Lisboa";
}

Data::Data(const Data &src)
{
	this->memberChar = src.memberChar;
	this->memberDouble = src.memberDouble;
	this->memberFloat = src.memberFloat;
	this->memberInt = src.memberInt;
	this->memberString = src.memberString;
	return;
}

Data &Data::operator=(const Data &src)
{
	this->memberChar = src.memberChar;
	this->memberDouble = src.memberDouble;
	this->memberFloat = src.memberFloat;
	this->memberInt = src.memberInt;
	this->memberString = src.memberString;
	return *this;
}

Data::~Data()
{
	return ;
}


/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Serializer.cpp                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/24 23:29:40 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/29 19:59:41 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Serializer.hpp"


Serializer::Serializer()
{
	return;
}

Serializer::Serializer(const Serializer &src)
{
	(void)src;
	return;
}

Serializer &Serializer::operator=(const Serializer &src)
{
	(void)src;
	return *this;
}

Serializer::~Serializer()
{
	return ;
}

uintptr_t Serializer::serialize(Data* ptr)
{
	return reinterpret_cast<uintptr_t&>(ptr);
}

Data* Serializer::deserialize(uintptr_t raw)
{
	return reinterpret_cast<Data *>(raw);
}
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Brain.cpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 16:45:12 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:49:29 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/Brain.hpp"

Brain::Brain()
{
	std::cout << WHITE << "Brain " << GREEN << "constructor called" << RESET << std::endl;
	for (int i = 0; i < 100; i++)
		_ideas[i] = "empty";
}

Brain::Brain(const Brain &src)
{
	std::cout << WHITE << "Brain " << GREEN << "copy constructor called" << RESET << std::endl;
	*this = src;
}

Brain &Brain::operator=(const Brain &src)
{
	std::cout << WHITE << "Brain " << GREEN << "assignation operator called" << RESET << std::endl;
	for (int i = 0; i < 100; i++)
		_ideas[i] = src._ideas[i];
	return *this;
}

Brain::~Brain()
{
	std::cout << WHITE << "Brain " << RED << "destructor called" << RESET << std::endl;
}

std::string Brain::getIdea(int i) const
{
	return _ideas[i];
}

void Brain::setIdea(int i, std::string idea)
{
	_ideas[i] = idea;
}
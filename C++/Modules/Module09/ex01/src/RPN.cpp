/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RPN.cpp                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 16:57:10 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/15 16:20:43 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/RPN.hpp"

RPN::RPN()
{
	return ;
}

RPN::RPN(std::string	expression)
{
	this->_expression = expression;
}


RPN::RPN(const RPN &src)
{
	*this = src;
}

RPN &RPN::operator=(const RPN &src)
{
	this->_expression = src._expression;
	this->_stack = src._stack;
	return (*this);
}

RPN::~RPN()
{
	return ;
}

// https://isaaccomputerscience.org/concepts/dsa_toc_rpn?examBoard=all&stage=all

void	RPN::arithmetic(std::string	op)
{
	int		tmp;
	
	if (this->_stack.size() < 2)
		throw std::runtime_error("Invalid expression");
	tmp = this->_stack.top();
	this->_stack.pop();
	if (op == "+")
		this->_stack.top() += tmp;
	else if (op == "-")
		this->_stack.top() -= tmp;
	else if (op == "*")
		this->_stack.top() *= tmp;
	else if (op == "/")
		this->_stack.top() /= tmp;
}

std::string	RPN::trim(std::string original)
{
	int	start = 0;
	while (start < static_cast<int>(original.length()) && (original[static_cast<size_t>(start)] == ' ' || original[static_cast<size_t>(start)] == '\t'))
		start++;
	int end = static_cast<int>(original.length()) - 1;
	while (end >= 0 && (original[static_cast<size_t>(end)] == ' ' || original[static_cast<size_t>(end)] == '\t'))
		end--;
	std::string newString = original.substr(static_cast<size_t>(start), static_cast<size_t>(end - start + 1));
	return newString;
}

bool		RPN::valid(std::string	string)
{
	for (size_t i = 0; i < string.length(); i++)
	{
		if (!std::isdigit(string[i]) && string[i] != '+' && string[i] != '-' && string[i] != '*' && string[i] != '/' && string[i] != ' ' && string[i] != '\t')
			return false; 
	}
	return true;
}

void	RPN::run(void)
{
	std::stringstream	str(this->_expression);
	std::string			buffer;
	int					tmp;

	while (std::getline(str, buffer, ' '))
	{
		if (!this->valid(buffer))
			throw std::runtime_error("Unrecognized character");
		if (this->trim(buffer) == "+" || this->trim(buffer) == "-" || this->trim(buffer) == "/" || this->trim(buffer) == "*")
			this->arithmetic(this->trim(buffer));
		else
		{
			if (buffer == "" || buffer == " " || buffer == "\t")
				continue ;
			std::istringstream(buffer) >> tmp;
			this->_stack.push(tmp);
		}
	}
	if (this->_stack.size() != 1)
	{
		throw std::runtime_error("Invalid expression");
	}
	std::cout << this->_stack.top() << std::endl;
}
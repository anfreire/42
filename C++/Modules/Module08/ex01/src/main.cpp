/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 16:52:36 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/08 16:46:32 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

# include "../inc/Span.hpp"

int main(void)
{
	Span sp = Span(5);
	
	
	sp.addNumber(42);
	sp.addNumber(1000000);
	sp.addNumber(999999999);
	sp.addNumber(42);
	sp.addNumber(-1);
	
	std::cout << sp << std::endl;
	try
	{
		sp.addNumber(42);
	}
	catch(const std::exception& e)
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << e.what() << RESET << std::endl;	
	}
	std::cout << "Shortest Span: " << sp.shortestSpan() << std::endl;
	std::cout << "Longest Span: " << sp.longestSpan() << std::endl;
	
	
	std::set<int> aSet;
	Span sp2 = Span(4);

	try
	{
		sp2.shortestSpan();
	}
	catch(const std::exception& e)
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << e.what() << RESET << std::endl;	
	}
	try
	{
		sp2.longestSpan();
	}
	catch(const std::exception& e)
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << e.what() << RESET << std::endl;	
	}
	
	
	aSet.insert(1);
	aSet.insert(2);
	aSet.insert(3);
	aSet.insert(4);
	sp2.addNumbers(aSet.begin(), aSet.end());
	
	std::cout << sp2 << std::endl;
	
	
	
	std::vector<int> aVector;
	
	aVector.push_back(42);
	
	try
	{
		sp2.addNumbers(aVector.begin(), aVector.end());
	}
	catch(const std::exception& e)
	{
		std::cerr << COLOR_RED << "Error: " << COLOR_WHITE << e.what() << RESET << std::endl;	
	}
	std::cout << "Shortest Span: " << sp2.shortestSpan() << std::endl;
	std::cout << "Longest Span: " << sp2.longestSpan() << std::endl;
	
	return (0);
}
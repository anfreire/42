/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/10 09:53:17 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/10 15:50:58 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../inc/MutantStack.hpp"

#include <vector>

int main()
{
    std::cout << BACKGROUND_MAGENTA << "MutantStack" << RESET << std::endl << std::endl;
    MutantStack<int> mstack;
    mstack.push(5);
    mstack.push(17);
    std::cout << COLOR_MAGENTA << "Top: " << RESET << mstack.top() << std::endl;
    mstack.pop();
    std::cout << COLOR_MAGENTA << "Size: " << RESET << mstack.size() << std::endl;
    mstack.push(3);
    mstack.push(5);
    mstack.push(737);
    mstack.push(0);
    MutantStack<int>::iterator mit = mstack.begin();
    MutantStack<int>::iterator mite = mstack.end();
    int i = 0;
    while (mit != mite)
    {
        std::cout << COLOR_MAGENTA << "Iterator: " << RESET << *mit << std::endl;
        ++mit;
        i++;
    }
    while (i > 0)
    {
        mit--;
        std::cout << COLOR_MAGENTA << "Reverse Iterator: " << RESET << *mit << std::endl;
        i--;
    }
    std::stack<int> ms(mstack);
    
    std::cout << std::endl << std::endl << BACKGROUND_CYAN << "Vector" << RESET << std::endl << std::endl;
    std::vector<int> v;
    v.push_back(5);
    v.push_back(17);
    std::cout << COLOR_CYAN << "Back: " << RESET << v.back() << std::endl;
    v.pop_back();
    std::cout << COLOR_CYAN << "Size: " << RESET << v.size() << std::endl;
    v.push_back(3);
    v.push_back(5);
    v.push_back(737);
    v.push_back(0);
    std::vector<int>::iterator vit = v.begin();
    std::vector<int>::iterator vite = v.end();
    ++vit;
    --vit;
    i = 0;
    while (vit != vite)
    {
        std::cout << COLOR_CYAN << "Iterator: " << RESET << *vit << std::endl;
        ++vit;
        i++;
    }
    while (i > 0)
    {
        --vit;
        std::cout << COLOR_CYAN << "Reverse Iterator: " << RESET << *vit << std::endl;
        i--;
    }
    std::vector<int> vs(v);
    return 0;
}
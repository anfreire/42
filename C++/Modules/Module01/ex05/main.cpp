/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/06 03:20:26 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/13 21:25:06 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Harl.hpp"

int main()
{
    Harl harl;
    std::cout << "---------------" << std::endl;
    std::cout << "-----DEBUG-----" << std::endl;
    std::cout << "---------------" << std::endl;
    harl.complain("DEBUG");
    std::cout << std::endl;
    std::cout << "---------------" << std::endl;
    std::cout << "-----INFO------" << std::endl;
    std::cout << "---------------" << std::endl;
    harl.complain("INFO");
    std::cout << std::endl;
    std::cout << "---------------" << std::endl;
    std::cout << "----WARNING----" << std::endl;
    std::cout << "---------------" << std::endl;
    harl.complain("WARNING");
    std::cout << std::endl;
    std::cout << "---------------" << std::endl;
    std::cout << "-----ERROR-----" << std::endl;
    std::cout << "---------------" << std::endl;
    harl.complain("ERROR");
    std::cout << std::endl;
    return 0;
}
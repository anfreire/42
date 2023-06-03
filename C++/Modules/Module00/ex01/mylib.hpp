/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mylib.hpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/03 01:01:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/10 15:13:53 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef MYLIB_HPP
# define MYLIB_HPP

# include <iostream>
# include <string>
# include <stdlib.h>

namespace mylib
{
	bool			checkInput(std::string input);
	std::string		ft_itoa(int nbr);
	std::string		lowerCase(std::string str);
	bool			isNumber(std::string str);
};

#endif
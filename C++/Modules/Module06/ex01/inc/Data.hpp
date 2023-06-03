/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Data.hpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/29 19:51:39 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/29 20:15:00 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef DATA_HPP
# define DATA_HPP

# include <iostream>

struct Data
{
/*		Orthodox Canonical Form		*/
	Data();
	Data(const Data &src);
	Data &operator=(const Data &src);
	~Data();
/*		Members		*/
	int			memberInt;
	char		memberChar;
	std::string	memberString;
	float		memberFloat;
	double		memberDouble;
};

#endif
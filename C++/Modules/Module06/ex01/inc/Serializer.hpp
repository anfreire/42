/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*    Serializer.hpp                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/24 23:29:40 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/29 18:16:52 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef  SERIALIZER_HPP
# define  SERIALIZER_HPP

/*			Printing Constants			*/
# define	RESET				"\033[0m"
# define	COLOR_RED			"\033[1;31m"
# define	COLOR_GREEN			"\033[1;32m"
# define	COLOR_YELLOW		"\033[1;33m"
# define	COLOR_BLUE			"\033[1;34m"
# define	COLOR_MAGENTA		"\033[1;35m"
# define	COLOR_CYAN			"\033[1;36m"
# define	COLOR_WHITE			"\033[1;37m"
# define	BACKGROUND_RED		"\033[1;41m"
# define	BACKGROUND_GREEN	"\033[1;42m"
# define	BACKGROUND_YELLOW	"\033[1;43m"
# define	BACKGROUND_BLUE		"\033[1;44m"
# define	BACKGROUND_MAGENTA	"\033[1;45m"
# define	BACKGROUND_CYAN		"\033[1;46m"
# define	BACKGROUND_WHITE	"\033[1;47m"
# define	BACKGROUND_BLACK	"\033[1;48m"

# include <iostream>
# include <string>
# include <stdint.h>

class Data;

class  Serializer
{
	public:
/*		FUnctions		*/
		static uintptr_t serialize(Data* ptr);
		static Data* deserialize(uintptr_t raw);

	private:
/*		Orthodox Canonical Form		*/
		 Serializer();
		 Serializer(const  Serializer &src);
		 Serializer &operator=(const  Serializer &src);
		~ Serializer();
/*		Overridable Pure Virtual Function		*/
		virtual void	f() const = 0;
		
};

# include "Data.hpp"

#endif
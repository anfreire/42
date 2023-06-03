/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Brain.hpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/16 16:44:22 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/16 16:49:12 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef BRAIN_HPP
# define BRAIN_HPP

# include <iostream>

# define RESET "\033[0m"
# define RED "\033[1m\033[31m"
# define GREEN "\033[1m\033[32m"
# define YELLOW "\033[1m\033[33m"
# define BLUE "\033[1m\033[34m"
# define MAGENTA "\033[1m\033[35m"
# define CYAN "\033[1m\033[36m"
# define ORANGE "\033[1m\033[33m"
# define WHITE "\033[1m\033[37m"

class Brain
{
	private:
		std::string _ideas[100];
	public:
		Brain();
		Brain(const Brain &src);
		Brain &operator=(const Brain &src);
		~Brain();
		std::string getIdea(int i) const;
		void setIdea(int i, std::string idea);
};

#endif

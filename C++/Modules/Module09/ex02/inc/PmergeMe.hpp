/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PmergeMe.hpp                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/13 22:00:36 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/15 15:27:10 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


#ifndef PMERGEME_HPP
# define PMERGEME_HPP

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
# include <sstream>
# include <string>
# include <cstdlib>
# include <cstring>
# include <list>
# include <deque>
# include <typeinfo>
# include <cmath>
# include <limits>
# include <iomanip>
# include <sys/time.h>

# define	LIST			1
# define	DEQUE			2

//https://iq.opengenus.org/merge-insertion-sort/


class PmergeMe
{
	public:
		PmergeMe();
		PmergeMe(const PmergeMe &src);
		PmergeMe(char **av);
		PmergeMe &operator=(const PmergeMe &rhs);
		~PmergeMe();
		

	private:
		std::list<unsigned int>		_list;
		std::list<unsigned int>		*_listContainers;
		std::deque<unsigned int>	_deque;
		std::deque<unsigned int>	*_dequeContainers;
		unsigned int				_containersSize;

		void				mergeInsert(const int flag);
		void				divide(const int flag);
		bool				checkString(std::string str) const;
		bool				isDivideComplete(const int flag) const;
		bool				checkDuplicates(unsigned int *array, unsigned int arraySize) const;
		std::ostream		&printSingle(const int flag, std::ostream &os);
		std::ostream		&printMultiple(const int flag, std::ostream &os);
		std::ostream		&run(unsigned int *array, unsigned int arraySize, std::ostream &os);
		
		template <typename T> void	insertNumberRightPlace(unsigned int number, T &container)
		{
			for (typename T::iterator it = container.begin(); it != container.end(); it++)
			{
				if (number < *it)
				{
					container.insert(it, number);
					return ;
				}
			}
			container.insert(container.end(), number);
		}
		
		template <typename T> void	appendContainers(T part1, T part2, T& destine)
		{
			for (typename T::iterator it = part1.begin(); it != part1.end(); it++)
			{
				this->insertNumberRightPlace(*it, destine);
			}
			for (typename T::iterator it = part2.begin(); it != part2.end(); it++)
			{
				this->insertNumberRightPlace(*it, destine);
			}
		}
		
		template <typename T> void	splitContainer(T &destine1, T &destine2, T src)
		{
			typename T::iterator it = src.begin();
			for (unsigned int i = 0; it != src.end(); i++)
			{
				if (i < src.size() / 2)
					destine1.push_back(*it);
				else
					destine2.push_back(*it);
				it++;
			}
		}
};


#endif
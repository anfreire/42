/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Array.hpp                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 22:06:56 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/02 18:59:12 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


#ifndef WHATEVER_HPP
# define WHATEVER_HPP

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
# include <exception>

template <class T>
class Array
{
	public:
		Array()
		{
			this->_array = new T[0];
			this->_size = 0;
		};
		Array(unsigned int	n)
		{
			this->_array = new T[n];
			this->_size = static_cast<int>(n);
		};
		Array(const Array &src)
		{
			this->_array = new T[src._size];
			this->_size = src._size;
			for (int i = 0; i < this->_size; i++)
				this->_array[i] = src._array[i];
			
		};
		Array &operator=(const Array &src)
		{
			delete [] this->_array;
			this(src);
			return *this;
		};
		int	size(void)
		{
			return this->size;
		};
		T &operator[](int index)
		{
			if (index < 0 || index >= this->_size)
				throw std::exception();
			return this->_array[index];
			
		};
		~Array()
		{
			delete [] this->_array;
			return ;
		};
	
	private:
		T	*_array;
		int	_size;
		
};


#endif
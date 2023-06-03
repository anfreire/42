/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   MutantStack.hpp                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/05/08 21:31:57 by anfreire          #+#    #+#             */
/*   Updated: 2023/05/10 16:14:24 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef MUTANTSTACK_HPP
# define MUTANTSTACK_HPP

# include <iostream>
# include <iterator>
# include <stack>
# include <exception>

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


# define	BEGIN				0
# define	END					1

template <class A>
class MutantStack: public std::stack<A>
{
	public:
		class iterator
		{
			public:
/*				Constructors/Destructors		*/
				iterator() 											{ this->_array = new A[0];		this->_index = 0; this->_size = 0;		this->_tmp = NULL; }
				iterator(std::stack<A> &src, int type) 				{ this->_size = src.size();		this->_tmp = NULL;						this->copyStackToArray(src);	this->_index = (type == BEGIN) ? 0 : static_cast<unsigned int>(this->_size); }
				iterator &operator=(const iterator &src)			{ delete [] this->_array;		this->tmpDelete();						this(src); return *this; }
				iterator(const iterator &src)						{ this->_index = src._index;	this->_size = src._size;				this->_tmp = src._tmp;			this->copyArraytoArray(src._array); }
				~iterator()											{ delete [] this->_array;		this->tmpDelete(); }
/*				Operator Overloads				*/
				bool operator!=(const iterator &src) const			{ return	(this->_size != src._size || this->_index != src._index || !this->isArrayEqual(src))		? true : false; }
				bool operator==(const iterator &src) const			{ return	(this->_size == src._size && this->_index == src._index && this->isArrayEqual(src))			? true : false; }
				iterator &operator++()								{ if	(this->_index >= this->_size)	return *this;		this->_index++;			return *this; }
				iterator &operator--()								{ if	(this->_index <= 0) 			return *this;		this->_index++;			return *this; }
				iterator &operator++(int)							{ this->tmpDelete();	if (this->_index >= this->_size)	return *this;			this->_tmp = new iterator(*this);		this->_index++;			return *this; }
				iterator &operator--(int)							{ this->tmpDelete();	if (this->_index <= 0) 				return *this;			this->_tmp = new iterator(*this);		this->_index--;			return *this; }
				A operator*() const									{ if	(this->_index < 0 && this->_index > this->_size)	throw std::out_of_range("Out of range");			if (this->_index == this->_size)	throw std::out_of_range("Can't dereference end()");			return this->_array[this->_index]; }
/*				Helper Functions				*/
				bool	isArrayEqual(const iterator &src) const		{ for	(unsigned int i = 0; i < this->_size && i < src._size; i++)		if (this->_array[i] != src._array[i]) return false;							return true;}
				void	copyStackToArray(std::stack<A> &src)		{ this->_array = new A[src.size()];		std::stack<A> tmp = src;		for (int i = static_cast<int>(src.size() - 1); i >= 0; i--)	{ this->_array[i] = tmp.top();	tmp.pop(); } }
				void	copyArraytoArray(A *src)					{ this->_array = new A[this->_size];	for (unsigned int i = 0; i < this->_size; i++)	this->_array[i] = src[i]; }
				void	tmpDelete()									{ if (this->_tmp)	delete this->_tmp;		this->_tmp = NULL; }
			private:
				unsigned int	_index;
				size_t			_size;
				iterator		*_tmp;
				A				*_array;
		};
		MutantStack() 						:	std::stack<A>()		{ }
		MutantStack(const MutantStack &src) :	std::stack<A>(src)	{ }
		MutantStack &operator=(const MutantStack &src) 				{ this->std::stack<A>::operator=(src);	return *this; }
		~MutantStack() 												{ }
		iterator begin()											{ return iterator(*this, BEGIN); }
		iterator end()												{ return iterator(*this, END); }
		
};




#endif
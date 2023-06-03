/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   easyfind.hpp                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/30 16:53:27 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/30 16:54:07 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef EASYFIND_HPP
# define EASYFIND_HPP

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

# define	BAD_INPUT_DATE		-1
# define	NOT_POSITIVE		-2
# define	TOO_LARGE			-3
# define	BAD_INPUT_EMPTY		-4

# include <iostream>
# include <fstream>
# include <sstream>
# include <string>
# include <cstring>
# include <algorithm>
# include <ctime>
# include <vector>

class BitcoinExchange
{
	public:
		BitcoinExchange(const std::string dataPath, const std::string inputPath); 
		BitcoinExchange(const BitcoinExchange &src);
		BitcoinExchange &operator=(const BitcoinExchange &src);
		~BitcoinExchange();
		void	parseData();
		void	parseInput();
		int		getDateIndex(std::vector<int> date);
		float 	getAmount(int index, float amount);
		void	run();
		std::string	trim(std::string original);
		std::string	get_date_right(int	date);

	private:
		BitcoinExchange();
		const std::string									_dataPath;
		const std::string									_inputPath;
		std::vector<std::pair<std::vector<int>, float> >	_data;
		std::vector<std::pair<std::vector<int>, float> >	_input;
};

std::ostream &operator<<(std::ostream &os, const BitcoinExchange &src);



#endif
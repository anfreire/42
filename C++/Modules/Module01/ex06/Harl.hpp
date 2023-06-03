/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Harl.hpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/06 02:35:33 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/06 03:51:09 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef HARL_HPP
# define HARL_HPP
#include <iostream>
#include <map>

enum Level {
    DEBUG,
    INFO,
    WARNING,
    ERROR
};

class Harl
{
    public:
        Harl(void);
        ~Harl(void);
        void    complain(std::string level);
        
    private:
        std::map<std::string, Level> levelMap;
        void        debug( void );
        void        info( void );
        void        warning( void );
        void        error( void );
        
};

#endif
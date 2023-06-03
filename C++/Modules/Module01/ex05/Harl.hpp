/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Harl.hpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/06 02:35:33 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/06 03:12:15 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef HARL_HPP
# define HARL_HPP
#include <iostream>

class Harl
{
    public:
        Harl(void);
        ~Harl(void);
        void    complain(std::string level);
        
    private:
        void        debug( void );
        void        info( void );
        void        warning( void );
        void        error( void );
        
};

#endif
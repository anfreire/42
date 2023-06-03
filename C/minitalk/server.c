/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/05/15 19:08:48 by anfreire          #+#    #+#             */
/*   Updated: 2022/05/17 16:10:19 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

char	g_c = START_CHAR;

void	ft_recieve_msg(int sig)
{
	if (sig == SIGUSR1)
		g_c++;
	else
	{
		ft_putchar_fd(g_c, 1);
		g_c = START_CHAR;
	}
}

int	main(void)
{	
	ft_printf("Server PID: %u\n", getpid());
	signal(SIGUSR1, ft_recieve_msg);
	signal(SIGUSR2, ft_recieve_msg);
	while (1)
		pause();
	return (0);
}

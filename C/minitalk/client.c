/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   client.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/05/15 19:08:48 by anfreire          #+#    #+#             */
/*   Updated: 2022/05/17 16:09:28 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

static void	ft_send_msg(int pid, char *str)
{
	int	i;
	int	dif;

	i = 0;
	while (str[i])
	{
		if (str[i] != START_CHAR)
			dif = (int)str[i] - START_CHAR;
		while (dif)
		{
			kill(pid, SIGUSR1);
			dif--;
			usleep(80);
		}
		kill(pid, SIGUSR2);
		i++;
	}
}

int	main(int argc, char *argv[])
{
	int		pid;

	if (argc != 3)
	{
		ft_printf("wrong number of arguments\n");
		return (0);
	}
	pid = ft_atoi(argv[1]);
	ft_send_msg(pid, argv[2]);
	return (0);
}

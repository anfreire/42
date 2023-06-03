/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   exit_shell.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/18 10:51:25 by anfreire          #+#    #+#             */
/*   Updated: 2022/11/12 12:43:12 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

void	exit_shell(t_data *data)
{
	if (!data->line)
		exit_shell_sig(1);
}

void	exit_shell_sig(int sig)
{
	if (sig == 1)
		printf("exit\n");
	exit(0);
}

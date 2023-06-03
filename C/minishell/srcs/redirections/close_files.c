/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   close_files.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 13:45:55 by ratinhosujo       #+#    #+#             */
/*   Updated: 2023/01/20 18:20:31 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

void	handle_exit_status(void)
{
	WEXITSTATUS(g_exit);
	if (g_exit == 131)
		g_exit = 131;
	else if (g_exit > 255)
		g_exit /= 256;
}

void	close_pipes(t_data *data)
{
	int	i;
	int	size;

	i = -1;
	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (size == 0)
		free_heredoc(data);
	while (++i < size)
		close(data->ids.pfd[i][1]);
	i = -1;
	while (++i < size)
		close(data->ids.pfd[i][0]);
	i = -1;
}

void	close_files(t_data *data)
{
	int	i;
	int	size;

	i = -1;
	close_pipes(data);
	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (builtin_detector(data, data->par_line[0]) > 3)
		i = -1;
	else
	{
		while (++i < size)
		{
			waitpid(data->ids.id[i], &g_exit, 0);
			if (g_exit > 255)
				g_exit /= 256;
		}
		signal(SIGINT, sig_handler);
	}
	handle_exit_status();
}

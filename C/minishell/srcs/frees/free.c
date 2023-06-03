/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   free.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/09/08 22:14:03 by dmendonc          #+#    #+#             */
/*   Updated: 2022/11/09 13:50:10 by dmendonc      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

void	free_heredoc(t_data *data)
{
	free(data->redir.hdoc_key);
	free(data->ids.id);
	free(data->ids.pfd);
}

void	free_line(t_data *data)
{
	int	i;

	i = -1;
	while (data->par_line && data->par_line[++i])
		free(data->par_line[i]);
	if (data->cmd.cmd_nbr > 0)
	{
		while (++i < data->cmd.cmd_nbr - data->safety_cmd)
			free(data->paths.path_cmd[i]);
		free(data->paths.path_cmd);
		free(data->cmd.cmdx);
	}
	free(data->par_line);
	i = -1;
	while (data->paths.paths[++i])
		free(data->paths.paths[i]);
	free(data->paths.paths[i]);
	free(data->paths.paths);
	data->paths.paths = NULL;
	free(data->paths.p_str);
	i = -1;
	free(data->ids.inp_list);
	free_builtins(data);
	free_redirect(data);
}

void	free_line_info(t_data *data)
{
	int	i;

	i = -1;
	if (data->cmd.cmd_nbr > 0)
		free_cmds(data);
	while (data->par_line && data->par_line[++i])
		free(data->par_line[i]);
	free(data->par_line);
	i = -1;
	if (data->paths.p_str != NULL)
	{
		while (data->paths.paths[++i])
			free(data->paths.paths[i]);
		free(data->paths.paths[i]);
		free(data->paths.paths);
		data->paths.paths = NULL;
		free(data->paths.p_str);
	}
	free(data->ids.inp_list);
	free_builtins(data);
	free_redirect(data);
}

void	free_cmds(t_data *data)
{
	int	i;
	int	j;

	i = -1;
	while (data->cmd.cmdx[++i])
	{
		j = -1;
		while (data->cmd.cmdx[i][++j])
			free(data->cmd.cmdx[i][j]);
		free(data->cmd.cmdx[i]);
	}
	free(data->cmd.cmdx);
	i = -1;
	while (++i < data->cmd.cmd_nbr - data->safety_cmd)
		free(data->paths.path_cmd[i]);
	free(data->paths.path_cmd);
	data->ids.in_fd = STDIN_FILENO;
	data->ids.out_fd = STDOUT_FILENO;
}

void	free_new_cmds(t_data *data, int index)
{
	int	i;
	int	j;

	i = -1;
	while (data->cmd.cmdx[++i])
	{
		j = -1;
		while (data->cmd.cmdx[i][++j])
			free(data->cmd.cmdx[i][j]);
		free(data->cmd.cmdx[i]);
	}
	free(data->cmd.cmdx);
	i = -1;
	while (++i < index)
		free(data->paths.path_cmd[i]);
	free(data->paths.path_cmd);
}

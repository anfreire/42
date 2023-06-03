/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   free3.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 13:27:48 by ratinhosujo       #+#    #+#             */
/*   Updated: 2023/01/20 18:53:41 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

void	free_builtins(t_data *data)
{
	int	i;
	int	j;

	if (data->built.builtin_n > 0)
	{
		i = -1;
		while (++i < data->built.builtin_n - data->safety_blt)
		{
			j = -1;
			while (data->built.builtin[i][++j])
				free(data->built.builtin[i][j]);
			free(data->built.builtin[i]);
		}
		free(data->built.builtin[i]);
		free(data->built.builtin);
	}
	i = -1;
	while (data->built.builtins[++i])
		free(data->built.builtins[i]);
	free(data->built.builtins[i]);
	free(data->built.builtins);
}

void	free_redirect(t_data *data)
{
	int	i;
	int	size;

	i = -1;
	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (size > 0)
	{
		while (++i <= size)
		{
			free(data->redir.input[i]);
			free(data->redir.output[i]);
		}
	}
	free(data->redir.input);
	free(data->redir.output);
	data->redir.input = NULL;
	data->redir.output = NULL;
	free(data->redir.redir_lib);
}

void	more_frees_for_exit(t_data *data)
{
	free(data->envp);
	free(data->ids.pfd);
	free(data->ids.id);
	free(data->ids.indicador);
	if (data->ids.inp_list)
		free(data->ids.inp_list);
	if (data->ids.outp_list)
		free(data->ids.outp_list);
	free_builtins(data);
	free(data->redir.redir_lib);
}

void	free_for_exit(t_data *data)
{
	int	i;

	i = -1;
	while (data->envp[++i])
		free(data->envp[i]);
	i = -1;
	if (data->paths.p_str != NULL)
	{
		while (data->paths.paths[++i])
			free(data->paths.paths[i]);
		free(data->paths.paths);
		free(data->paths.p_str);
	}
	i = -1;
	while (data->par_line[++i])
		free(data->par_line[i]);
	free(data->par_line);
	more_frees_for_exit(data);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   free2.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/09 10:57:02 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/19 18:12:32 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

static void	extra_p_free_2(t_data *data)
{
	if (data->ids.outp_list)
		free(data->ids.outp_list);
	free(data->ids.indicador);
	if (data->paths.indicador)
		free(data->paths.indicador);
	null_them_var(data);
}

void	extra_free_for_builtins(t_data *data)
{
	int	i;

	if (data->ids.inp_list)
		free(data->ids.inp_list);
	if (data->ids.outp_list)
		free(data->ids.outp_list);
	free_builtins(data);
	i = -1;
	if (data->paths.p_str != NULL)
	{
		while (data->paths.paths[++i])
			free(data->paths.paths[i]);
		free(data->paths.paths);
		free(data->paths.p_str);
	}
	free_redirect(data);
}

void	free_for_builtins(t_data *data, int index)
{
	int	i;
	int	size;

	i = -1;
	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (data->cmd.cmd_nbr > 0)
		free_new_cmds(data, index);
	while (data->envp[++i])
		free(data->envp[i]);
	free(data->envp);
	i = -1;
	while (++i < size)
		free(data->ids.pfd[i]);
	free(data->ids.pfd);
	free(data->ids.id);
	free(data->ids.indicador);
	i = -1;
	while (data->par_line[++i])
		free(data->par_line[i]);
	free(data->par_line);
	extra_free_for_builtins(data);
}

void	extra_protection_free(t_data *data)
{
	int	valor;

	if (data->ids.indicador)
		valor = data->ids.indicador[0];
	if (data->ids.pfd)
	{
		while (--valor >= 0)
			free(data->ids.pfd[valor]);
		free(data->ids.pfd);
	}
	if (data->ids.id)
		free(data->ids.id);
	if (data->redir.input)
	{
		if (data->ids.indicador)
			valor = data->ids.indicador[1];
	}
	extra_p_free_2(data);
}

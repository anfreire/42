/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parsing_allocs.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/18 07:30:34 by dmendonc          #+#    #+#             */
/*   Updated: 2022/11/09 13:52:07 by dmendonc      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	return_i(t_data *data, int i)
{
	if (builtin_detector(data, data->par_line[i]) == 5 && \
	data->par_line[i + 1])
		i++;
	return (i);
}

void	parse_alloc(t_data *data)
{
	create_lists(data);
	count_line(data);
	alloc_cmds(data);
	alloc_redirections(data);
	if (data->built.builtin_n > 0)
	{
		data->built.builtin = (char ***)malloc((data->built.builtin_n + 1)
				* sizeof(char **));
		data->built.builtin[data->built.builtin_n] = NULL;
	}
}

// -----------------------------------------------------------------------------
// Fully allocates data.ids.pfd[size] and allocates both char *** for  cmdx
// and paths.path_cmd.
// -----------------------------------------------------------------------------

void	alloc_cmds(t_data *data)
{
	if (data->cmd.cmd_nbr > 0)
	{
		data->cmd.cmdx = (char ***)malloc((data->cmd.cmd_nbr + 1) \
				* sizeof(char **));
		data->paths.indicador = malloc(sizeof(int) * 2);
		*data->paths.indicador = data->cmd.cmd_nbr + 1;
		data->paths.path_cmd = (char **)malloc((data->cmd.cmd_nbr + 1) \
				* sizeof(char *));
		data->cmd.cmdx[data->cmd.cmd_nbr] = NULL;
		data->paths.path_cmd[data->cmd.cmd_nbr] = NULL;
	}
}

// -----------------------------------------------------------------------------
// Fully allocates redir.input[size] and allocates both char ** for
// collecting the file name of the input (or EOF), and the file of the output.
// -----------------------------------------------------------------------------

void	alloc_redirections(t_data *data)
{
	int	size;

	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (size == 0)
	{
		data->ids.inp_list = (int *)malloc(sizeof(int));
	}
	else
		data->ids.inp_list = (int *)malloc(size * sizeof(int));
	if (data->par_line[0] && builtin_detector(data, data->par_line[0]) != 7)
		allocat_lists(data, size);
}

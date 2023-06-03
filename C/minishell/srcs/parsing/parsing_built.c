/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parsing_built.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/09/06 23:07:12 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 14:39:18 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

void	parse_builtin(t_data *data, int i, int index)
{
	int	j;
	int	l;
	int	len;

	l = -1;
	len = len_str(data->par_line[i]);
	while (data->built.builtins[++l])
	{
		j = -1;
		while (data->built.builtins[l][++j])
		{
			if (data->par_line[i][j] != data->built.builtins[l][j])
				break ;
		}
		if (j == len)
		{
			builting(data, i, index);
			break ;
		}
	}
}

void	builting(t_data *data, int i, int index)
{
	int	size;

	size = i;
	while (data->par_line[++size])
	{
		if (full_detector(data, data->par_line[size]) > 0)
			break ;
	}
	size -= i;
	data->built.args = size;
	data->built.builtin[index] = (char **)malloc((size + 1) * sizeof(char *));
	data->built.builtin[index][size] = NULL;
	size = 0;
	while (data->par_line[i])
	{
		if (full_detector(data, data->par_line[i]) < 1)
			built_builting(data, i, size, index);
		else if (full_detector(data, data->par_line[i]) == 1 && size == 0)
			built_builting(data, i, size, index);
		else
			break ;
		i++;
		size++;
	}
}

void	built_builting(t_data *data, int i, int size, int index)
{
	int	len;

	len = len_str(data->par_line[i]) + 1;
	data->built.builtin[index][size] = (char *)malloc(len * sizeof(char));
	data->built.builtin[index][size][len - 1] = 0;
	len = -1;
	while (data->par_line[i][++len])
		data->built.builtin[index][size][len] = data->par_line[i][len];
}

static void	allocat_lists_aux(t_data *data, int size)
{
	data->ids.id = (int *)malloc(size * sizeof(int));
	data->ids.pfd = (int **)malloc(size * sizeof(int *));
	data->redir.input = (char **)malloc((size + 1) * sizeof(char *));
	data->redir.output = (char **)malloc((size + 1) * sizeof(char *));
	data->ids.outp_list = (int *)malloc(size * sizeof(int));
	if (size > 0)
	{
		data->redir.input[size] = NULL;
		data->redir.output[size] = NULL;
	}
}

void	allocat_lists(t_data *data, int size)
{
	int			i;

	extra_protection_free(data);
	if (size == 0)
		return ;
	allocat_lists_aux(data, size);
	i = -1;
	data->ids.indicador = malloc(sizeof(int) * 3);
	data->ids.indicador[0] = 0;
	data->ids.indicador[1] = 0;
	while (++i < size)
	{
		data->ids.pfd[i] = (int *)malloc(2 * sizeof(int));
		data->ids.indicador[0]++;
		if (pipe(data->ids.pfd[i]) != 0)
			return ;
		data->redir.input[i] = (char *)malloc(sizeof(char));
		data->redir.output[i] = (char *)malloc(sizeof(char));
		data->ids.indicador[1]++;
		data->ids.inp_list[i] = STDIN_FILENO;
		data->ids.outp_list[i] = STDOUT_FILENO;
	}
}

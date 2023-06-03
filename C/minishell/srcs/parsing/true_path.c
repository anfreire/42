/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   true_path.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/05 18:02:07 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/06 19:16:42 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	alloc_true_path(t_data *data, int index, int i, int count)
{
	int	j;
	int	len;
	int	start;

	j = 0;
	while (data->par_line[i][j])
	{
		if (data->par_line[i][j] == '/')
		{
			start = j + 1;
			len = 0;
		}
		j++;
		len++;
	}
	data->cmd.cmdx[index] = (char **)malloc((count + 2) * sizeof(char *));
	data->cmd.cmdx[index][count + 1] = NULL;
	data->cmd.cmdx[index][0] = (char *)malloc((len) * sizeof(char));
	data->cmd.cmdx[index][0][len - 1] = 0;
	return (start);
}

int	cpy_true_path(t_data *data, int index, int i, int count)
{
	int	j;
	int	start;

	j = 0;
	start = alloc_true_path(data, index, i, count);
	while (data->par_line[i][start])
	{
		data->cmd.cmdx[index][0][j] = data->par_line[i][start];
		start++;
		j++;
	}
	while (data->par_line[i][j])
		j++;
	return (j);
}

void	true_path(t_data *data, int index, int i, int count)
{
	int	j;
	int	len;

	j = 0;
	cpy_true_path(data, index, i, count);
	while (++j <= count)
	{
		len = 0;
		i++;
		while (data->par_line[i] && data->par_line[i][len])
			len++;
		data->cmd.cmdx[index][j] = (char *)malloc((len + 1) * sizeof(char));
		data->cmd.cmdx[index][j][len] = '\0';
		len = -1;
		while (data->par_line[i] && data->par_line[i][++len])
			data->cmd.cmdx[index][j][len] = data->par_line[i][len];
	}
}

int	true_path_join(t_data *data, int index, int i)
{
	int	j;

	j = 0;
	while (data->par_line[i][j])
		j++;
	data->paths.path_cmd[index] = (char *)malloc((j + 1) * sizeof(char));
	data->paths.path_cmd[index][j] = '\0';
	j = -1;
	while (data->par_line[i][++j])
		data->paths.path_cmd[index][j] = data->par_line[i][j];
	if (access(data->paths.path_cmd[index], X_OK) == 0 \
		&& !is_dot_cmd(data->paths.path_cmd[index]))
		return (1);
	return (0);
}

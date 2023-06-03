/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parsing_cmds.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/29 01:04:26 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/19 17:20:01 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

// -----------------------------------------------------------------------------
// Function allocates all data gpaths.iven for the commands, and stores cmdx.
// matrix that has the format exemplified below:
// cmdx[cmd n-1]+...  [0] = "ls"	;	[1] = "-a"
// cmdx[cmd n]  +... [0] = "grep"	;	[1] = "hello"
// -----------------------------------------------------------------------------

void	parse_cmd(t_data *data, int index)
{
	int	i;
	int	count;

	i = get_cmd_i(data, index);
	count = count_cmd_args(data, i);
	if (cmd_detector(data, data->par_line[i]) == 2)
	{
		true_path(data, index, i, count);
		return ;
	}
	parse_real_cmd(data, index, i, count);
}

void	parse_real_cmd(t_data *data, int index, int i, int count)
{
	int	j;
	int	k;

	j = -1;
	data->cmd.cmdx[index] = (char **)malloc((count + 2) * sizeof(char *));
	data->cmd.cmdx[index][count + 1] = NULL;
	while (++j <= count)
	{
		k = 0;
		while (data->par_line[i][k])
			k++;
		data->cmd.cmdx[index][j] = (char *)malloc((k + 1) * sizeof(char));
		data->cmd.cmdx[index][j][k] = '\0';
		k = -1;
		while (data->par_line[i][++k])
			data->cmd.cmdx[index][j][k] = data->par_line[i][k];
		i++;
	}
}

void	parse_cmds(t_data *data)
{
	int	i;
	int	cmds;

	i = 0;
	cmds = data->cmd.cmd_nbr + 1;
	while (--cmds > 0)
	{
		parse_cmd(data, i);
		i++;
	}
}

// -----------------------------------------------------------------------------
// Function tests if theres the command executable file in the paths of my env.
// -----------------------------------------------------------------------------

int	acessing_cmd(t_data *data, int index, int i)
{
	int	j;
	int	c;

	j = -1;
	c = 0;
	while (data->paths.paths[c])
		c++;
	while (++j < c)
	{
		path_join(data, index, j);
		if (access(data->paths.path_cmd[index], X_OK) == 0 \
			&& !is_dot_cmd(data->paths.path_cmd[index]))
			return (1);
		else
			free(data->paths.path_cmd[index]);
	}
	if (true_path_join(data, index, i) == 1)
		return (1);
	return (0);
}

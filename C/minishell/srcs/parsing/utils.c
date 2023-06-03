/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/05 21:47:15 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 18:09:17 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	count_cmd_args(t_data *data, int i)
{
	int	count;

	count = 0;
	while (data->par_line[++i])
	{
		if (builtin_detector(data, data->par_line[i]) >= 0)
			break ;
		if (redir_detector(data, data->par_line[i]) > 0)
			break ;
		if (cmd_detector(data, data->par_line[i]) == 1)
			break ;
		count++;
	}
	return (count);
}

int	get_cmd_i(t_data *data, int index)
{
	int	i;
	int	count;

	i = -1;
	count = 0;
	while (data->par_line[++i])
	{
		if (builtin_detector(data, data->par_line[i]) >= 0)
		{
			i = run_c(data, i);
			continue ;
		}
		if (cmd_detector(data, data->par_line[i]) == 1)
		{
			if (builtin_detector(data, data->par_line[i]) == -1)
				count++;
		}
		else if (cmd_detector(data, data->par_line[i]) == 2)
			count++;
		if (count == index + 1)
			break ;
	}
	return (i);
}

void	create_lists(t_data *data)
{
	data->built.builtins = (char **)malloc(9 * sizeof(char *));
	data->redir.redir_lib = (char *)malloc(4 * sizeof(char));
	get_str(data, "echo", 0);
	get_str(data, "pwd", 1);
	get_str(data, "env", 2);
	get_str(data, "export", 3);
	get_str(data, "unset", 4);
	get_str(data, "cd", 5);
	get_str(data, "./minishell", 6);
	get_str(data, "exit", 7);
	data->built.builtins[8] = NULL;
	data->redir.redir_lib[3] = 0;
	data->redir.redir_lib[0] = '|';
	data->redir.redir_lib[1] = '<';
	data->redir.redir_lib[2] = '>';
	data->ids.in_fd = STDIN_FILENO;
	data->ids.out_fd = STDOUT_FILENO;
}

void	get_str(t_data *data, char *str, int index)
{
	int	i;

	i = 0;
	while (str[i])
		i++;
	data->built.builtins[index] = (char *)malloc((i + 1) * sizeof(char));
	data->built.builtins[index][i] = 0;
	i = -1;
	while (str[++i] != 0)
		data->built.builtins[index][i] = str[i];
}

void	null_them_var(t_data *data)
{
	data->ids.id = NULL;
	data->ids.pfd = NULL;
	data->redir.input = NULL;
	data->redir.output = NULL;
	data->ids.outp_list = NULL;
	data->redir.input = NULL;
	data->redir.output = NULL;
	data->ids.indicador = NULL;
	data->paths.indicador = NULL;
}

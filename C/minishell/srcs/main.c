/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/18 06:49:28 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/20 18:34:13 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../header.h"

int	g_exit;

int	walk_till_executable(t_data *data, int i)
{
	int	len;

	len = 0;
	data->redir.flag = 0;
	while (data->par_line[len])
		len++;
	i = run_line(data, i);
	if (data->redir.flag > 1)
		command_not_found(data);
	if (data->redir.flag == 0 && i != len)
	{
		handle_error(data, i);
		return (-1);
	}
	if (i == len)
		return (-1);
	return (i - 1);
}

void	braining_cmds(t_data *data, int i)
{
	if (test_if_run(data, i) > 0)
	{
		run_command(data, data->redir.r_counter, data->cmd.c_counter, \
		i);
		data->cmd.c_counter++;
		data->redir.r_counter++;
		data->flag = 0;
	}
	else
		data->safety_cmd++;
}

void	braining_builtins(t_data *data, int i)
{
	parse_builtin(data, i, data->built.b_counter);
	exec_builtin(data, data->redir.r_counter, i);
	data->built.b_counter++;
	data->flag = 1;
}

void	brain(t_data *data)
{
	int	i;

	i = -1;
	if (data->line == NULL || data->line[0] == '\0')
		return ;
	while (data->par_line[++i])
	{
		if (builtin_detector(data, data->par_line[i]) >= 0)
			braining_builtins(data, i);
		else if (cmd_detector(data, data->par_line[i]) > 0 && \
			data->paths.p_str != NULL)
			braining_cmds(data, i);
		i = walk_till_executable(data, i);
		if (i < 0)
			break ;
	}
	close_files(data);
}

int	main(int argc, char *argv[], char *envp[])
{
	t_data	data;

	if (argc < 1 || *argv == NULL)
		return (0);
	starting(&data, envp);
	null_them_var(&data);
	while (1)
	{
		handle_line(&data);
		if (main_proceed_cannot(&data))
			continue ;
		parse_alloc(&data);
		if (redirect(&data) < 0)
		{
			free_line(&data);
			continue ;
		}
		parse_cmds(&data);
		brain(&data);
		free_line_info(&data);
	}
	return (0);
}

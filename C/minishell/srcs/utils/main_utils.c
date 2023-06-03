/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main_utils.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/20 18:29:39 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 18:44:43 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

void	handle_line(t_data *data)
{
	get_line(data);
	starting_vars(data);
	parse_line(data);
	get_paths(data);
}

int	test_if_run2(t_data *data, int i)
{
	int	j;

	j = -1;
	if (!ft_strncmp("wc", data->par_line[i], ft_strlen(data->par_line[i])))
	{
		while (data->built.builtins[++j])
		{
			if (data->par_line[i + 1] && !ft_strncmp(data->par_line[i + 1], \
			data->built.builtins[j], ft_strlen(data->par_line[i + 1])))
				return (-1);
		}
		if (data->par_line[i + 1] && \
		is_viable_path(data, data->par_line[i + 1]))
			return (-1);
	}
	return (1);
}

int	test_if_run(t_data *data, int i)
{
	int	j;

	j = -1;
	if (!ft_strncmp("ls", data->par_line[i], ft_strlen(data->par_line[i])))
	{
		while (data->built.builtins[++j])
		{
			if (data->par_line[i + 1] && !ft_strncmp(data->par_line[i + 1], \
			data->built.builtins[j], ft_strlen(data->par_line[i + 1])))
				return (-1);
		}
		if (data->par_line[i + 1] && \
		is_viable_path(data, data->par_line[i + 1]))
			return (-1);
	}
	if (test_if_run2(data, i) < 0)
		return (-1);
	return (1);
}

int	run_line_builtin(t_data *data, int i)
{
	while (data->par_line[i])
	{
		if (redir_detector(data, data->par_line[i]) == 1)
		{
			data->redir.flag++;
			i++;
			data->flag = 0;
			break ;
		}
		i++;
	}
	return (i);
}

int	run_line(t_data *data, int i)
{
	int	size;

	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (size == 0)
		no_command_not_found(data);
	while (data->par_line[++i])
	{
		if (redir_detector(data, data->par_line[i]) == 1)
			data->redir.flag++;
		if (i - 1 >= 0 && builtin_detector(data, data->par_line[i - 1]) >= 0)
		{
			i = run_line_builtin(data, i);
			break ;
		}
		else if (cmd_detector(data, data->par_line[i]) == 1 \
			&& data->paths.p_str != NULL)
			break ;
		else if (cmd_detector(data, data->par_line[i]) == 2 \
			&& data->paths.p_str != NULL)
			break ;
	}
	return (i);
}

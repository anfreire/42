/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   count_line.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/20 17:41:45 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 18:08:10 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	run_count_b(t_data *data, int i)
{
	data->built.builtin_n++;
	while (data->par_line[++i])
	{
		if (redir_detector(data, data->par_line[i]) == 1)
			break ;
	}
	return (i);
}

int	run_count_c(t_data *data, int i)
{
	data->cmd.cmd_nbr++;
	while (data->par_line[++i])
	{
		if (redir_detector(data, data->par_line[i]) == 1)
			break ;
	}
	return (i);
}

int	run_c(t_data *data, int i)
{
	while (data->par_line[++i])
	{
		if (redir_detector(data, data->par_line[i]) == 1)
			break ;
	}
	return (i);
}

void	run_count_redir(t_data *data, int i)
{
	if (redir_detector(data, data->par_line[i]) == 2)
		data->redir.input_n++;
	if (redir_detector(data, data->par_line[i]) == 3)
		data->redir.heredoc_n++;
	if (redir_detector(data, data->par_line[i]) == 4)
		data->redir.output_n++;
	if (redir_detector(data, data->par_line[i]) == 5)
		data->redir.append_n++;
}

void	count_line(t_data *data)
{
	int	i;

	i = -1;
	set_counters(data);
	while (data->par_line[++i])
	{
		if (builtin_detector(data, data->par_line[i]) >= 0)
		{
			i = run_count_b(data, i);
			if (!data->par_line[i])
				return ;
		}
		else if (cmd_detector(data, data->par_line[i]) > 0)
		{
			i = run_count_c(data, i);
			if (!data->par_line[i])
				return ;
		}
		else if (redir_detector(data, data->par_line[i]) > 1)
			run_count_redir(data, i);
	}
}

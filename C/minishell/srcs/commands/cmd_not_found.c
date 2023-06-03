/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cmd_not_found.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/11/23 17:26:55 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/18 23:46:52 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

void	check_for_hdoc(t_data *data, int *index, int *flag)
{
	int	i;

	i = -1;
	while (data->par_line[++i] != NULL)
	{
		if (redir_detector(data, data->par_line[i]) == 3)
		{
			*flag = 0;
			if (i != 0)
				*index = 0;
			else
				*index = 2;
		}
	}
}

int	par_line_len(t_data *data)
{
	int	i;

	i = 0;
	while (data->par_line[i])
		i++;
	return (i);
}

void	no_command_not_found(t_data *data)
{
	int	len;
	int	flag;
	int	index;

	flag = 1;
	check_for_hdoc(data, &index, &flag);
	len = par_line_len(data);
	if (flag == 0 && index < len)
	{
		len = ft_strlen(data->par_line[index]);
		write(2, data->par_line[index], len);
		write(2, ": command not found\n", 20);
	}
	if (flag == 1)
	{
		len = ft_strlen(data->par_line[0]);
		write(2, data->par_line[0], len);
		write(2, ": command not found\n", 20);
	}
	g_exit = 127;
}

void	command_not_found(t_data *data)
{
	int	i;
	int	len;

	i = -1;
	while (data->par_line[++i] != NULL)
	{
		if (redir_detector(data, data->par_line[i]) == 0)
		{
			len = ft_strlen(data->par_line[i]);
			write(2, data->par_line[i], len);
			write(2, ": command not found\n", 20);
			break ;
		}
		else if (data->par_line[i + 2])
			i++;
	}
}

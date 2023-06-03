/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   starting_2.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/20 18:28:58 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/20 18:43:28 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

extern int	g_exit;

static int	detetct_error_3(t_data *data, int i)
{
	if (ft_strlen(data->par_line[i]) > 2)
	{
		if (data->par_line[i][0] == '<' && data->par_line[i][1] == '<')
		{
			if (data->par_line[i][2] == '<' || data->par_line[i][2] == '>')
				return (-1);
		}
		else if (data->par_line[i][0] == '>' && data->par_line[i][1] == '>')
		{
			if (data->par_line[i][2] == '<' || data->par_line[i][2] == '>')
				return (-1);
		}
	}
	else if (!ft_strncmp(data->par_line[i], "<<", 3) || \
		!ft_strncmp(data->par_line[i], ">>", 3))
	{
		if (data->par_line[i + 1] && \
			(!ft_strncmp(data->par_line[i + 1], "<<", 3) || \
		!ft_strncmp(data->par_line[i + 1], ">>", 3) || \
		!ft_strncmp(data->par_line[i + 1], ">", 2) || \
		!ft_strncmp(data->par_line[i + 1], "<", 2)))
			return (-1);
	}
	return (0);
}

static int	detect_error_2(t_data *data, int i)
{
	if (ft_strlen(data->par_line[i]) > 2)
	{
		if (data->par_line[i][0] == '<' && !data->par_line[i + 1])
		{
			return (-1);
		}
		if (data->par_line[i][0] == '>' && !data->par_line[i + 1])
		{
			return (-1);
		}
	}
	detetct_error_3(data, i);
	return (0);
}

static int	detect_error(t_data *data, int i)
{
	if ((!ft_strncmp(data->par_line[i], ">", 2) || \
	!ft_strncmp(data->par_line[i], "<", 2)))
	{
		if (data->par_line[i + 1] && \
		(!ft_strncmp(data->par_line[i + 1], ">", 2) || \
		!ft_strncmp(data->par_line[i + 1], "<", 2)))
		{
			if (data->par_line[i + 2] && \
				(!ft_strncmp(data->par_line[i + 2], "<<", 3) || \
				!ft_strncmp(data->par_line[i + 2], ">>", 3) || \
				!ft_strncmp(data->par_line[i + 2], ">", 2) || \
				!ft_strncmp(data->par_line[i + 2], "<", 2)))
				return (-1);
		}
		else if (data->par_line[i + 1] && \
			(!ft_strncmp(data->par_line[i + 1], "<<", 3) \
			|| !ft_strncmp(data->par_line[i + 1], ">>", 3)))
			return (-1);
	}
	else if (detect_error_2(data, i) == -1)
		return (-1);
	return (0);
}

int	error_redir_pipe(t_data *data)
{
	int	i;
	int	save_i;

	i = -1;
	save_i = -1;
	while (data->par_line[++i])
	{
		if (!ft_strncmp(data->par_line[i], "|", 2))
		{
			if (save_i != -1 && save_i == i - 1)
				return (-1);
			save_i = i;
		}
		else if (detect_error(data, i) == -1)
			return (-1);
	}
	return (0);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parsing_detect.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/30 17:54:28 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 13:11:40 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	full_detector(t_data *data, char *str)
{
	if (builtin_detector(data, str) >= 0)
		return (1);
	else if (cmd_detector(data, str) == 1)
		return (2);
	else if (redir_detector(data, str) > 0)
		return (3);
	return (0);
}

int	builtin_detector(t_data *data, char *str)
{
	int	j;

	j = -1;
	while (data->built.builtins[++j])
	{
		if (ft_strncmp(data->built.builtins[j], str,
				ft_strlen(data->built.builtins[j]) + 1) == 0)
			return (j);
	}
	return (-1);
}

// -----------------------------------------------------------------------------
// This function checks if its a command the string given.
// -----------------------------------------------------------------------------

int	cmd_detector(t_data *data, char *str)
{
	int	i_p;

	i_p = -1;
	if (data->paths.p_str != NULL)
	{
		while (data->paths.paths[++i_p])
		{
			joining(data, str, i_p);
			if (access(data->paths.test_cmd, X_OK) == 0 \
			&& !is_dot_cmd(data->paths.test_cmd))
			{
				free(data->paths.test_cmd);
				return (1);
			}
			else
				free(data->paths.test_cmd);
		}
		if (access(str, X_OK) == 0 && !is_dot_cmd(str))
			return (2);
	}
	return (0);
}

int	redir_detect_aux(t_data *data, char *str, int i, int j)
{
	if (j == 0)
		return (1);
	else if (j == 1)
	{
		if (str[i + 1] == data->redir.redir_lib[j])
			return (3);
		else
			return (2);
	}
	else if (j == 2)
	{
		if (str[i + 1] == data->redir.redir_lib[j])
			return (5);
		else
			return (4);
	}
	return (-1);
}

int	redir_detector(t_data *data, char *str)
{
	int	i;
	int	j;

	i = -1;
	while (str[++i])
	{
		j = -1;
		while (data->redir.redir_lib[++j])
		{
			if (str[i] == data->redir.redir_lib[j])
				return (redir_detect_aux(data, str, i, j));
		}
	}
	return (0);
}

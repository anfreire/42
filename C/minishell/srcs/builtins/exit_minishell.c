/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   exit_minishell.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/10/04 21:53:19 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/12 20:56:49 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

static int	ft_isdigit_n_dash(int arg)
{
	if ((arg >= 48 && arg <= 57) || arg == '-')
	{
		return (1);
	}
	else
	{
		return (0);
	}
}

static int	is_string_digit(char *str)
{
	int	i;

	i = -1;
	while (str[++i])
	{
		if (!ft_isdigit_n_dash(str[i]))
			return (0);
	}
	return (1);
}

void	free_exit(t_data *data)
{
	int	size;

	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (size == 0)
		free(data->ids.inp_list);
	free(data->ids.id);
	free(data->ids.indicador);
}

void	exit_minishell(t_data *data, int index)
{
	int	args;

	args = data_par_line_counter(data, index);
	printf("exit\n");
	if (args >= 2)
	{
		if (!is_string_digit(data->par_line[index + 1]))
		{
			printf("minishell: exit: %s: numeric argument required\n", \
				data->par_line[index + 1]);
			g_exit = 2;
		}
		else if (args > 2)
		{
			printf("minishell: exit: too many arguments\n");
			g_exit = 1;
		}
		else
			g_exit = ft_atoi(data->par_line[index + 1]);
	}
	extra_protection_free(data);
	free_for_exit(data);
	free_exit(data);
	exit(g_exit);
}

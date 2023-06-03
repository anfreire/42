/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cd.c                                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ratinhosujo <ratinhosujo@student.42.fr>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/09/19 04:02:05 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/13 12:38:13 by ratinhosujo      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

static void	b_cd_aux(t_data *data, int index)
{
	int	value;

	if (data->par_line[index + 1][ft_strlen(data->par_line[index + 1]) - 1]
	== '/')
		data->par_line[index + 1][ft_strlen(data->par_line[index + 1]) - 1] = 0;
	if (ft_strncmp(data->par_line[index + 1], "~", 2) == 0)
	{
		chdir(getenv("HOME"));
		g_exit = 0;
	}
	else
	{
		value = chdir(data->par_line[index + 1]);
		if (value == 0)
			g_exit = 0;
		else
		{
			printf("Minishell: cd: %s: No such file or directory\n", \
			data->par_line[index + 1]);
			g_exit = 1;
		}
	}
	return ;
}

void	aux_cd(int i)
{
	if (i == 1)
	{
		chdir(getenv("HOME"));
		g_exit = 0;
	}
	if (i > 2)
	{
		printf("Minishell: cd: too many arguments\n");
		g_exit = 2;
	}
}

void	b_cd(t_data *data, int index)
{
	int	i;

	i = 0;
	while (data->par_line[i])
	{
		if (ft_strncmp(data->par_line[i], "|", 2) == 0)
			return ;
		if (ft_strncmp(data->par_line[i], "<", 2) == 0 \
			|| ft_strncmp(data->par_line[i], ">", 2) == 0 \
			|| ft_strncmp(data->par_line[i], "<<", 3) == 0 \
			|| ft_strncmp(data->par_line[i], ">>", 3) == 0)
			break ;
		i++;
	}
	if (i == 1 || i > 2)
	{
		aux_cd(i);
		return ;
	}
	else
		b_cd_aux(data, index);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   envp.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ratinhosujo <ratinhosujo@student.42.fr>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/24 18:29:28 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/13 12:19:49 by ratinhosujo      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

void	get_envp(t_data *data, char **envp)
{
	int	i;
	int	j;

	i = 0;
	while (envp[i])
		i++;
	data->envp = (char **)malloc((i + 1) * sizeof(char *));
	data->envp[i] = NULL;
	i = -1;
	while (envp[++i])
	{
		j = 0;
		while (envp[i][j])
			j++;
		data->envp[i] = (char *)malloc((j + 1) * sizeof(char));
		data->envp[i][j] = '\0';
		j = -1;
		while (envp[i][++j] != 0)
			data->envp[i][j] = envp[i][j];
	}
}

// built-in that performs the function of env in our own
// environment.

int	data_par_line_counter(t_data *data, int index)
{
	int	i;

	i = 0;
	while (data->par_line[index])
	{
		if (ft_strncmp(data->par_line[i], "|", 2) == 0 \
			|| ft_strncmp(data->par_line[i], "<", 2) == 0 \
			|| ft_strncmp(data->par_line[i], ">", 2) == 0 \
			|| ft_strncmp(data->par_line[i], "<<", 3) == 0 \
			|| ft_strncmp(data->par_line[i], ">>", 3) == 0)
			break ;
		index++;
		i++;
	}
	return (i);
}

void	env(t_data *data, int index)
{
	int	i;

	i = data_par_line_counter(data, index);
	if (i > 1)
	{
		printf("env: \'%s\': No such file or directory\n", \
		data->par_line[index + 1]);
		g_exit = 127;
		return ;
	}
	i = -1;
	while (data->envp[++i])
		printf("%s\n", data->envp[i]);
	g_exit = 0;
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   export.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/09/09 22:15:55 by dmendonc          #+#    #+#             */
/*   Updated: 2022/11/15 13:11:53 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

//safety igual & safety numeros & safety varios args
// built-in that performs the function of export in our own
// environment.
void	export(t_data *data, int index)
{
	if (data->built.args == 1)
		export_env(data);
	else if (data->built.args > 1)
		parse_export(data, index);
}

void	export_var(t_data *data, char *str)
{
	int		i;
	char	**new_envp;

	i = 0;
	while (data->envp[i])
		i++;
	new_envp = (char **)malloc((i + 2) * sizeof(char *));
	new_envp[i + 1] = NULL;
	i = -1;
	while (data->envp[++i])
	{
		new_envp[i] = add_estr(data, i);
		free(data->envp[i]);
	}
	new_envp[i] = add_str(str);
	free(data->envp);
	data->envp = new_envp;
}

void	export_env(t_data *data)
{
	int	len;
	int	counter;
	int	*smal;

	len = 0;
	counter = -1;
	while (data->envp[len])
		len++;
	smal = (int *)malloc(len * sizeof(int));
	while (++counter < len)
		smal[counter] = -1;
	counter = -1;
	while (++counter < len)
		smal[counter] = get_next(data, smal);
	counter = -1;
	while (++counter < len)
		printf("%s\n", data->envp[smal[counter]]);
	free(smal);
}

static void	get_next_aux(t_data *data, int *smal, int i, int s)
{
	int	j;

	while (data->envp[++i] != NULL)
	{
		j = -1;
		while (data->envp[i][++j] != 0)
		{
			if (data->envp[i][j] < data->envp[s][j])
			{
				if (find_in_list(smal, i) >= 0)
				{
					s = i;
					break ;
				}
			}
			else if (data->envp[i][j] == data->envp[s][j] && i != s)
				continue ;
			else
				break ;
		}
	}
}

int	get_next(t_data *data, int *smal)
{
	int	i;
	int	s;

	s = 0;
	i = -1;
	while (smal[++i] >= 0)
	{
		if (find_in_list(smal, i) < 0)
			s++;
		else
			break ;
	}
	get_next_aux(data, smal, i, s);
	return (s);
}

// built-in that performs the function of unset in our own
// environment.

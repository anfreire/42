/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   unset.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/09/09 22:17:20 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/11 16:25:51 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;
//safety numeros

static int	starts_with_wrong_char(char c)
{
	if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c == 95)
		return (0);
	else
		return (1);
}

static void	unset_aux(t_data *data, int i, int j)
{
	int		flag;
	char	**new_envp;

	flag = 0;
	if (i >= 0)
	{
		while (data->envp[j])
			j++;
		new_envp = (char **)malloc(j * sizeof(char *));
		new_envp[j - 1] = NULL;
		j = -1;
		while (data->envp[++j])
		{
			if (j != i)
				new_envp[j - flag] = selection(data, j);
			else
				flag = 1;
			free(data->envp[j]);
		}
		free(data->envp);
		data->envp = new_envp;
	}
}

void	unset(t_data *data, int index)
{
	int		i;
	int		j;

	j = 0;
	if (!data->par_line[index + 1])
		return ;
	i = env_var_detector(data, data->par_line[index + 1]);
	if (starts_with_wrong_char(data->par_line[index + 1][0]))
	{
		printf("minishell: unset: \'%s\': not a valid identifier\n",
			data->par_line[index + 1]);
		g_exit = 1;
		return ;
	}
	g_exit = 0;
	unset_aux(data, i, j);
}

char	*selection(t_data *data, int j)
{
	int		len;
	char	*str;

	len = len_str(data->envp[j]);
	str = (char *)malloc((len + 1) * sizeof(char));
	str[len] = 0;
	len = -1;
	while (data->envp[j][++len])
		str[len] = data->envp[j][len];
	return (str);
}

int	env_var_detector(t_data *data, char *str)
{
	int	i;
	int	len;

	i = -1;
	len = ft_strlen(str);
	while (data->envp[++i])
	{
		if (!ft_strncmp(data->envp[i], str, len))
		{
			if (data->envp[i][len] && data->envp[i][len] == '=')
				return (i);
		}
	}
	return (-1);
}

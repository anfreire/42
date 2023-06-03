/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   handle_error.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/18 22:19:23 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 18:41:42 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

void	print_error(t_data *data, int i)
{
	int	j;

	j = i;
	if (i > 0)
	{
		while (data->par_line[j])
		{
			printf("%s: cannot access '%s': No such file or directory\n", \
			data->par_line[i - 1], data->par_line[j]);
			j++;
		}
	}
}

void	handle_error(t_data *data, int i)
{
	int	size_c;
	int	size_b;
	int	j;

	j = -1;
	size_c = 0;
	size_b = 0;
	data->size = data->cmd.cmd_nbr + data->built.builtin_n;
	while (data->par_line[++j] && j < i)
	{
		if (builtin_detector(data, data->par_line[j]) >= 0)
			size_b++;
		else if (cmd_detector(data, data->par_line[j]) > 0)
			size_c++;
	}
	if (data->flag == 0)
		print_error(data, i);
	data->safety_blt = data->built.builtin_n - size_b;
}

int	is_viable_path(t_data *data, char *cmd)
{
	char	*path;
	int		i;

	i = 0;
	path = NULL;
	while (data->paths.paths[i] != NULL)
	{
		path = malloc(strlen(data->paths.paths[i]) + ft_strlen(cmd) + 2);
		path[0] = '\0';
		ft_strlcat(path, data->paths.paths[i], ft_strlen(data->paths.paths[i]) \
		+ ft_strlen(cmd) + 2);
		ft_strlcat(path, "/", ft_strlen(data->paths.paths[i]) + ft_strlen(cmd) \
		+ 2);
		ft_strlcat(path, cmd, ft_strlen(data->paths.paths[i]) + ft_strlen(cmd) \
		+ 2);
		if (access(path, X_OK) == 0)
		{
			free(path);
			return (1);
		}
		free(path);
		i++;
	}
	return (0);
}

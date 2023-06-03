/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_line.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/30 02:50:09 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/18 21:53:52 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

void	joining(t_data *data, char *str, int i_p)
{
	int	i;
	int	j;
	int	count;

	i = -1;
	j = -1;
	count = p_size(data, str, i_p) + 1;
	data->paths.test_cmd = (char *)malloc(count * sizeof(char));
	data->paths.test_cmd[count - 1] = '\0';
	while (data->paths.paths[i_p][++i])
		data->paths.test_cmd[i] = data->paths.paths[i_p][i];
	while (str[++j])
		data->paths.test_cmd[i++] = str[j];
}

void	get_line(t_data *data)
{
	if (data->line)
		free(data->line);
	data->line = NULL;
	data->line = readline("$ ▶ ");
	exit_shell(data);
	if (data->line[0] != '\0')
		add_history(data->line);
}

int	main_proceed_cannot(t_data	*data)
{
	int	i;

	i = -1;
	if (error_redir_pipe(data) == -1)
	{
		while (data->par_line && data->par_line[++i])
			free(data->par_line[i]);
		free(data->par_line);
		free(data->paths.p_str);
		i = -1;
		while (data->paths.paths[++i])
			free(data->paths.paths[i]);
		free(data->paths.paths);
		printf("minishell: syntax error\n");
		return (1);
	}
	return (0);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minishell.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/10/03 16:59:01 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/18 21:36:53 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

static void	change_shlvl(t_data *data)
{
	int		i;
	int		value;
	char	*value_in_str;

	i = env_var_detector(data, "SHLVL");
	value_in_str = ft_strchr(data->envp[i], '=') + 1;
	value = ft_atoi(value_in_str);
	value++;
	free(data->envp[i]);
	value_in_str = ft_itoa(value);
	data->envp[i] = ft_strjoin("SHLVL=", value_in_str);
	free(value_in_str);
}

// https://www.geeksforgeeks.org/exit-status-child-process-linux/

static void	run_minishell_aux(t_data *data, int index, char **av)
{
	int		in_fd;
	int		out_fd;

	in_fd = 0;
	out_fd = 1;
	if (data->ids.id[index] == 0)
	{
		if (in_fd > 0)
			dup2(in_fd, STDIN_FILENO);
		if (out_fd > 1)
			dup2(out_fd, STDOUT_FILENO);
		change_shlvl(data);
		execve("./minishell", av, data->envp);
	}
	else
	{
		waitpid(data->ids.id[index], &g_exit, 0);
		WEXITSTATUS(g_exit);
		signal(SIGINT, sig_handler);
		if (g_exit > 255)
			g_exit /= 256;
		return ;
	}
}

void	run_minishell(t_data *data, int index)
{
	char	*av[3];

	av[0] = "/bin/bash";
	av[1] = "./minishell";
	av[2] = NULL;
	signal(SIGQUIT, SIG_IGN);
	signal(SIGINT, SIG_IGN);
	data->ids.id[index] = fork();
	run_minishell_aux(data, index, av);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   starting.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/11/12 15:54:26 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 18:43:55 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

void	starting(t_data *data, char *envp[])
{
	signal(SIGQUIT, SIG_IGN);
	signal(SIGINT, sig_handler);
	get_envp(data, envp);
	data->line = NULL;
	g_exit = 0;
	data->redir.hdoc_key = NULL;
}

void	starting_vars(t_data *data)
{
	data->flag = 0;
	data->safety_blt = 0;
	data->safety_cmd = 0;
	data->andre.args = 0;
	data->redir.hdoc_id = 0;
	data->cmd.c_counter = 0;
	data->built.b_counter = 0;
	data->redir.r_counter = 0;
	data->redir.father_flag = 0;
}

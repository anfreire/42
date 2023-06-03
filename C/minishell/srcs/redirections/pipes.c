/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pipes.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/11/09 15:26:23 by ratinhosujo       #+#    #+#             */
/*   Updated: 2023/01/20 18:09:48 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

void	piping_first(t_data *data, int index)
{
	close(data->ids.pfd[index][0]);
	if (data->ids.inp_list[index] != STDIN_FILENO)
	{
		dup2(data->ids.inp_list[index], STDIN_FILENO);
		data->redir.input_c++;
	}
	if (data->ids.outp_list[index] != STDOUT_FILENO)
	{
		dup2(data->ids.outp_list[index], STDOUT_FILENO);
		data->redir.output_c++;
	}
	else if ((data->cmd.cmd_nbr + data->built.builtin_n) != 1)
		dup2(data->ids.pfd[index][1], STDOUT_FILENO);
}

void	piping_last(t_data *data, int index)
{
	close(data->ids.pfd[index - 1][1]);
	if (data->ids.inp_list[index] != STDIN_FILENO)
	{
		dup2(data->ids.inp_list[index], STDIN_FILENO);
		data->redir.input_c++;
	}
	else
		dup2(data->ids.pfd[index - 1][0], STDIN_FILENO);
	if (data->ids.outp_list[index] != STDOUT_FILENO)
	{
		dup2(data->ids.outp_list[index], STDOUT_FILENO);
		data->redir.output_c++;
	}
}

void	redirecting_input(t_data *data, int index)
{
	if (data->ids.inp_list[index] != STDIN_FILENO)
	{
		dup2(data->ids.inp_list[index], STDIN_FILENO);
		close(data->ids.inp_list[index]);
		data->redir.input_c++;
	}
	else
		dup2(data->ids.pfd[index - 1][0], STDIN_FILENO);
}

void	redirecting_output(t_data *data, int index)
{
	if (data->ids.outp_list[index] != STDOUT_FILENO)
	{
		dup2(data->ids.outp_list[index], STDOUT_FILENO);
		close(data->ids.outp_list[index]);
		data->redir.output_c++;
	}
	else
		dup2(data->ids.pfd[index][1], STDOUT_FILENO);
	close(data->ids.pfd[index][0]);
	close(data->ids.pfd[index - 1][1]);
}

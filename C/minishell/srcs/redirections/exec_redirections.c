/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   exec_redirections.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/07 02:05:33 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 19:24:12 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	exec_in_redirect(t_data *data, int index, int save)
{
	if (save == 2)
	{
		data->ids.inp_list[index] = open(data->redir.input[index], \
			O_RDONLY);
		if (data->ids.inp_list[index] < 0)
		{
			printf("Error: the file %s does not exist.\n", \
			data->redir.input[index]);
			return (-1);
		}
	}
	return (1);
}

int	print_error_open(t_data *data, int index)
{
	printf("Error: the file %s had issues on open().", \
	data->redir.output[index]);
	return (-1);
}

int	exec_out_redirect(t_data *data, int index, int save)
{
	int	size;

	size = data->cmd.cmd_nbr + data->built.builtin_n;
	if (save == 4 && index < size && size > 0)
	{
		data->ids.outp_list[index] = open(data->redir.output[index], \
		O_CREAT | O_TRUNC | O_RDWR, 0666);
		if (data->ids.outp_list[index] < 1)
			return (print_error_open(data, index));
	}
	if (save == 5 && index < size && size > 0)
	{
		data->ids.outp_list[index] = open(data->redir.output[index], \
		O_CREAT | O_APPEND | O_RDWR, 0666);
		if (data->ids.outp_list[index] < 1)
			return (print_error_open(data, index));
	}
	return (1);
}

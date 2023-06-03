/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   bridges.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/09/19 17:20:36 by dmendonc          #+#    #+#             */
/*   Updated: 2023/01/20 19:28:04 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	bridge_infiles(t_data *data, int index)
{
	int	i;
	int	ret;
	int	count;

	i = -1;
	ret = 0;
	count = -1;
	while (++count <= index)
	{
		while (data->par_line[++i] != NULL)
		{
			ret = bridging_infiles(data, index, count, i);
			if (ret == -2)
				break ;
			else if (ret == -1)
				return (-1);
		}
	}
	return (1);
}

int	bridging_infiles(t_data *data, int index, int count, int i)
{
	int	ret;

	ret = redir_detector(data, data->par_line[i]);
	if (ret == 1)
		return (-2);
	if (ret > 1 && count == index)
	{
		if (ret == 2 && i != data->redir.last)
		{
			if (open(data->par_line[i + 1], O_RDONLY) < 0)
			{
				printf("Error: the file %s does not exist.", data->par_line[i
					+ 1]);
				return (-1);
			}
		}
		else if (ret == 3 && i != data->redir.last)
		{
			extract_hdockey(data, i + 1);
			heredoc(data, index);
		}
	}
	return (1);
}

int	bridge_outfiles(t_data *data, int index)
{
	int	i;
	int	ret;
	int	count;

	i = -1;
	ret = 0;
	count = -1;
	while (++count <= index)
	{
		while (data->par_line[++i])
		{
			ret = bridging_outfiles(data, index, count, i);
			if (ret == 0)
				break ;
			else if (ret == -1)
				return (-1);
		}
	}
	return (1);
}

int	bridging_outfiles(t_data *data, int index, int count, int i)
{
	int	ret;

	while (data->par_line[i])
	{
		ret = redir_detector(data, data->par_line[i]);
		if (ret == 1)
			return (0);
		if (ret > 1 && count == index)
		{
			if (ret > 3 && i != data->redir.last)
			{
				if (open(data->par_line[i + 1], O_CREAT | \
				O_TRUNC | O_RDWR, 0666) < 0)
					return (-1);
			}
		}
		i++;
	}
	return (i);
}

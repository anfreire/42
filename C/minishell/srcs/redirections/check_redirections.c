/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   check_redirections.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ratinhosujo <ratinhosujo@student.42.fr>    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/13 13:01:06 by ratinhosujo       #+#    #+#             */
/*   Updated: 2023/01/13 13:26:50 by ratinhosujo      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

int	check_for_wrong_input(t_data *data, int i)
{
	int	j;

	j = 0;
	while (data->par_line[i][j])
		j++;
	if (j > 2)
		return (-1);
	else if (!data->par_line[i + 1])
		return (-1);
	return (0);
}

int	check_for_wrong_output(t_data *data, int i)
{
	int	j;

	j = 0;
	while (data->par_line[i][j])
		j++;
	if (j > 2)
		return (-1);
	else if (!data->par_line[i + 1])
		return (-1);
	return (0);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   moves2.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/13 14:28:43 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/13 14:28:49 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

void	move_left(void)
{
	double	new_x;
	double	new_y;
	double	future_x;
	double	future_y;

	new_x = map()->pos_x + (0.1 * cos(map()->angle - PI / 2));
	new_y = map()->pos_y + (0.1 * sin(map()->angle - PI / 2));
	future_x = map()->pos_x + (0.6 * cos(map()->angle - PI / 2));
	future_y = map()->pos_y + (0.6 * sin(map()->angle - PI / 2));
	if (new_x < 0 || new_x > map()->width || new_y < 0 \
	|| new_y > map()->height || map()->map[(int)new_y][(int)new_x] == '1' \
	|| map()->map[(int)future_y][(int)future_x] == '1')
		return ;
	map()->pos_x = new_x;
	map()->pos_y = new_y;
}

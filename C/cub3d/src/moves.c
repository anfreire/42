/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   moves.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/16 14:01:30 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/13 14:28:22 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

int	key_hook(int key)
{
	if (key == key_ESC)
		close_window(NULL);
	if (key == key_W)
		move_up();
	else if (key == key_D)
		move_right();
	else if (key == key_A)
		move_left();
	else if (key == key_S)
		move_down();
	else if (key == key_LEFT || key == key_RIGHT)
		rotate(key);
	refresh();
	return (0);
}

static int	check_corners(void)
{
	if (map()->angle < PI / 2 && \
	map()->map[(int)map()->pos_y][(int)(map()->pos_x + 0.6)] == '1' \
	&& map()->map[(int)(map()->pos_y + 0.6)][(int)map()->pos_x] == '1')
		return (1);
	else if (map()->angle < PI && \
	map()->map[(int)map()->pos_y][(int)(map()->pos_x - 0.6)] == '1' \
	&& map()->map[(int)(map()->pos_y + 0.6)][(int)map()->pos_x] == '1')
		return (1);
	else if (map()->angle < 3 * PI / 2 && \
	map()->map[(int)map()->pos_y][(int)(map()->pos_x - 0.6)] == '1' \
	&& map()->map[(int)(map()->pos_y - 0.6)][(int)map()->pos_x] == '1')
		return (1);
	else if (map()->map[(int)map()->pos_y][(int)(map()->pos_x + 0.6)] == '1' \
	&& map()->map[(int)(map()->pos_y - 0.6)][(int)map()->pos_x] == '1')
		return (1);
	return (0);
}

void	move_up(void)
{
	double	new_x;
	double	new_y;
	double	future_x;
	double	future_y;

	new_x = map()->pos_x + (0.1 * cos(map()->angle));
	new_y = map()->pos_y + (0.1 * sin(map()->angle));
	future_x = map()->pos_x + (0.6 * cos(map()->angle));
	future_y = map()->pos_y + (0.6 * sin(map()->angle));
	if (new_x < 0 || new_x > map()->width || new_y < 0 \
	|| new_y > map()->height || map()->map[(int)new_y][(int)new_x] == '1' \
	|| map()->map[(int)future_y][(int)future_x] == '1' || check_corners())
		return ;
	map()->pos_y = new_y;
	map()->pos_x = new_x;
}

void	move_down(void)
{
	double	new_x;
	double	new_y;
	double	future_x;
	double	future_y;

	new_x = map()->pos_x - (0.1 * cos(map()->angle));
	new_y = map()->pos_y - (0.1 * sin(map()->angle));
	future_x = map()->pos_x - (0.6 * cos(map()->angle));
	future_y = map()->pos_y - (0.6 * sin(map()->angle));
	if (new_x < 0 || new_x > map()->width || new_y < 0 \
	|| new_y > map()->height || map()->map[(int)new_y][(int)new_x] == '1' \
	|| map()->map[(int)future_y][(int)future_x] == '1')
		return ;
	map()->pos_y = new_y;
	map()->pos_x = new_x;
}

void	move_right(void)
{
	double	new_x;
	double	new_y;
	double	future_x;
	double	future_y;

	new_x = map()->pos_x - (0.1 * cos(map()->angle - PI / 2));
	new_y = map()->pos_y - (0.1 * sin(map()->angle - PI / 2));
	future_x = map()->pos_x - (0.6 * cos(map()->angle - PI / 2));
	future_y = map()->pos_y - (0.6 * sin(map()->angle - PI / 2));
	if (new_x < 0 || new_x > map()->width || new_y < 0 \
	|| new_y > map()->height || map()->map[(int)new_y][(int)new_x] == '1' \
	|| map()->map[(int)future_y][(int)future_x] == '1')
		return ;
	map()->pos_x = new_x;
	map()->pos_y = new_y;
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minimap.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/07 23:40:31 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/13 12:48:27 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

void	draw_square(int x, int y, int size, int color)
{
	int	i;
	int	j;

	i = 0;
	j = 0;
	while (i < size - 1)
	{
		while (j < size - 1)
		{
			my_mlx_pixel_put(x + i, y + j, color, vars());
			j++;
		}
		j = 0;
		i++;
	}
}

void	draw_player(int x, int y, int size, int color)
{
	int	i;
	int	j;

	i = -size / 2;
	j = -size / 2;
	while (i < size / 2)
	{
		while (j < size / 2)
		{
			my_mlx_pixel_put(x + i, y + j, color, vars());
			j++;
		}
		j = -size / 2;
		i++;
	}
}

void	draw_minimap_aux(t_pos pos, t_pos end, int block_size)
{
	while (--pos.y > 0)
	{
		while (--pos.x > 0)
		{
			if (map()->map[pos.y][pos.x] == '1')
				draw_square(W - end.x + pos.x * block_size, \
				H - end.y + pos.y * block_size, block_size, 0x000000);
			else if (map()->map[pos.y][pos.x] == '0')
				draw_square(W - end.x + pos.x * block_size, \
				H - end.y + pos.y * block_size, block_size, 0xFFFFFF);
		}
		pos.x = map()->width;
	}
	draw_player(W - end.x + map()->pos_x * block_size, \
	H - end.y + map()->pos_y * block_size, block_size, 0xFF0000);
}

void	draw_minimap(void)
{
	t_pos	pos;
	t_pos	end;
	int		block_size;

	if (400 / map()->width < 200 / map()->height)
		block_size = 400 / map()->width;
	else
		block_size = 200 / map()->height;
	pos.x = map()->width;
	pos.y = map()->height;
	end.x = map()->width * block_size;
	end.y = H;
	draw_minimap_aux(pos, end, block_size);
}

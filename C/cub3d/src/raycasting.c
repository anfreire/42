/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   raycasting.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/30 13:42:50 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/13 14:16:30 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

void	calc_step_dist(t_ray *ray)
{
	ray->delta_dist_x = sqrt(1 + pow(ray->dir_y, 2) / pow(ray->dir_x, 2));
	ray->delta_dist_y = sqrt(1 + pow(ray->dir_x, 2) / pow(ray->dir_y, 2));
	if (ray->dir_x < 0)
	{
		ray->step_x = -1;
		ray->side_dist_x = (map()->pos_x - ray->map_x) * ray->delta_dist_x;
	}
	else
	{
		ray->step_x = 1;
		ray->side_dist_x = (ray->map_x + 1.0 - map()->pos_x) \
		* ray->delta_dist_x;
	}
	if (ray->dir_y < 0)
	{
		ray->step_y = -1;
		ray->side_dist_y = (map()->pos_y - ray->map_y) * ray->delta_dist_y;
	}
	else
	{
		ray->step_y = 1;
		ray->side_dist_y = (ray->map_y + 1.0 - map()->pos_y) \
		* ray->delta_dist_y;
	}
}

void	find_wall(t_ray *ray)
{
	int	hit;

	hit = 0;
	while (hit == 0)
	{
		if (ray->side_dist_x < ray->side_dist_y)
		{
			ray->side_dist_x += ray->delta_dist_x;
			ray->map_x += ray->step_x;
			ray->side = 0;
		}
		else
		{
			ray->side_dist_y += ray->delta_dist_y;
			ray->map_y += ray->step_y;
			ray->side = 1;
		}
		if (map()->map[ray->map_y][ray->map_x] == '1')
			hit = 1;
	}
}

void	calc_height(t_ray *ray)
{
	int	line_h;

	if (ray->side == 0)
		ray->perp_wall_dist = fabs((ray->map_x - map()->pos_x \
		+ (1 - ray->step_x) / 2) / ray->dir_x);
	else
		ray->perp_wall_dist = fabs((ray->map_y - map()->pos_y \
		+ (1 - ray->step_y) / 2) / ray->dir_y);
	line_h = (int)(H / ray->perp_wall_dist);
	ray->draw_start = -line_h / 2 + H / 2;
	ray->draw_end = line_h / 2 + H / 2;
}

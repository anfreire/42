/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   window2.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/12 18:24:35 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/12 21:47:34 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

void	define_colors_aux(t_cast i, t_ray *ray, int x)
{
	t_vars	*tex;

	while (++i.y < H)
	{
		if (i.y < ray->draw_start)
			my_mlx_pixel_put(x, i.y, create_trgb(0, map()->ceiling[0], \
			map()->ceiling[1], map()->ceiling[2]), vars());
		else if (i.y > ray->draw_end)
			my_mlx_pixel_put(x, i.y, create_trgb(0, map()->floor[0], \
			map()->floor[1], map()->floor[2]), vars());
		else
		{
			i.tex_y = (int)(((double)i.y - (double)H / 2.0 + \
			(double)i.line_h / 2.0) * (double)TEX_H / (double)i.line_h);
			tex = get_texture(ray);
			i.color = mlx_get_color_value(vars()->mlx, \
			*(int *)(tex->addr + (i.tex_y * tex->line_length + i.tex_x * \
			(tex->bits_per_pixel / 8))));
			my_mlx_pixel_put(x, i.y, i.color, vars());
		}
	}
}

void	define_colors(t_ray *ray, int x)
{
	t_cast	i;

	if (ray->side == 0)
		i.wall_x = map()->pos_y + ray->perp_wall_dist * ray->dir_y;
	else
		i.wall_x = map()->pos_x + ray->perp_wall_dist * ray->dir_x;
	i.wall_x -= floor(i.wall_x);
	i.tex_x = (int)(i.wall_x * (double)TEX_W);
	i.y = -1;
	i.line_h = ray->draw_end - ray->draw_start;
	define_colors_aux(i, ray, x);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   window.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/16 13:33:54 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/12 21:35:00 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

/*Close window when press 'x'*/
int	close_window(void *anything)
{
	(void)anything;
	mlx_destroy_image(vars()->mlx, map()->no_tex->img);
	mlx_destroy_image(vars()->mlx, map()->so_tex->img);
	mlx_destroy_image(vars()->mlx, map()->we_tex->img);
	mlx_destroy_image(vars()->mlx, map()->ea_tex->img);
	mlx_destroy_window(vars()->mlx, vars()->win);
	mlx_loop_end(vars()->mlx);
	final_free();
	exit(0);
	return (0);
}

void	my_mlx_pixel_put(int x, int y, int color, t_vars *vars)
{
	char	*dst;

	dst = vars->addr + (y * vars->line_length + x * (vars->bits_per_pixel / 8));
	*(unsigned int *)dst = color;
}

void	draw_map(void)
{
	double	camera_x;
	int		x;

	x = -1;
	while (++x < W)
	{
		camera_x = 2 * x / (double)W - 1;
		ray()->dir_x = map()->dir_x + map()->cam_x * camera_x;
		ray()->dir_y = map()->dir_y + map()->cam_y * camera_x;
		ray()->map_x = map()->pos_x;
		ray()->map_y = map()->pos_y;
		calc_step_dist(ray());
		find_wall(ray());
		calc_height(ray());
		define_colors(ray(), x);
	}
}

void	refresh(void)
{
	void	**img;
	char	**addr;

	img = &(vars()->img);
	addr = &(vars()->addr);
	*img = mlx_new_image(vars()->mlx, W, H);
	*addr = mlx_get_data_addr(vars()->img, &vars()->bits_per_pixel, \
	&vars()->line_length, &vars()->endian);
	draw_map();
	draw_minimap();
	mlx_put_image_to_window(vars()->mlx, vars()->win, vars()->img, 0, 0);
	mlx_destroy_image(vars()->mlx, vars()->img);
}

t_vars	*get_texture(t_ray *ray)
{
	if (ray->side == 0 && ray->dir_x > 0)
		return (map()->ea_tex);
	else if (ray->side == 0 && ray->dir_x < 0)
		return (map()->we_tex);
	else if (ray->side == 1 && ray->dir_y > 0)
		return (map()->so_tex);
	else
		return (map()->no_tex);
}

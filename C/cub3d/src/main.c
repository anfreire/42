/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/16 12:42:56 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/12 22:35:52 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

/*  Initialize all the variables used in the program
It's needed because to parse the map,
we need all the variables set to 0/NULL, so in case of error,
we can free the ones that were already allocated.
*/
static void	start_vars(void)
{
	map()->map = NULL;
	map()->no = NULL;
	map()->so = NULL;
	map()->we = NULL;
	map()->ea = NULL;
	map()->pos_x = -1;
	map()->pos_y = -1;
}

int	check_and_parse(char *arg)
{
	if (!check_maps_attributes(arg))
	{
		color_print(2, COLOR_RED, "Error\nMap file is invalid!\n");
		error_free();
		return (1);
	}
	return (0);
}

void	load_tex(t_vars **tex, char *path)
{
	int	tex_width;
	int	tex_height;

	tex_width = TEX_W;
	tex_height = TEX_H;
	*tex = malloc(sizeof(t_vars));
	(*tex)->mlx = vars()->mlx;
	(*tex)->img = mlx_xpm_file_to_image((*tex)->mlx, path, &tex_width, \
	&tex_height);
	(*tex)->addr = mlx_get_data_addr((*tex)->img, &(*tex)->bits_per_pixel, \
	&(*tex)->line_length, &(*tex)->endian);
}

void	input_error(void)
{
	color_print(2, COLOR_RED, "Error\nPlease use:");
	color_print(2, COLOR_WHITE, " ./cub3d <map file>\n");
}

int	main(int argc, char **argv)
{
	void	*my_win;

	if (argc == 2)
	{
		start_vars();
		if (check_and_parse(argv[1]))
			return (0);
		vars()->mlx = mlx_init();
		my_win = mlx_new_window(vars()->mlx, W, H, "Cub3D");
		vars()->win = my_win;
		if (!check_textures(1))
			return (0);
		load_tex(&map()->no_tex, map()->no);
		load_tex(&map()->so_tex, map()->so);
		load_tex(&map()->we_tex, map()->we);
		load_tex(&map()->ea_tex, map()->ea);
		refresh();
		mlx_hook(vars()->win, 17, 0, close_window, NULL);
		mlx_hook(vars()->win, 2, 1L << 0, &key_hook, NULL);
		mlx_loop(vars()->mlx);
		close_window(NULL);
	}
	else
		input_error();
	return (0);
}

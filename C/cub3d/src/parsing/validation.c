/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   validation.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 23:07:23 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/12 20:29:27 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

/*Check if file extension is ".cub" and if the map file exists*/
int	check_map_extension(char *map_path)
{
	int		length;
	char	*extension;
	char	*pattern;

	length = (int)ft_strlen(map_path);
	if (length < 5)
		return (0);
	pattern = ".cub";
	extension = ft_substr(map_path, length - 4, length);
	if (ft_strncmp(pattern, extension, 5) != 0)
	{
		free(extension);
		return (0);
	}
	if (!check_file(map_path))
	{
		free (extension);
		return (0);
	}
	free (extension);
	return (1);
}

/*	Check if the map file exists and if textures and rgb are valid */
int	check_maps_attributes(char	*map_path)
{
	if (!check_map_extension(map_path))
		return (0);
	if (!check_map_file(map_path))
		return (0);
	if (!check_textures(0))
		return (0);
	if (!check_rgb())
		return (0);
	if (!check_map())
		return (0);
	if ((map()->pos_x == -1) || (map()->pos_y == -1))
		return (0);
	return (1);
}

int	check_map(void)
{
	set_map_size();
	remap();
	if (!parse_map())
		return (0);
	return (1);
}

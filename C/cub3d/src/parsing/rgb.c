/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   rgb.c                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 22:58:32 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/13 13:20:11 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

int	set_rgb(int *ptr1, int *ptr2, int *ptr3, char **list)
{
	int	return_value;

	return_value = 1;
	strip_line(&list[0]);
	strip_line(&list[1]);
	strip_line(&list[2]);
	if (ft_strlen(list[0]) > 3 || ft_strlen(list[1]) > 3
		|| ft_strlen(list[2]) > 3 || ft_strlen(list[0]) == 0
		|| ft_strlen(list[1]) == 0 || ft_strlen(list[2]) == 0)
		return_value = 0;
	*ptr1 = ft_atoi(list[0]);
	*ptr2 = ft_atoi(list[1]);
	*ptr3 = ft_atoi(list[2]);
	return (return_value);
}

int	set_ceiling_rgb(void)
{
	int		i;
	int		return_value;
	char	**rgb;

	i = -1;
	rgb = NULL;
	return_value = 0;
	while (map()->map[++i] && i < 6)
	{
		if (ft_strncmp(map()->map[i], "C ", 2) == 0)
		{
			rgb = ft_split(&(map()->map[i][2]), ',');
			if (ft_split_len(rgb) != 3)
				break ;
			return_value = set_rgb(&(map()->ceiling[0]), &(map()->ceiling[1]),
					&(map()->ceiling[2]), rgb);
		}
	}
	free_split(rgb);
	return (return_value);
}

int	set_floor_rgb(void)
{
	int		i;
	int		return_value;
	char	**rgb;

	i = -1;
	return_value = 0;
	rgb = NULL;
	while (map()->map[++i] && i < 6)
	{
		if (ft_strncmp(map()->map[i], "F ", 2) == 0)
		{
			rgb = ft_split(&(map()->map[i][2]), ',');
			if (ft_split_len(rgb) != 3)
				break ;
			return_value = set_rgb(&(map()->floor[0]), &(map()->floor[1]),
					&(map()->floor[2]), rgb);
		}
	}
	free_split(rgb);
	return (return_value);
}

int	check_rgb(void)
{
	if (!set_ceiling_rgb() || !set_floor_rgb())
		return (0);
	if (map()->ceiling[0] > 255 || map()->ceiling[1] > 255
		|| map()->ceiling[2] > 255 || map()->ceiling[0] < 0
		|| map()->ceiling[1] < 0 || map()->ceiling[2] < 0)
		return (0);
	if (map()->floor[0] > 255 || map()->floor[1] > 255
		|| map()->floor[2] > 255 || map()->floor[0] < 0
		|| map()->floor[1] < 0 || map()->floor[2] < 0)
		return (0);
	return (1);
}

int	create_trgb(int t, int r, int g, int b)
{
	return (t << 24 | r << 16 | g << 8 | b);
}

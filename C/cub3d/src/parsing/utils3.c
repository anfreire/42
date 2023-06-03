/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils3.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/01 11:26:13 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/12 20:37:48 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

int	check_neighbours(int x, int y)
{
	char	up;
	char	down;
	char	left;
	char	right;

	up = ' ';
	down = ' ';
	left = ' ';
	right = ' ';
	if (y > 0)
		up = map()->map[y - 1][x];
	if (y < (int)map()->height - 1)
		down = map()->map[y + 1][x];
	if (x > 0)
		left = map()->map[y][x - 1];
	if (x < (int)map()->width - 1)
		right = map()->map[y][x + 1];
	if (map()->map[y][x] == ' ')
	{
		if (!valid_char(up, 2) || !valid_char(down, 2) || \
		!valid_char(left, 2) || !valid_char(right, 2))
			return (0);
	}
	return (1);
}

void	get_dir(char p)
{
	if (p == 'N')
		map()->angle = 3 * (PI / 2);
	else if (p == 'S')
		map()->angle = PI / 2;
	else
		get_dir_cont(p);
	map()->delta_x = cos(map()->angle);
	map()->delta_y = sin(map()->angle);
	map()->dir_x = cos(map()->angle);
	map()->dir_y = sin(map()->angle);
	map()->cam_x = -sin(map()->angle);
	map()->cam_y = cos(map()->angle);
}

void	get_dir_cont(char p)
{
	if (p == 'W')
		map()->angle = PI;
	else if (p == 'E')
		map()->angle = 0.0;
	map()->delta_x = cos(map()->angle);
	map()->delta_y = sin(map()->angle);
	map()->dir_x = cos(map()->angle);
	map()->dir_y = sin(map()->angle);
	map()->cam_x = -sin(map()->angle);
	map()->cam_y = cos(map()->angle);
}

char	*spaces_line(void)
{
	int		i;
	char	*line;

	line = malloc(sizeof(char) * map()->width + 1);
	line[map()->width] = 0;
	i = -1;
	while (line[++i])
		line[i] = ' ';
	return (line);
}

int	valid_char(char c, int flag)
{
	if (flag == 1 && (c == '0' || c == '1' || c == 'N' || \
	c == 'S' || c == 'E' || c == 'W' || c == ' '))
		return (1);
	else if (flag == 2 && (c == ' ' || c == '1'))
		return (1);
	else if (flag == 3 && (c == 'N' || c == 'S' || c == 'E' || \
	c == 'W'))
		return (1);
	return (0);
}

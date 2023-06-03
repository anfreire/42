/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   map.c                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 23:00:35 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/12 22:39:13 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

void	set_map_size(void)
{
	int		i;

	i = 5;
	map()->height = 0;
	map()->width = 0;
	while (map()->map[++i])
	{
		if (get_new_len(map()->map[i]) > (int)map()->width)
			map()->width = get_new_len(map()->map[i]) + 2;
		map()->height++;
	}
	map()->height += 2;
}

int	set_player_pos(int x, int y)
{
	if (map()->pos_x != -1)
		return (0);
	map()->pos_x = x + 0.5;
	map()->pos_y = y + 0.5;
	map()->dir = map()->map[y][x];
	map()->px = (x + 1) * PX - (P_PX * 2);
	map()->py = (y + 1) * PX - (P_PX * 2);
	map()->dir = map()->map[y][x];
	get_dir(map()->dir);
	map()->map[y][x] = '0';
	return (1);
}

void	remap(void)
{
	int		i;
	char	**new_map;

	i = 5;
	map()->height = 0;
	map()->width = 0;
	while (map()->map[++i])
	{
		if (get_new_len(map()->map[i]) > (int)map()->width)
			map()->width = get_new_len(map()->map[i]) + 2;
		map()->height++;
	}
	map()->height += 2;
	new_map = malloc(sizeof(char *) * (map()->height + 1));
	new_map[0] = spaces_line();
	new_map[map()->height - 1] = NULL;
	i = 5;
	while (map()->map[++i])
	{
		new_map[i - 5] = get_new_line(map()->map[i]);
	}
	new_map[i - 5] = spaces_line();
	new_map[i - 4] = NULL;
	free_split(map()->map);
	map()->map = new_map;
}

int	parse_map(void)
{
	int	y;
	int	x;

	y = -1;
	while (map()->map[++y])
	{
		x = -1;
		while (map()->map[y][++x])
		{
			if (!valid_char(map()->map[y][x], 1))
				return (0);
			if (!check_neighbours(x, y))
				return (0);
			if (valid_char(map()->map[y][x], 3) && !set_player_pos(x, y))
				return (0);
		}
	}
	return (1);
}

int	check_lines_middle_map(char *raw_line)
{
	int		split_len;
	int		occurence;
	int		start_map;
	char	nl[3];
	int		end_map;

	split_len = 6;
	nl[0] = '\n';
	nl[1] = '\n';
	nl[2] = 0;
	if (map()->map[6] == NULL)
		return (0);
	start_map = index_of_needle_start(raw_line, map()->map[6]);
	while (map()->map[split_len])
		split_len++;
	end_map = index_of_needle_end(raw_line, map()->map[split_len - 1]);
	occurence = index_of_needle_start(&raw_line[start_map], nl) + start_map;
	if (occurence != -1 && occurence > start_map && occurence < end_map)
		return (0);
	return (1);
}

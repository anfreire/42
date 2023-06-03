/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   file.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 23:06:49 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/12 22:35:19 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

int	parse_map_file(int *fd, char *file, char **line)
{
	int	read_bytes;

	if (check_file(file) == 0)
		return (0);
	*line = malloc(sizeof(char) * 2);
	(*line)[1] = '\0';
	read_bytes = read(*fd, *line, 1);
	if (read_bytes <= 0)
	{
		close(*fd);
		free(*line);
		*line = NULL;
		return (0);
	}
	return (1);
}

void	load_map_file(int *fd, char **line)
{
	int	index;
	int	read_bytes;

	index = 1;
	read_bytes = 1;
	while (read_bytes > 0)
	{
		*line = string_realloc_1_char(*line);
		read_bytes = read(*fd, &(*line)[index], 1);
		index++;
	}
	close(*fd);
	(*line)[index - 1] = '\0';
}

int	check_map_file(char *file)
{
	int		i;
	int		fd;
	char	*line;
	char	***ptr;

	fd = open(file, O_RDONLY);
	if (fd == -1)
		return (0);
	if (!parse_map_file(&fd, file, &line))
		return (0);
	load_map_file(&fd, &line);
	ptr = &map()->map;
	*ptr = ft_split(line, 10);
	if (!check_lines_middle_map(line))
	{
		free(line);
		return (0);
	}
	free(line);
	i = -1;
	while (map()->map[++i] && i < 6)
		strip_line(&map()->map[i]);
	return (1);
}

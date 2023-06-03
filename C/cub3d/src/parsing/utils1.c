/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils1.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ansilva- <ansilva-@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 23:55:24 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/12 18:41:10 by ansilva-         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

void	strip_line(char **line)
{
	int		i;
	int		j;
	int		len;
	char	*new_line;

	i = 0;
	j = 0;
	len = ft_strlen(*line);
	new_line = malloc(sizeof(char) * (len + 1));
	while ((*line)[i] == ' ' || (*line)[i] == '\t')
		i++;
	while ((*line)[i])
	{
		new_line[j] = (*line)[i];
		i++;
		j++;
	}
	while (new_line[j - 1] == ' ' || new_line[j - 1] == '\t')
		j--;
	new_line[j] = '\0';
	free(*line);
	*line = new_line;
}

int	check_file(char	*file)
{
	int	fd;

	fd = open(file, O_RDONLY);
	if (fd == -1)
		return (0);
	close (fd);
	return (1);
}

int	ft_split_len(char **str)
{
	int	i;

	i = 0;
	while (str[i])
		i++;
	return (i);
}

void	free_split(char **list)
{
	int	i;

	i = 0;
	if (!list)
		return ;
	while (list[i])
	{
		free(list[i]);
		i++;
	}
	free(list);
}

char	*string_realloc_1_char(char *str)
{
	int		i;
	int		new_size;
	char	*new_str;

	i = 0;
	new_size = ft_strlen(str) + 1;
	new_str = malloc(sizeof(char) * (new_size + 1));
	while (str[i])
	{
		new_str[i] = str[i];
		i++;
	}
	new_str[i + 1] = '\0';
	free (str);
	return (new_str);
}

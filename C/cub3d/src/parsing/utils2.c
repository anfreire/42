/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils2.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/01 10:47:39 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/12 21:19:27 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

int	get_new_len(char *line)
{
	int		i;
	int		len;

	i = -1;
	len = 0;
	while (line[++i])
	{
		if (line[i] == '\t')
			len += 4;
		else
			len++;
	}
	return (len);
}

void	get_new_line_aux(int *i, int *j, char *line, char *new_line)
{
	int	old_j;

	if (line[*i] == '\t')
	{
		old_j = *j;
		while (*j < old_j + 4)
		{
			new_line[*j] = ' ';
			*(j) += 1;
		}
	}
	else
	{
		new_line[*j] = line[*i];
		*(j) += 1;
	}
}

char	*get_new_line(char *line)
{
	int		i;
	int		j;
	char	*new_line;

	i = -1;
	j = 0;
	new_line = malloc(sizeof(char) * (map()->width + 1));
	new_line[j++] = ' ';
	while (line[++i])
		get_new_line_aux(&i, &j, line, new_line);
	while (j < (int)map()->width)
	{
		new_line[j] = ' ';
		j++;
	}
	new_line[j] = '\0';
	return (new_line);
}

int	index_of_needle_start(char *haystack, char *needle)
{
	int	i;
	int	j;
	int	k;

	i = 0;
	while (haystack[i])
	{
		k = i;
		j = 0;
		while (haystack[k] == needle[j])
		{
			j++;
			k++;
			if (needle[j] == '\0')
				return (i);
		}
		i++;
	}
	return (-1);
}

int	index_of_needle_end(char *haystack, char *needle)
{
	int	i;
	int	j;
	int	k;
	int	return_value;

	i = 0;
	j = 0;
	return_value = -1;
	while (haystack[i])
	{
		k = i;
		while (haystack[k] == needle[j])
		{
			k++;
			j++;
			if (needle[j] == '\0')
			{	
				return_value = k;
				break ;
			}
		}
		j = 0;
		i++;
	}
	return (return_value);
}

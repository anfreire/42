/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ansilva- <ansilva-@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/17 13:43:51 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/12 18:21:04 by ansilva-         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

static	void	color_print_str(int fd, char *color, char *str)
{
	int		len;
	char	*color_str;

	len = ft_strlen(color) + ft_strlen(str) + ft_strlen(COLOR_RESET);
	color_str = malloc(sizeof(char) * (len + 1));
	ft_strlcpy(color_str, color, ft_strlen(color) + 1);
	ft_strlcat(color_str, str, ft_strlen(color_str) + ft_strlen(str) + 1);
	ft_strlcat(color_str, COLOR_RESET, ft_strlen(color_str) + \
	ft_strlen(COLOR_RESET) + 1);
	ft_putstr_fd(color_str, fd);
	free (color_str);
}

/*Print string or list of strings in color
void	color_print(int fd, char *color, char *str || char **list)
*/
void	color_print(int fd, char *color, ...)
{
	int		i;
	char	*str;
	char	**list;
	va_list	args;

	va_start(args, color);
	str = va_arg(args, char *);
	if (str == NULL)
	{
		list = va_arg(args, char **);
		i = 0;
		while (list[i] != NULL)
			color_print_str(fd, color, list[i]);
	}
	else
		color_print_str(fd, color, str);
	va_end(args);
}

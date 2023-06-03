/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   textures.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ansilva- <ansilva-@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/31 22:59:35 by anfreire          #+#    #+#             */
/*   Updated: 2023/04/12 16:45:31 by ansilva-         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../cub3d.h"

void	load_textures(void)
{
	int		i;

	i = -1;
	while (map()->map[++i] && i < 6)
	{
		if (ft_strncmp(map()->map[i], "NO ", 3) == 0)
			parse_textures(&map()->no, map()->map[i]);
		else if (ft_strncmp(map()->map[i], "SO ", 3) == 0)
			parse_textures(&map()->so, map()->map[i]);
		else if (ft_strncmp(map()->map[i], "WE ", 3) == 0)
			parse_textures(&map()->we, map()->map[i]);
		else if (ft_strncmp(map()->map[i], "EA ", 3) == 0)
			parse_textures(&map()->ea, map()->map[i]);
	}
}

void	parse_textures(char **ptr, char *line)
{
	char	*tmp;

	tmp = ft_strdup(&line[3]);
	strip_line(&tmp);
	if (ft_strlen(tmp) == 0 || !check_file(tmp))
	{
		free(tmp);
		return ;
	}
	*ptr = tmp;
	return ;
}

int	test_textures(char *tex_path)
{
	int		tex_h;
	int		tex_w;
	int		return_value;
	t_vars	*tmp;

	tex_h = TEX_H;
	tex_w = TEX_W;
	return_value = 1;
	tmp = malloc(sizeof(t_vars));
	tmp->img = mlx_xpm_file_to_image(vars()->mlx, tex_path, &tex_w, &tex_h);
	if (tmp->img == NULL)
		return_value = 0;
	else
		mlx_destroy_image(vars()->mlx, tmp->img);
	free(tmp);
	return (return_value);
}

int	check_textures(int flag)
{
	if (flag == 0)
	{
		map()->no = NULL;
		map()->so = NULL;
		map()->we = NULL;
		map()->ea = NULL;
		load_textures();
		if (map()->no == NULL || map()->so == NULL || \
		map()->we == NULL || map()->ea == NULL)
			return (0);
		return (1);
	}
	else if (flag == 1)
	{
		if (!test_textures(map()->no) || \
		!test_textures(map()->so) || !test_textures(map()->we) || \
		!test_textures(map()->ea))
		{
			color_print(2, COLOR_RED, "Error\nInvalid texture!\n");
			return (0);
		}
		return (1);
	}
	return (0);
}

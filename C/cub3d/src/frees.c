/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   frees.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ansilva- <ansilva-@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/17 13:57:31 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/12 16:50:45 by ansilva-         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

/*  Free all the memory allocated by the program
Only should be called when the program is about to end.
It's currently freeing memory from these functions:
    - load_map
    - load_textures
	- load_rgb
    - main
*/
void	final_free(void)
{
	int	i;

	free (vars()->mlx);
	free (map()->no);
	free (map()->so);
	free (map()->we);
	free (map()->ea);
	free (map()->no_tex);
	free (map()->so_tex);
	free (map()->we_tex);
	free (map()->ea_tex);
	i = 0;
	while (map()->map[i])
	{
		free (map()->map[i]);
		i++;
	}
	free (map()->map);
}

/*  Free all the memory allocated by the program if an error occurs
An error can ouccur in these functions:
	- check_map_file - Its currently freeing all memory allocated
	by the program until that point
	- check_maps_attributes - Its NOT freeing memory allocated
	by the program until that point
		- load_map_file - Its currently freeing all memory allocated
		by the program until that point
		- load_textures - Its currently NOT freeing memory allocated
		by the program until that point
		- load_rgb - Its currently NOT freeing memory allocated
		by the program until that point
*/
void	error_free(void)
{
	int	i;

	if (map()->no)
		free (map()->no);
	if (map()->so)
		free (map()->so);
	if (map()->we)
		free (map()->we);
	if (map()->ea)
		free (map()->ea);
	if (map()->map)
	{
		i = 0;
		while (map()->map[i])
		{
			free (map()->map[i]);
			i++;
		}
		free (map()->map);
	}
}

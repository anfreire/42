/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   rotations.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ansilva- <ansilva-@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/24 17:08:40 by anastacia         #+#    #+#             */
/*   Updated: 2023/04/12 18:19:54 by ansilva-         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

void	look_left(void)
{
	map()->angle -= 0.1;
	if (map()->angle < 0)
		map()->angle += 2 * PI;
}

void	look_right(void)
{
	map()->angle += 0.1;
	if (map()->angle > 2 * PI)
		map()->angle -= 2 * PI;
}

void	rotate(int key)
{
	map()->delta_x = cos(map()->angle);
	map()->delta_y = sin(map()->angle);
	if (key == key_LEFT)
		look_left();
	else if (key == key_RIGHT)
		look_right();
	map()->dir_x = cos(map()->angle);
	map()->dir_y = sin(map()->angle);
	map()->cam_x = -sin(map()->angle);
	map()->cam_y = cos(map()->angle);
}

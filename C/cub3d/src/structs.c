/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   structs.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ansilva- <ansilva-@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/17 13:39:29 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/12 16:23:27 by ansilva-         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "cub3d.h"

/* Returns t_vars struct */
t_vars	*vars(void)
{
	static t_vars	vars;

	return (&vars);
}

/* Return t_map struct */
t_map	*map(void)
{
	static t_map	map;

	return (&map);
}

t_ray	*ray(void)
{
	static t_ray	ray;

	return (&ray);
}

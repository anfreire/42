/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/01 10:52:50 by anfreire          #+#    #+#             */
/*   Updated: 2022/07/26 21:57:34 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

int	main(int argc, char **argv)
{
	t_data	data;

	if (check_args(argc, argv))
	{
		printf("Error.\n");
		return (0);
	}
	atributte_args(argc, argv, &data);
	if (data.nmbr_philos == 0)
		return (0);
	if (data.nmbr_philos == 1)
	{
		printf("%ld %d died\n", data.t_die, 1);
		return (0);
	}
	create_philos(&data);
	while (check_if_philo_died(&data) == 0)
		check_if_can_proceed(&data);
	destroy_philo(&data);
	return (0);
}

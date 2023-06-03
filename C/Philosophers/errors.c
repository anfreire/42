/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   errors.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/01 11:10:26 by anfreire          #+#    #+#             */
/*   Updated: 2022/07/17 18:48:00 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

int	check_if_digit(char *str)
{
	if (ft_isdigit(str))
		return (1);
	return (0);
}

int	check_args(int argc, char **argv)
{
	int	i;

	i = 0;
	if (argc < 5 || argc > 6)
		return (1);
	while (argv[++i])
	{
		if (check_if_digit(argv[i]))
			return (1);
	}
	return (0);
}

void	atributte_args(int argc, char **argv, t_data *data)
{
	data->nmbr_philos = ft_atoi(argv[1]);
	data->t_die = ft_atoi(argv[2]);
	data->t_eat = ft_atoi(argv[3]);
	data->t_sleep = ft_atoi(argv[4]);
	data->philo_died = 0;
	if (argc == 6)
		data->nmbr_philo_eat = ft_atoi(argv[5]);
	else
		data->nmbr_philo_eat = 0;
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/01 11:19:48 by anfreire          #+#    #+#             */
/*   Updated: 2022/07/26 21:55:38 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

void	create_philos(t_data *data)
{
	int	i;

	i = -1;
	data->philos = malloc(sizeof(t_philo) * data->nmbr_philos);
	data->start = 0;
	while (++i < data->nmbr_philos)
		pthread_mutex_init(&data->philos[i].forks, NULL);
	pthread_mutex_init(&data->p_died, NULL);
	pthread_mutex_init(&data->p_eat, NULL);
	i = -1;
	while (++i < data->nmbr_philos)
	{
		data->philos[i].philos_eated = 0;
		data->philos[i].data = data;
		data->philos[i].philo_nmbr = i + 1;
		if (i == 0)
			gettimeofday(&data->t_start, NULL);
		data->philos[i].t_full = data->t_start;
		pthread_create(&data->philos[i].philo, NULL, &routine, \
		&data->philos[i]);
		usleep(1000);
	}
}

void	destroy_philo(t_data *data)
{
	int	i;

	i = -1;
	while (++i < data->nmbr_philos)
		pthread_join(data->philos[i].philo, NULL);
	pthread_mutex_destroy(&data->p_died);
	pthread_mutex_destroy(&data->p_eat);
	i = -1;
	while (++i < data->nmbr_philos)
		pthread_mutex_destroy(&data->philos[i].forks);
	free(data->philos);
}

void	philo_aux(t_philo *philo, t_data *data)
{
	if (!check_if_philo_died(data))
	{
		printf("%lld %d has taken a fork\n", \
		get_miliseconds(data), philo->philo_nmbr);
		printf("%lld %d has taken a fork\n", \
		get_miliseconds(data), philo->philo_nmbr);
		printf("%lld %d is eating\n", \
		get_miliseconds(data), philo->philo_nmbr);
		check_if_philo_died(data);
		usleep(data->t_eat * 1000);
		check_if_philo_died(data);
	}
	philo_sleeps(philo, data);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   actions.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/03 08:56:13 by anfreire          #+#    #+#             */
/*   Updated: 2022/07/26 21:55:42 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

static void	mutex_lock(t_data *data, int i1, int i2)
{
	pthread_mutex_lock(&data->philos[i1].forks);
	check_if_philo_died(data);
	pthread_mutex_lock(&data->philos[i2].forks);
}

void	philo_eats(t_philo *philo, t_data *data)
{
	int	i1;
	int	i2;

	i1 = philo->philo_nmbr - 1;
	i2 = philo->philo_nmbr;
	if (philo->philo_nmbr == philo->data->nmbr_philos)
	{
		i2 = i1;
		i1 = 0;
	}
	if (check_if_philo_died(data))
		return ;
	mutex_lock(data, i1, i2);
	pthread_mutex_lock(&data->p_eat);
	gettimeofday(&philo->t_full, NULL);
	philo->philos_eated++;
	if (check_if_philo_died(data))
	{
		pthread_mutex_unlock(&data->philos[i1].forks);
		pthread_mutex_unlock(&data->philos[i2].forks);
		pthread_mutex_unlock(&data->p_eat);
		return ;
	}
	pthread_mutex_unlock(&data->p_eat);
	philo_aux(philo, data);
}

void	philo_sleeps(t_philo *philo, t_data *data)
{
	int	i1;
	int	i2;

	i1 = philo->philo_nmbr - 1;
	i2 = philo->philo_nmbr;
	if (philo->philo_nmbr == philo->data->nmbr_philos)
	{
		i2 = i1;
		i1 = 0;
	}
	pthread_mutex_unlock(&data->philos[i1].forks);
	pthread_mutex_unlock(&data->philos[i2].forks);
	if (!check_if_philo_died(data))
		printf("%lld %d is sleeping\n", \
	get_miliseconds(data), philo->philo_nmbr);
	else
		return ;
	usleep(data->t_sleep * 1000);
	if (!check_if_philo_died(data))
		printf("%lld %d is thinking\n", \
	get_miliseconds(data), philo->philo_nmbr);
	else
		return ;
}

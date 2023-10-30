/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routine.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/01 12:27:59 by anfreire          #+#    #+#             */
/*   Updated: 2022/07/26 21:55:37 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

int	check_if_all_philos_eaten(t_data *data)
{
	int	i;

	i = -1;
	if (data->nmbr_philo_eat == 0)
		return (0);
	while (++i < data->nmbr_philos)
	{
		pthread_mutex_lock(&data->p_eat);
		if (data->philos[i].philos_eated < data->nmbr_philo_eat)
		{
			pthread_mutex_unlock(&data->p_eat);
			return (0);
		}
		pthread_mutex_unlock(&data->p_eat);
	}
	return (1);
}

int	check_if_philo_is_dead(t_data *data)
{
	int	i;

	i = -1;
	while (++i < data->nmbr_philos)
	{
		pthread_mutex_lock(&data->p_eat);
		if (get_miliseconds_hunger(&data->philos[i]) >= (long long)data->t_die)
		{
			printf("%lld %d died\n", \
			get_miliseconds(data), data->philos[i].philo_nmbr);
			pthread_mutex_unlock(&data->p_eat);
			return (1);
		}
		pthread_mutex_unlock(&data->p_eat);
	}
	return (0);
}

void	philo_routine(t_data *data, t_philo *philo)
{
	if (check_if_philo_died(data))
		return ;
	philo_eats(philo, data);
	if (check_if_philo_died(data))
		return ;
}

long long	get_miliseconds_hunger(t_philo *philo)
{
	long long		sec;
	long long		usec;
	struct timeval	t_now;

	gettimeofday(&t_now, NULL);
	sec = t_now.tv_sec - philo->t_full.tv_sec;
	usec = t_now.tv_usec - philo->t_full.tv_usec;
	return ((usec / 1000) + (sec * 1000));
}

void	*routine(void *args)
{
	t_philo	*philos;
	t_data	*data;

	philos = (t_philo *)args;
	data = (t_data *)philos->data;
	while (1)
	{
		if (check_if_philo_died(data))
			return (NULL);
		philo_routine(data, philos);
		if (check_if_philo_died(data))
			return (NULL);
	}
	return (NULL);
}

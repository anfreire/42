/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   utils.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/01 11:10:05 by anfreire          #+#    #+#             */
/*   Updated: 2022/07/26 21:55:43 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"

int	ft_isdigit(char *str)
{
	int	i;

	i = -1;
	while (str[++i] != '\0')
	{
		if (!(str[i] >= '0' && str[i] <= '9'))
			return (1);
	}
	return (0);
}

int	ft_atoi(char *str)
{
	int		i;
	int		result;

	result = 0;
	i = 0;
	while (str[i] && str[i] >= '0' && str[i] <= '9')
	{
		result *= 10;
		result += str[i++] - '0';
	}
	return (result);
}

long long	get_miliseconds(t_data *data)
{
	long long		sec;
	long long		usec;
	struct timeval	t_now;

	gettimeofday(&t_now, NULL);
	sec = t_now.tv_sec - data->t_start.tv_sec;
	usec = t_now.tv_usec - data->t_start.tv_usec;
	return ((usec / 1000) + (sec * 1000));
}

int	check_if_can_proceed(t_data *data)
{
	if (check_if_philo_is_dead(data) || check_if_all_philos_eaten(data))
	{
		pthread_mutex_lock(&data->p_died);
		data->philo_died = 1;
		pthread_mutex_unlock(&data->p_died);
		return (1);
	}
	return (0);
}

int	check_if_philo_died(t_data *data)
{
	int	p;

	p = 0;
	pthread_mutex_lock(&data->p_died);
	if (data->philo_died)
		p = 1;
	pthread_mutex_unlock(&data->p_died);
	if (p == 1)
		return (1);
	else
		return (0);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/07/01 10:52:07 by anfreire          #+#    #+#             */
/*   Updated: 2022/07/26 21:55:39 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef HEADER_H
# define HEADER_H

# include <unistd.h>
# include <stdio.h>
# include <stdlib.h>
# include <pthread.h>
# include <sys/time.h>
# include <time.h>
# include <string.h>

typedef struct s_data	t_data;

typedef struct s_philo
{
	int				philo_nmbr;
	int				philos_eated;
	pthread_t		philo;
	pthread_mutex_t	forks;
	struct timeval	t_full;
	t_data			*data;

}				t_philo;

struct s_data
{
	int				nmbr_philos;
	int				*forks;
	struct timeval	t_start;
	pthread_mutex_t	p_died;
	pthread_mutex_t	p_eat;
	long			t_eat;
	long			t_die;
	long			t_sleep;
	int				start;
	int				nmbr_philo_eat;
	int				philo_died;
	t_philo			*philos;
};

void		philo_eats(t_philo *philo, t_data *data);
void		philo_aux(t_philo *philo, t_data *data);
void		philo_sleeps(t_philo *philo, t_data *data);
void		philo_thinks(t_philo *philo, t_data *data);

//routine
void		*routine(void *args);
int			check_if_all_philos_eaten(t_data *data);
void		philo_routine(t_data *data, t_philo *philo);
int			check_if_philo_is_dead(t_data *data);
long long	get_miliseconds_hunger(t_philo *philo);

//errors
int			check_if_digit(char *str);
int			check_args(int argc, char **argv);
void		atributte_args(int argc, char **argv, t_data *data);
long long	get_miliseconds(t_data *data);

//process
void		create_philos(t_data *data);
void		destroy_philo(t_data *data);

//utils
int			ft_isdigit(char *str);
int			ft_atoi(char *str);
int			check_if_can_proceed(t_data *data);
int			check_if_philo_died(t_data *data);

#endif
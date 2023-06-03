/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signals.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/18 08:22:28 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/14 00:06:09 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

void	sig_handler(int signum)
{
	if (signum == SIGINT)
	{
		ioctl(STDIN_FILENO, TIOCSTI, "\n");
		rl_replace_line("", 0);
		rl_on_new_line();
		g_exit = 130;
	}
}

void	sig_handler_no_extra_nl(int signum)
{
	static int	i = 0;

	if (signum == SIGINT && i == 0)
	{
		rl_replace_line("", 0);
		rl_on_new_line();
		g_exit = 130;
		i = 1;
	}
	else
	{
		sig_handler(signum);
		i = 0;
	}
	g_exit = 130;
}

void	h_doc_sig(int signum)
{
	if (signum == SIGINT)
		g_exit = 131;
	signal(SIGQUIT, h_doc_sig);
}

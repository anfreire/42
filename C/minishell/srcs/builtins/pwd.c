/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pwd.c                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/09/19 03:34:10 by anfreire          #+#    #+#             */
/*   Updated: 2022/11/12 16:19:56 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

extern int	g_exit;

void	b_pwd(void)
{
	char	buff[FILENAME_MAX];

	getcwd(buff, FILENAME_MAX);
	printf("%s\n", buff);
	g_exit = 0;
}

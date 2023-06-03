/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_substr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/02/14 12:21:49 by dmendonc          #+#    #+#             */
/*   Updated: 2022/11/15 12:58:24 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_substr(char const *s, unsigned int start, size_t len)
{
	char			*ptr;
	unsigned int	i;
	unsigned int	cont;

	i = 0;
	cont = 0;
	if (!s)
		return (NULL);
	if (ft_strlen((char *)s) - start < len && start <= ft_strlen((char *)s))
		ptr = (char *)malloc((ft_strlen((char *)s) - start + 1) * sizeof(char));
	else if (start <= ft_strlen((char *)s))
		ptr = malloc((len + 1) * sizeof(char));
	else
		ptr = malloc(sizeof(char));
	if (!ptr)
		return (NULL);
	while (s[cont])
	{
		if (cont >= start && i < len)
			ptr[i++] = (char)s[cont];
		cont++;
	}
	ptr[i] = '\0';
	return (ptr);
}

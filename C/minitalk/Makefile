# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/05/15 19:01:09 by anfreire          #+#    #+#              #
#    Updated: 2022/05/17 16:11:26 by anfreire         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all:
	@cd libft && make all
	@cd ft_printf && make all
	@gcc -Wall -Wextra -Werror server.c libft/libft.a ft_printf/ft_printf.a -o server
	@gcc -Wall -Wextra -Werror client.c libft/libft.a ft_printf/ft_printf.a -o client

clean:
	@cd ft_printf && make clean
	@cd libft && make clean
	@rm -f server
	@rm -f client

fclean: clean
	@cd libft && make fclean
	@cd ft_printf && make fclean

re: fclean all
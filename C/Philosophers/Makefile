# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/07/03 08:30:11 by anfreire          #+#    #+#              #
#    Updated: 2022/07/26 21:58:06 by anfreire         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = philo

SRCS = $(wildcard *.c)

OBJS = $(SRCS:.c=.o)

FLAGS		= -Wall -Wextra -Werror -pthread -fsanitize=thread

all			:	$(NAME)

$(NAME)		:	$(OBJS)
		@gcc $(FLAGS) -o $(NAME) $(OBJS)
		@echo	""
		@echo	"$$ ./philo && Object Files Generated"
		@echo	""
%.o			:	%.c
		@gcc $(FLAGS) -c $^ -I./ -o $@

clean		:
		@rm -f $(OBJS)
		@echo	""
		@echo	"$$ Object Files Deleted"
		@echo	""

fclean		:	clean
		@rm -f $(NAME)
		@echo	""
		@echo	"$$ ./philo Deleted"
		@echo	""

re			:	fclean all

.PHONY		:	all clean fclean re bonus

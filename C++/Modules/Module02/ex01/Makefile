# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/03/01 00:01:22 by anfreire          #+#    #+#              #
#    Updated: 2023/03/25 23:53:34 by anfreire         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

CLEAN_EMOJI = '\xF0\x9F\x9A\xAE'
CHECK_EMOJI = '\xE2\x9C\x85'
USER_EMOJI = '\xF0\x9F\x91\xA4'
INTERNET_EMOJI = '\xF0\x9F\x8C\x90'


NAME = Towards_a_more_useful_fixed-point_number_class


SRCS = main.cpp \
		Fixed.cpp
		


OBJS = $(SRCS:.cpp=.o)


CC = @g++


CFLAGS = -Wall -Wextra -Werror -std=c++98


all : $(NAME)


$(NAME) : $(OBJS)
	$(CC) $(CFLAGS) $(OBJS) -o $(NAME)
	@echo
	@printf $(CHECK_EMOJI)
	@echo "\033[1;32m ./$(NAME) built successfully\033[0m"
	@echo
	@echo
	@printf $(USER_EMOJI)
	@echo "\033[1;34m Made by anfreire\033[0m"
	@echo
	@printf $(INTERNET_EMOJI)
	@echo "\033[1;34m anfreire.me\033[0m"


%.o: %.cpp
	$(CC) $(CFLAGS) -c $< -o $@
	@echo
	@printf $(CHECK_EMOJI)
	@echo "\033[1;32m Object files built successfully\033[0m"
	@echo


clean:
	@rm -f $(OBJS)
	@echo
	@printf $(CLEAN_EMOJI)
	@echo "\033[1;33m Object files deleted\033[0m"
	@echo


fclean : clean
	@rm -f $(NAME)
	@echo
	@printf $(CLEAN_EMOJI)
	@echo "\033[1;33m ./$(NAME) deleted\033[0m"
	@echo


re: fclean all


.PHONY: all clean fclean re

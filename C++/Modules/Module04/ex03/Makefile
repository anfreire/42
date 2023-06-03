# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/04/11 12:18:28 by anfreire          #+#    #+#              #
#    Updated: 2023/04/17 18:00:45 by anfreire         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

CLEAN_EMOJI = '\xF0\x9F\x9A\xAE'
CHECK_EMOJI = '\xE2\x9C\x85'
USER_EMOJI = '\xF0\x9F\x91\xA4'
INTERNET_EMOJI = '\xF0\x9F\x8C\x90'

NAME = Interface


SRCS_DIR = ./src/


OBJS_DIR = ./obj/


SRCS = main.cpp \
		AMateria.cpp \
		Character.cpp \
		Cure.cpp \
		Ice.cpp \
		MateriaSource.cpp \

OBJS = $(addprefix $(OBJS_DIR), $(SRCS:.cpp=.o))


CC = @g++


CFLAGS = -Wall -Wextra -Werror -std=c++98 -g


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


$(OBJS_DIR)%.o: $(SRCS_DIR)%.cpp
	@mkdir -p $(OBJS_DIR)
	$(CC) $(CFLAGS) -c $< -o $@
	@echo
	@printf $(CHECK_EMOJI)
	@echo "\033[1;32m $< compiled successfully\033[0m"
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

check_leaks:
	valgrind --leak-check=full --show-leak-kinds=all -s ./$(NAME)


.PHONY: all clean fclean re check_leaks
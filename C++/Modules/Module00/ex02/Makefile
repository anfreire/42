# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/03/01 00:01:22 by anfreire          #+#    #+#              #
#    Updated: 2023/03/10 16:13:55 by anfreire         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #


NAME = global_bank_united


LOG_FILE = 19920104_091532.log


SRCS = tests.cpp \
		Account.cpp \
		


OBJS = $(SRCS:.cpp=.o)


CC = @g++


CFLAGS = -Wall -Wextra -Werror -std=c++98


all : $(NAME)


$(NAME) : $(OBJS)
	$(CC) $(CFLAGS) $(OBJS) -o $(NAME)
	@echo
	@echo "\033[1;32m✅ ./$(NAME) built successfully\033[0m"
	@echo
	@echo
	@echo "\033[1;34m👤 Made by anfreire\033[0m"
	@echo
	@echo "\033[1;34m🌐 anfreire.me\033[0m"


%.o: %.cpp
	$(CC) $(CFLAGS) -c $< -o $@
	@echo
	@echo "\033[1;32m✅ Object files built successfully\033[0m"
	@echo


clean:
	@rm -f $(OBJS)
	@echo
	@echo "\033[1;33m🚮 Object files deleted\033[0m"
	@echo


fclean : clean
	@rm -f $(NAME)
	@echo
	@echo "\033[1;33m🚮 ./$(NAME) deleted\033[0m"
	@echo


re: fclean all


diff_logs: re
	@./$(NAME) > output.txt
	@cut -c 18- output.txt > output_cut.txt
	@cut -c 18- $(LOG_FILE) > log_cut.txt
	@diff output_cut.txt log_cut.txt
	@rm output.txt output_cut.txt log_cut.txt
	$(MAKE) fclean


check_leaks: re
	@echo
	@echo "\033[1;31m🔎 Checking for leaks...\033[0m"
	@echo
	@valgrind --leak-check=full --show-leak-kinds=all ./$(NAME)
    


.PHONY: all clean fclean re diff_logs

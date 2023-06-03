# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/08/16 20:21:37 by anfreire          #+#    #+#              #
#    Updated: 2023/01/20 19:29:57 by dmendonc         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = minishell

SRCS = ./gnl/get_next_line_utils.c    \
./gnl/get_next_line.c    \
./srcs/env/envp.c    \
./srcs/env/utils_env.c    \
./srcs/redirections/close_files.c    \
./srcs/redirections/check_redirections.c    \
./srcs/redirections/utils_redirections.c    \
./srcs/redirections/bridges.c    \
./srcs/redirections/pipes.c    \
./srcs/redirections/exec_redirections.c    \
./srcs/redirections/redirections.c    \
./srcs/redirections/heredoc.c    \
./srcs/redirections/extract_names.c    \
./srcs/builtins/cd.c    \
./srcs/builtins/pwd.c    \
./srcs/builtins/echo.c    \
./srcs/builtins/export.c   \
./srcs/builtins/export1.c   \
./srcs/builtins/unset.c    \
./srcs/builtins/run_builtins.c    \
./srcs/builtins/minishell.c    \
./srcs/builtins/exit_minishell.c    \
./srcs/main.c    \
./srcs/parsing/count_line.c    \
./srcs/parsing/parsing_detect.c    \
./srcs/parsing/parsing_line_utils.c    \
./srcs/parsing/utils.c    \
./srcs/parsing/true_path.c    \
./srcs/parsing/parsing_line_constructor.c    \
./srcs/parsing/parsing_cmds.c    \
./srcs/parsing/parsing_line.c    \
./srcs/parsing/parsing_allocs.c    \
./srcs/parsing/parsing_built.c    \
./srcs/parsing/get_line.c    \
./srcs/parsing/parsing_paths.c    \
./srcs/parsing/utils_parsing.c    \
./srcs/utils/main_utils.c    \
./srcs/utils/new_split.c    \
./srcs/utils/utils.c    \
./srcs/utils/starting.c    \
./srcs/utils/starting_2.c    \
./srcs/utils/handle_error.c    \
./srcs/frees/free.c    \
./srcs/frees/free2.c    \
./srcs/frees/free3.c    \
./srcs/commands/cmd_not_found.c    \
./srcs/commands/command.c    \
./srcs/signals/signals.c    \
./srcs/signals/exit_shell.c    \
./libft/ft_memmove.c    \
./libft/ft_tolower.c    \
./libft/ft_isalnum.c    \
./libft/ft_strchr.c    \
./libft/ft_strncmp.c    \
./libft/ft_split.c    \
./libft/ft_isalpha.c    \
./libft/ft_strlen.c    \
./libft/ft_toupper.c    \
./libft/ft_substr.c    \
./libft/ft_lstadd_back.c    \
./libft/ft_memcmp.c    \
./libft/ft_lstnew.c    \
./libft/ft_strlcat.c    \
./libft/ft_itoa.c    \
./libft/ft_putendl_fd.c    \
./libft/ft_striteri.c    \
./libft/ft_memchr.c    \
./libft/ft_strdup.c    \
./libft/ft_lstsize.c    \
./libft/ft_strjoin.c    \
./libft/ft_lstlast.c    \
./libft/ft_strnstr.c    \
./libft/ft_putnbr_fd.c    \
./libft/ft_memcpy.c    \
./libft/ft_lstadd_front.c    \
./libft/ft_isprint.c    \
./libft/ft_strmapi.c    \
./libft/ft_isascii.c    \
./libft/ft_memset.c    \
./libft/ft_isdigit.c    \
./libft/ft_putchar_fd.c   \
./libft/ft_lstiter.c    \
./libft/ft_lstmap.c    \
./libft/ft_lstclear.c    \
./libft/ft_atoi.c    \
./libft/ft_bzero.c    \
./libft/ft_lstdelone.c    \
./libft/ft_strrchr.c    \
./libft/ft_strlcpy.c    \
./libft/ft_calloc.c    \
./libft/ft_putstr_fd.c    \
./libft/ft_strtrim.c

OBJS = $(SRCS:.c=.o)

CFLAGS		= -g -Wall -Wextra -Werror -lreadline -ltinfo #-fsanitize=address

all	:	$(NAME)


$(NAME)	:	$(OBJS)

		@gcc -o $(NAME) $(OBJS) $(CFLAGS)
		@clear
		@echo	""
		@echo	"$$ ./minishell && Object Files Generated"
		@echo	""
		@echo	""
		@echo	""
		@echo  "\e[34m           :::   :::   ::::::::::: ::::    ::: ::::::::::: ::::::::  :::    ::: :::::::::: :::        :::	"
		@echo  "         :+:+: :+:+:      :+:     :+:+:   :+:     :+:    :+:    :+: :+:    :+: :+:        :+:        :+:  "
		@echo  "       +:+ +:+:+ +:+     +:+     :+:+:+  +:+     +:+    +:+        +:+    +:+ +:+        +:+        +:+   "
		@echo  "      +#+  +:+  +#+     +#+     +#+ +:+ +#+     +#+    +#++:++#++ +#++:++#++ +#++:++#   +#+        +#+    "
		@echo  "     +#+       +#+     +#+     +#+  +#+#+#     +#+           +#+ +#+    +#+ +#+        +#+        +#+     "
		@echo  "    #+#       #+#     #+#     #+#   #+#+#     #+#    #+#    #+# #+#    #+# #+#        #+#        #+#      "
		@echo  "   ###       ### ########### ###    #### ########### ########  ###    ### ########## ########## ##########"
		@echo  " "
		@echo  "\e[32mVersion : 1.0.1"
		@echo  " "
		@echo  "\e[36mThis program replicates the behavior of the bash shell. runs commands, redirections and has some builtin commands."
		@echo  "Runs commands that already exist in the operating system (some we built too), by using parallel processing (forks)"
		@echo  "and the redirections run exactly like in the bash hierarchy. You're able to fully check the objectives on this project "
		@echo  "by checking the file subject.pdf."
		@echo  " "
		@echo  "\e[33mSo we hope you enjoy going through this shell half as much as we enjoyed making it for you,"
		@echo  "because we had a ball."
		@echo  " "
		@echo  "\e[32mnow run ./minishell and welcome!"
		@echo  " "
		@echo  "\e[0mWork made by:"
		@echo  "Diogo MBM Calado and Andre Freire, from 42 Lisbon."
		@echo  " "
		@echo  " "
		@echo  " "
		
%.o	:	%.c
	@gcc $(CFLAGS) -c $^ -I./ -o $@
	

clean	:
	@rm -f $(OBJS)
	@clear
	@echo	""
	@echo	"$$ Object Files Deleted"
	@echo	""
		
fclean	:	clean
	@rm -f $(NAME)
	@clear
	@echo	""
	@echo	"$$ ./minishell Deleted"
	@echo	""

re			:	fclean all

.PHONY		:	all clean fclean re bonus
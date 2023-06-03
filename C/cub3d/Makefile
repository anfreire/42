# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/03/16 12:03:54 by ansilva-          #+#    #+#              #
#    Updated: 2023/04/13 15:07:39 by anfreire         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #


$(VERBOSE).SILENT:

NAME = cub3d

CUB3D_SRC = src/main \
			src/window \
			src/window2 \
			src/moves \
			src/moves2 \
			src/rotations \
			src/utils \
			src/structs \
			src/frees \
			src/raycasting\
			src/minimap \
			src/parsing/file \
			src/parsing/map \
			src/parsing/rgb \
			src/parsing/textures \
			src/parsing/utils1 \
			src/parsing/utils2 \
			src/parsing/utils3 \
			src/parsing/validation \


SRC = $(CUB3D_SRC) 


PRINTF = printf/libftprintf.a
PRINTF_PATH = printf

LIBFT = libft/libft.a
LIBFT_PATH = libft


CC = @gcc
RM = @rm -f
CFLAGS = -Wall -Werror -Wextra -I. -fsanitize=address
LINKS = -L./mlx_linux -lmlx_Linux -L/usr/lib -Imlx_linux -lXext -lX11 -lm -lz
MLX = ./mlx_linux/libmlx.a


all: $(NAME)
	@if [ -e $(NAME) ]; then echo "\033[1;36mCub3D is ready!\033[0m"; fi

$(NAME): $(SRC:=.o) $(MLX) $(LIBFT) $(PRINTF)
	$(CC) $(CFLAGS) $(SRC:=.o) $(LIBFT) $(PRINTF) $(LINKS) -o $(NAME)

%.o: %.c
	$(CC) $(CFLAGS) -I /usr/include -Imlx_linux  -c $< -o $@

$(LIBFT):
	make -C $(LIBFT_PATH)

$(PRINTF):
	make -C $(PRINTF_PATH)

$(MLX):
	make -C mlx_linux

clean:
	$(RM) $(NAME) $(SRC:=.o)
	echo "\033[1;36mCub3D files removed!\033[0m"

fclean: clean
	$(RM) $(LIBFT) $(PRINTF)
	make fclean -C libft
	make fclean -C printf
	echo "\033[1;36mTotally clean!\033[0m"

re: fclean all

rm_mlx:
	rm -rf mlx_linux

get_mlx:
	git clone https://github.com/42Paris/minilibx-linux mlx_linux

check_leaks: CFLAGS := $(filter-out -fsanitize=address,$(CFLAGS))
check_leaks: re
	@echo "Select a map file:"
	@ls maps/ | cat -n
	@echo ""
	@read -p "Enter the index of the map file: " map_index; \
	map_file=`ls maps/ | sed -n $$map_index\p`; \
	if [ -z "$$map_file" ]; then \
		echo "Invalid map index"; \
	else \
		valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes --show-error-list=yes ./cub3d maps/$$map_file; \
	fi

.PHONY: all clean fclean re get_mlx check_leaks rm_mlx
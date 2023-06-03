/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cub3d.h                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/16 12:14:54 by ansilva-          #+#    #+#             */
/*   Updated: 2023/04/13 15:07:20 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef CUB3D_H
# define CUB3D_H

# include <../mlx_linux/mlx.h>
# include <stdlib.h>
# include <unistd.h>
# include <stdio.h>
# include <fcntl.h>
# include <math.h>
# include "../libft/libft.h"
# include "../printf/ft_printf.h"
# include <math.h>
# define PI 3.1415926535

/*Macro for booleans*/
# define FALSE 	0
# define TRUE 	1

/*Macros for printing colors*/
# define COLOR_BLACK 	"\033[1;90m"
# define COLOR_RED 		"\033[1;91m"
# define COLOR_GREEN 	"\033[1;92m"
# define COLOR_YELLOW	"\033[1;93m"
# define COLOR_BLUE		"\033[1;94m"
# define COLOR_PURPLE	"\033[1;95m" 
# define COLOR_CYAN 	"\033[1;96m"
# define COLOR_WHITE 	"\033[1;97m"
# define COLOR_RESET 	"\033[0m"

# define PX 32
# define P_PX 8
# define W 1280
# define H 720
# define TEX_W 32
# define TEX_H 32
# define RAD_66 1.151917
# define RAD_1 0.0174533

typedef struct s_pos
{
	int	x;
	int	y;
}	t_pos;

typedef struct s_cast
{
	int		y;
	int		tex_x;
	double	wall_x;
	double	line_h;
	int		tex_y;
	int		color;
}	t_cast;

typedef struct s_vars
{
	void	*mlx;
	void	*win;
	char	*addr;
	int		bits_per_pixel;
	int		line_length;
	int		endian;
	void	*img;
}	t_vars;

typedef struct s_map
{
	size_t	width;
	size_t	height;
	double	pos_x;
	double	pos_y;
	double	px;
	double	py;
	double	dir_x;
	double	dir_y;
	double	cam_x;
	double	cam_y;
	double	delta_x;
	double	delta_y;
	double	angle;
	char	dir;
	char	*no;
	char	*so;
	char	*we;
	char	*ea;
	t_vars	*no_tex;
	t_vars	*so_tex;
	t_vars	*we_tex;
	t_vars	*ea_tex;
	int		ceiling[3];
	int		floor[3];
	char	**map;
}	t_map;

typedef struct s_ray
{
	double	dir_x;
	double	dir_y;
	double	side_dist_x;
	double	side_dist_y;
	double	delta_dist_x;
	double	delta_dist_y;
	double	perp_wall_dist;
	int		map_x;
	int		map_y;
	int		step_x;
	int		step_y;
	int		side;
	int		draw_start;
	int		draw_end;
}	t_ray;

enum	e_keys{
	key_UP = 65362,
	key_DOWN = 65364,
	key_LEFT = 65361,
	key_RIGHT = 65363,
	key_W = 119,
	key_S = 115,
	key_A = 97,
	key_D = 100,
	key_ESC = 65307
};

// frees.c
// Contains all the functions that free the memory

void	final_free(void);
void	error_free(void);

//	moves.c
//	Contains all the functions that handle the keys and mouse events
int		key_hook(int key);
void	move_up(void);
void	move_down(void);
void	move_right(void);
void	move_left(void);
// rotations.c
// Contains the functions that change player direction
void	rotate(int key);
void	look_left(void);
void	look_right(void);
//	utils.c
//	Contains all the functions that are used in more than one file
int		check_file(char	*file);
void	color_print(int fd, char *color, ...);
//	structs.c
//	Contains all the functions that return the instances of the structs
t_vars	*vars(void);
t_map	*map(void);
t_ray	*ray(void);
//	window.c
//	Contains all the functions that handle the window
int		close_window(void *anything);
void	my_mlx_pixel_put(int x, int y, int color, t_vars *vars);
void	draw_map(void);
void	define_colors(t_ray *ray, int x);
void	refresh(void);
t_vars	*get_texture(t_ray *ray);
// raycasting.c
void	calc_step_dist(t_ray *ray);
void	find_wall(t_ray *ray);
void	calc_height(t_ray *ray);
// minimap.c
void	draw_minimap(void);

// Parsing - file.c
int		parse_map_file(int *fd, char *file, char **line);
void	load_map_file(int *fd, char **line);
int		check_map_file(char *file);

// Parsing - map.c
void	set_map_size(void);
int		set_player_pos(int x, int y);
void	remap(void);
int		parse_map(void);
int		check_lines_middle_map(char *raw_line);

// Parsing - rgb.c
int		set_rgb(int *ptr1, int *ptr2, int *ptr3, char **list);
int		set_ceiling_rgb(void);
int		set_floor_rgb(void);
int		check_rgb(void);
int		create_trgb(int t, int r, int g, int b);

// Parsing - textures.c
void	load_textures(void);
void	parse_textures(char **ptr, char *line);
int		check_textures(int flag);

// Parsing - utils*.c
void	strip_line(char **line);
int		check_file(char	*file);
int		ft_split_len(char **str);
void	free_split(char **list);
char	*string_realloc_1_char(char *str);
int		get_new_len(char *line);
char	*get_new_line(char *line);
char	*spaces_line(void);
int		valid_char(char c, int flag);
int		index_of_needle_start(char *haystack, char *needle);
int		index_of_needle_end(char *haystack, char *needle);
int		check_neighbours(int x, int y);
void	get_dir(char p);
void	get_dir_cont(char p);

// Parsing - validation.c
int		check_map_extension(char *map_path);
int		check_maps_attributes(char	*map_path);
int		check_map(void);

#endif
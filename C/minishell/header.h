/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.h                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/08/17 00:03:02 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/20 18:45:40 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef HEADER_H
# define HEADER_H
# define BUFFER_SIZE 42

# include "libft/libft.h"
# include "./gnl/get_next_line.h"

// struct dos builtins

typedef struct s_built
{
	int		args;
	int		b_counter;
	int		builtin_n;
	char	**builtins;
	char	***builtin;
}				t_built;

// struct de redirecoes

typedef struct s_redir
{
	int		flag;
	int		flag_i;
	int		flag_o;
	int		hdoc_id;
	int		last;
	int		r_counter;
	int		input_n;
	int		output_n;
	int		append_n;
	int		heredoc_n;
	int		input_c;
	int		output_c;
	int		append_c;
	int		father_flag;
	char	*hdoc_key;
	char	*redir_lib;
	char	**output;
	char	**input;
}				t_redir;

// struct dos comandos

typedef struct s_cmd
{
	int		c_counter;
	char	**cmd;
	char	***cmdx;
	int		cmd_nbr;
	char	*infile;
	char	*outfile;
}				t_cmd;

// struct dos ids

typedef struct s_ids
{
	int		*inp_list;
	int		*outp_list;
	int		*appnd_list;
	int		*hered_list;
	int		in_fd;
	int		out_fd;
	int		**pfd;
	int		*indicador;
	pid_t	*id;
}				t_ids;

// struct das paths

typedef struct s_paths
{
	int		*indicador;
	char	*test_cmd;
	char	*p_str;
	char	**spaths;
	char	**paths;
	char	**path_cmd;
}				t_paths;

// struct para uso de builtins do Andre
typedef struct s_andre
{
	int		args;
	int		flag;
	char	**c_dbl_ptr;
	char	*c_ptr;
}				t_andre;

typedef struct s_redir_tmp
{
	int	i;
	int	flag_i;
	int	flag_o;
	int	index;
	int	size;
	int	ret;
}				t_redir_tmp;

typedef struct s_get_line
{
	int		i;
	int		args;
	char	*line;
	char	**dbl_ptr;
}				t_get_line;

// BIG MOMA

typedef struct s_data
{
	int		flag;
	int		safety_cmd;
	int		safety_blt;
	int		size;
	char	**par_line;
	char	*line;
	char	**envp;
	t_ids	ids;
	t_cmd	cmd;
	t_paths	paths;
	t_redir	redir;
	t_built	built;
	t_andre	andre;
}				t_data;

void	starting_vars(t_data *data);
void	starting(t_data *data, char *envp[]);
void	start_flags_redir(t_data *data, int *index, int *i);
int		main_proceed_cannot(t_data	*data);

//UTILS
// utils
int		len_str(char *str);
char	*str_cpy(char *dest, char *str);
int		error_redir_pipe(t_data *data);

// new split
int		count_rows(char *s, char c);
char	**spliting(char *s, char c);
int		find_c(char *s, char c, int index);
int		find_len(char *s, char c, int index);
char	*substring(char *s, int start, int len);
void	set_counters(t_data *data);

//PARSING
//allocation of needed information
void	alloc_cmds(t_data *data);
void	parse_alloc(t_data *data);
void	null_them_var(t_data *data);
void	handle_error(t_data *data, int i);
void	extra_protection_free(t_data *data);
void	allocat_lists(t_data *data, int size);

//line handling and utils
void	get_line(t_data *data);
void	count_line(t_data *data);
void	create_lists(t_data *data);
void	joining(t_data *data, char *str, int i_p);

//parsing detectors
int		full_detector(t_data *data, char *str);
int		redir_detector(t_data *data, char *str);
int		builtin_detector(t_data *data, char *str);
int		cmd_detector(t_data *data, char *str);

//parssing line
void	trim_spaces(char *str);
int		is_str_in_quotes(char *str, char c);
char	*is_string_expandable(char *str, t_data *data);
char	*realloc_string(char *ptr, char *str, int flag);
char	**realloc_list(char **ptr, int len);
char	**build_list(int len, char **ptr, char *str, t_data *data);
void	parse_line(t_data *data);
int		parse_pipe(char ***dbl_ptr, char *line, int args, t_data *data);

//ENVIRONMENT
//parsing the env and extracting the paths
void	get_envp(t_data *data, char **envp);
void	get_paths(t_data *data);
int		data_par_line_counter(t_data *data, int index);

//environment utils
char	*add_str(char *str);
char	*add_estr(t_data *data, int index);
int		equal(t_data *data, char *string, int index);

//PATH HANDLING
int		how_many_paths(char const *s, char c);
int		compare(const char *s1, const char *s2);
int		p_size(t_data *data, char *str, int i_p);
int		path_size(t_data *data, int index, int i_p);
void	path_join(t_data *data, int index, int i_p);
int		true_path_join(t_data *data, int index, int i);

//COMMANDS
//parsing and testing if its executable
void	command_not_found(t_data *data);
void	parse_cmds(t_data *data);
void	parse_cmd(t_data *data, int index);
void	command_not_found(t_data *data);
void	no_command_not_found(t_data *data);
void	true_path(t_data *data, int index, int i, int count);
void	parse_real_cmd(t_data *data, int index, int i, int count);
int		acessing_cmd(t_data *data, int index, int i);

//running commands
void	run_processes(t_data *data, int index);
void	run_command(t_data *data, int index, int cmd_i, int i);
void	run_father(t_data *data, int index);
void	run_one_father(t_data *data);
void	run_child(t_data *data, int index);

// cmds - utils
void	count_cmds(t_data *data);
int		count_cmd_args(t_data *data, int i);
int		get_cmd_i(t_data *data, int index);

//BUILTINS
// parsing builtins
void	get_str(t_data *data, char *str, int index);
void	builting(t_data *data, int i, int index);
void	built_builting(t_data *data, int i, int size, int index);
void	parse_builtin(t_data *data, int i, int index);

//env, export and unset builtins
void	parse_export(t_data *data, int index);
void	env(t_data *data, int index);
void	unset(t_data *data, int index);
void	export(t_data *data, int index);
void	export_env(t_data *data);
void	export_var(t_data *data, char *str);
void	exec_builtin(t_data *data, int index, int i);
void	execve_builtin(t_data *data, int index, int jndex, int i);

//cd, echo, and pwd, minishell and exit builtins
void	b_echo(t_data *data, int index);
void	echo_with_n_flag(t_data *data);
void	b_pwd(void);
void	b_cd(t_data *data, int index);
void	run_minishell(t_data *data, int index);
void	exit_minishell(t_data *data, int index);

//utils
int		is_dot_cmd(char *str);
int		find_in_list(int *smal, int i);
int		get_next(t_data *data, int *smal);
int		env_var_detector(t_data *data, char *str);
char	*selection(t_data *data, int j);

// |-|-|-|-|     REDIRECTIONS     |-|-|-|-|
// parsing redirections

void	reset_counters(t_data *data);
void	alloc_redirections(t_data *data);
void	parse_redirec(t_data *data, int i);
int		run_c(t_data *data, int i);

//pipes
void	pipes(t_data *data);
void	piping(t_data *data, int index, int fn);
int		redirect_input(t_data *data, int index, int size);
int		redirect_output(t_data *data, int index, int size);
void	redirecting_input(t_data *data, int index);
void	redirecting_output(t_data *data, int index);
void	piping_first(t_data *data, int index);
void	piping_last(t_data *data, int index);
int		walk_till_pipe(t_data *data, int i);

// input and output
int		find_i_for_infile(t_data *data, int index);
int		find_i_for_outfile(t_data *data, int index);
void	extract_input(t_data *data, int index, int i);
void	extract_output(t_data *data, int index, int i);
int		bridge_infiles(t_data *data, int index);
int		bridge_outfiles(t_data *data, int index);
int		check_for_wrong_input(t_data *data, int i);
int		check_for_wrong_output(t_data *data, int i);
int		bridging_infiles(t_data *data, int index, int count, int i);
int		bridging_outfiles(t_data *data, int index, int count, int i);

// heredoc
void	heredoc(t_data *data, int index);
void	extract_hdockey(t_data *data, int i);
int		compare_key(t_data *data, char *buffer, int len);

//running the redirections
int		redirect(t_data *data);
int		exec_in_redirect(t_data *data, int index, int save);
int		exec_out_redirect(t_data *data, int index, int save);

//SIGNALS
void	sig_handler(int signum);
void	exit_shell_sig(int sig);
void	exit_shell(t_data *data);
void	sig_handler_no_extra_nl(int signum);
void	h_doc_sig(int signum);

//MAIN
void	brain(t_data *data);
void	handle_line(t_data *data);
int		run_line(t_data *data, int i);
int		test_if_run(t_data *data, int i);
int		main_proceed_cannot(t_data	*data);
int		count_cmds_left(t_data *data, int i);
int		is_viable_path(t_data *data, char *cmd);

//FREES
void	free_line(t_data *data);
void	free_line_info(t_data *data);
void	free_cmds(t_data *data);
void	free_new_cmds(t_data *data, int index);
void	close_files(t_data *data);
void	free_builtins(t_data *data);
void	free_for_exit(t_data *data);
void	free_for_builtins(t_data *data, int index);
void	free_heredoc(t_data *data);
void	free_redirect(t_data *data);

#endif
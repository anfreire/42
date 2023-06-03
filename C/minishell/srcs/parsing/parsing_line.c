/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parsing_line.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dmendonc <dmendonc@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/10/10 16:30:44 by anfreire          #+#    #+#             */
/*   Updated: 2023/01/20 15:51:47 by dmendonc         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../../header.h"

static int	parse_double_quotes(char ***dbl_ptr, char *line, int args,
		t_data *data)
{
	int		i;
	char	*str;

	str = ft_substr(line, 1, (ft_strchr(&line[1], '\"') - line - 1));
	i = ft_strlen(str) + 2;
	str = is_string_expandable(str, data);
	*dbl_ptr = build_list(args, *dbl_ptr, str, data);
	free(str);
	return (i);
}

static int	parse_single_quotes(char ***dbl_ptr, char *line, int args,
		t_data *data)
{
	int		i;
	char	*str;

	str = ft_substr(line, 1, (ft_strchr(&line[1], '\'') - line - 1));
	i = ft_strlen(str) + 2;
	*dbl_ptr = build_list(args, *dbl_ptr, str, data);
	free(str);
	return (i);
}

static int	parse_chars(char ***dbl_ptr, char *line, int args, t_data *data)
{
	int		i;
	int		flag;
	char	append[2];
	char	*str;

	append[0] = 0;
	append[1] = 0;
	flag = 0;
	i = 0;
	while (line[i] != ' ' && line[i] != '|' \
		&& !is_str_in_quotes(&line[i], '\'') \
		&& !is_str_in_quotes(&line[i], '\"') \
		&& line[i] != 0)
	{
		append[0] = line[i];
		str = realloc_string(str, append, flag);
		flag = 1;
		i++;
	}
	flag = 0;
	str = is_string_expandable(str, data);
	*dbl_ptr = build_list(args, *dbl_ptr, str, data);
	free(str);
	return (i);
}

static void	parse_line_aux(t_data *data, t_get_line *var)
{
	if (is_str_in_quotes(&var->line[var->i], '\"'))
		var->i += parse_double_quotes(&var->dbl_ptr, &var->line[var->i], \
		var->args, data);
	else if (is_str_in_quotes(&var->line[var->i], '\''))
		var->i += parse_single_quotes(&var->dbl_ptr, &var->line[var->i], \
		var->args, data);
	else if (var->line[var->i] == '|')
	{
		if (var->dbl_ptr[var->args - 1] != NULL)
			var->args++;
		var->i += parse_pipe(&var->dbl_ptr, &var->line[var->i], \
		var->args, data);
		if (var->dbl_ptr[var->args - 1] != NULL)
			var->args++;
	}
	else if (var->line[var->i] == ' ')
	{
		if (var->dbl_ptr[var->args - 1] != NULL)
			var->args++;
		while (var->line[var->i] == ' ')
			var->i++;
	}
	else if (var->line[var->i] != ' ' && var->line[var->i] != '|')
		var->i += parse_chars(&var->dbl_ptr, &var->line[var->i], \
		var->args, data);
}

void	parse_line(t_data *data)
{
	t_get_line	var;

	var.dbl_ptr = malloc(sizeof(char *));
	var.dbl_ptr[0] = NULL;
	var.line = data->line;
	trim_spaces(var.line);
	var.i = 0;
	var.args = 1;
	while (var.line[var.i])
	{
		parse_line_aux(data, &var);
	}
	data->par_line = var.dbl_ptr;
	if (data->par_line && data->par_line[0] && data->par_line[0][0] == 0)
	{
		free(data->par_line[0]);
		data->par_line[0] = malloc(sizeof(char) * 2);
		data->par_line[0][0] = ' ';
		data->par_line[0][1] = 0;
	}
}

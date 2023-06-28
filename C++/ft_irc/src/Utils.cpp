#include "../inc/Utils.hpp"


/**
 * @brief Convert a string to uppercase
 * 
 * @param str: The string to convert
 * 
 * @return std::string: The converted string
*/
std::string std::toupper(const std::string &str)
{
	std::string tmp = const_cast<std::string &>(str);
	for (std::string::iterator it = tmp.begin(); it != tmp.end(); it++)
		*it = std::toupper(*it);
	return tmp;
}


/**
 * @brief Check if the channel name is valid
 * 
 * @note A Channel name is valid if it starts with a #, is less than 50 characters long and only contains alphanumeric characters and #
 * 
 * @param name the channel name
*/
bool isChannelNameValid(const std::string &name)
{
	char _tmp[1024];
	if (name[0] != '#')
	{
		sprintf(_tmp, ERR_BADCHANMASK, "ft_irc", name.c_str(), "Name must start with a #");
		return false;
	}
	else if (name.size() > 50)
	{
		sprintf(_tmp, ERR_BADCHANMASK, "ft_irc", name.c_str(), "Name must be less than 50 characters long");
		return false;
	}
	else if (name.size() < 2)
	{
		sprintf(_tmp, ERR_BADCHANMASK, "ft_irc", name.c_str(), "Name must be more than 1 character long");
		return false;
	}
	else
	{
		for (std::string::const_iterator it = name.begin(); it != name.end(); it++)
		{
			if (isalnum(*it) == false && *it != '#')
				return false;
		}
	}
	return true;
}


/**
 * @brief Check if the command is valid
 * 
 * @param buffer: The command to check
 * 
 * @return true: The command is valid
 * @return false: The command is invalid
*/
bool	isCommand(const std::string &buffer)
{
	const char *commands[] = COMMANDS;
	for (int i = 0; commands[i]; i++)
		if (buffer == commands[i])
			return true;
	return false;
}


/**
 * @brief Read the buffer from a socket
 * 
 * @param socketFd: The socket to read from
 * 
 * @return vector::string: The buffer read
*/
vector::string readBuffer(int socketFd)
{
	char buffer[1024];
	vector::string	ptr;
	std::string		tmp;
	struct timeval	tv;
	tv.tv_sec = 5;
	tv.tv_usec = 0;
	if (setsockopt(socketFd, SOL_SOCKET, SO_RCVTIMEO, (const char*)&tv, sizeof tv) < 0)
	{
		close(socketFd);
		return ptr;
	}
	int	valread = read(socketFd, buffer, 1024);
	int				i = 0;
	if (valread < 0)
	{
		memset(buffer, 0, 1024);

		close(socketFd);
		return ptr;
	}
	while (i < valread)
	{
		if (buffer[i] == '\r' && buffer[i + 1] == '\n')
		{
			if (buffer[i] == '\r' && buffer[i + 1] == '\n')
				i++;
			ptr.push_back(tmp);
			tmp.clear();
		}
		else
			tmp += buffer[i];
		i++;
	}
	ptr.push_back(tmp);
	tv.tv_sec = 0;
	tv.tv_usec = 0;
	setsockopt(socketFd, SOL_SOCKET, SO_RCVTIMEO, (const char*)&tv, sizeof tv);
	return ptr;
}


/**
 * @brief Extract a line from a buffer
 * 
 * @param token: The token to search for
 * @param buffer: The buffer to search in
 * 
 * @return std::string: The line extracted
*/
std::string	extractLine(std::string token, std::vector<std::string> buffer)
{
	std::string line;
	for (vector::iterator::string it = buffer.begin(); it != buffer.end(); it++)
	{
		if (it->find(token) != std::string::npos)
		{
			if (token.length() <= it->length())
				line = it->substr(token.length());
			return line;
		}
	}
	return "";
}


/**
 * @brief removes the spaces from a string (beginning and end)
 * 
 * @param str: the string to trim
*/
std::string removeSpaces(std::string str)
{
	std::string::iterator it;
	for (it = str.begin(); it != str.end() && *it == ' '; it++);
	str.erase(str.begin(), it);
	for (it = str.end() - 1; it != str.begin() && *it == ' '; it--);
	str.erase(it + 1, str.end());
	return str;
}


/**
 * @brief returns the Xth word of a string, starting from 0, 0 is the first word
 * 
 * @param str: the string to trim
*/
std::string getXWord(std::string str, int x)
{
	std::string::iterator startOfTheWord = str.begin();
	std::string::iterator endOfTheWord = str.begin();
	int i = -1;
	while (i < x)
	{
		startOfTheWord = endOfTheWord;
		while (startOfTheWord != str.end() && (*startOfTheWord == ' ' || *startOfTheWord == '\t' || *startOfTheWord == '\r' || *startOfTheWord == '\n'))
			startOfTheWord++;
		endOfTheWord = startOfTheWord;
		while (endOfTheWord != str.end() && *endOfTheWord != ' ' && *endOfTheWord != '\t' && *endOfTheWord != '\r' && *endOfTheWord != '\n')
			endOfTheWord++;
		i++;
	}
	return std::string(startOfTheWord, endOfTheWord);
}


/**
 * @brief Build a vector from a string
 * 
 * @param buffer: The string to build the vector from
 * 
 * @return vector::string: The vector built
*/
vector::string	buildVector(std::string buffer)
{
	vector::string		tokens;
	std::string			tmp;
	std::stringstream	ss(buffer);
	while (std::getline(ss, tmp, ' '))
		tokens.push_back(tmp);
	return tokens;
}


/**
 * @brief Signal handler
 * 
 * @param signum: The signal received
*/
void	sighandler(int signum)
{
	throw SignalException(signum);
}

/**
 * @brief Check if the port is valid
 * 
 * @param arg: The port to check
 * 
 * @return int: The port if valid, -1 otherwise
*/
int	check_port(char *arg)
{
	for (size_t i = 0; i < strlen(arg); i++)
	{
		if (!isdigit(arg[i])) 
		{
			return -1;
		}
	}
	std::stringstream str(arg);
	int x;
	str >> x;
	if (x > 0 && x < 65536)
		return x;
	return -1; 
}
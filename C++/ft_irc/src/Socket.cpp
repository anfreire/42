#include "../inc/Socket.hpp"


/**
 * @brief Constructor
 * 
 * @param port: the port to bind the socket
 * @param password: the password to connect to the server
*/
Socket::Socket(int port, std::string password): _port(port), _password(password) { _server = new Server(password); }


/**
 * @brief Destructor
 * 
 * @note Purges the server. See purge()
 * @note Resets the terminal to canonical mode and echo mode
*/
Socket::~Socket()
{
	purge();
	struct termios term;
	tcgetattr(STDIN_FILENO, &term);
	term.c_lflag |= (ICANON | ECHO);
	tcsetattr(STDIN_FILENO, TCSANOW, &term);
}


/**
 * @brief Purges the server (deletes all the memory allocated)
*/
void	Socket::purge() { _server->purge(); delete _server; }


/**
 * @brief Starts the socket
 * 
 * @details Creates a socket, binds it to the address and port, and starts listening
*/
void	Socket::init()
{
	int opt = 1; 

	for (int i = 0; i < MAX_CLIENTS; i++)
		_clientSocket[i] = 0;
	_sockFd = socket(AF_INET, SOCK_STREAM, 0);
	if (_sockFd < 0)
		throw std::runtime_error("Failed to set create socket");
	else
	{
		if (setsockopt(_sockFd, SOL_SOCKET, SO_REUSEADDR, (char *)&opt, sizeof(opt)) < 0)
			throw std::runtime_error("Failed to set socket options");
	}
	_addr.sin_family = AF_INET;
	_addr.sin_addr.s_addr = INADDR_ANY;
	_addr.sin_port = htons(_port);

	if (bind(_sockFd, (struct sockaddr *)&_addr, sizeof(_addr)) < 0)
		throw std::runtime_error("Failed to bind socket");
	if (listen(_sockFd, MAX_CLIENTS) < 0)
		throw std::runtime_error("Failed to listen");
	getCreationTime();
	std::cout << GREEN << "The server is up and runnig" << std::endl;
	std::cout << BLUE << "Server Size: " << GREEN << MAX_CLIENTS << ENDC << std::endl;
	std::cout << BLUE << "Address: " << GREEN << inet_ntoa(_addr.sin_addr) << ENDC << std::endl;
	std::cout << BLUE << "Port: " << GREEN << _port << ENDC << std::endl << std::endl;
	std::cout << "You can send commands to the clients." << std::endl;
	std::cout << "To send them, press " << ENDC << YELLOW << "CTRL+D" << ENDC << " after typing the command." << std::endl;
	std::cout << "To stop the server, press " << RED << "CTRL+C" << ENDC << std::endl << std::endl;
}


/**
 * @brief Gets the creation time of the server
*/
void	Socket::getCreationTime()
{
	time_t t = time(NULL);
	struct tm *tm = localtime(&t);
	_creationTime = asctime(tm);
}


/**
 * @brief Sends the welcome message to the user
 * 
 * @param user: the user to send the message to
 * 
 * @note The welcome message contains the nickname, username, host and creation time of the server
*/
void	Socket::welcomeMessage(Client *user)
{
	char tmp[1024];
	memset(tmp, 0, 1024);
	sprintf(tmp, RPL_WELCOME, "ft_irc", user->getNickname().c_str(), user->getUsername().c_str());
	send(user->getSocket(), tmp, strlen(tmp), 0);
	getLog()->CommandSent(tmp, user);
	memset(tmp, 0, 1024);
	sprintf(tmp, RPL_YOURHOST, "ft_irc", user->getNickname().c_str(), user->getHost().c_str(), "alpha");
	send(user->getSocket(), tmp, strlen(tmp), 0);
	getLog()->CommandSent(tmp, user);
	memset(tmp, 0, 1024);
	sprintf(tmp, RPL_CREATED, "ft_irc", user->getNickname().c_str(), _creationTime.c_str());
	send(user->getSocket(), tmp, strlen(tmp), 0);
	getLog()->CommandSent(tmp, user);
	memset(tmp, 0, 1024);
	sprintf(tmp, RPL_MYINFO, "ft_irc", user->getNickname().c_str(), "42 Lisboa", "anfreire", "vctrubio", "gjakobss");
	send(user->getSocket(), tmp, strlen(tmp), 0);
	getLog()->CommandSent(tmp, user);
	vector::client clients = _server->getClients();
	for (vector::iterator::client it = clients.begin(); it != clients.end(); it++)
	{
		if ((*it)->getSocket() != user->getSocket())
		{
			memset(tmp, 0, 1024);
			sprintf(tmp, NOTICE_USER_JOINED, "ft_irc", (*it)->getNickname().c_str(), user->getNickname().c_str());
			send((*it)->getSocket(), tmp, strlen(tmp), 0);
			getLog()->CommandSent(tmp, *it);
		}
	}
}


/**
 * @brief Adds a new user to the server
 * 
 * @param fd: the file descriptor of the user
 * 
 * @return true if the user is added, false otherwise
 * 
 * @note The user is added to the server if the nickname, username and password are valid
 * @note Protected against users using the nickname, username or realname "Moulinette"
 * @note Will stay in a loop until the user sends the correct information or disconnects
 * @note It will send the required information after authentication
*/
bool Socket::addUser(int fd)
{
	vector::string	buffer;
	std::string nick = "";
	std::string user = "";
	std::string real = "";
	std::string password = "";
	char	notice[1024];
	bool	bot = false;
	while (nick.empty() || user.empty() || password.empty())
	{
		buffer = readBuffer(fd);
		if (buffer.empty())
			return false;
		getLog()->CommandReceived(buffer, NULL);
		for (vector::iterator::string it = buffer.begin(); it != buffer.end(); it++)
		{
			getLog()->CommandReceived(*it, NULL);
			if (it->find("PRIVMSG ft_irc :identify Moulinette") != std::string::npos)
				bot = true;
			if (it->find("CAP LS") != std::string::npos)
			{
				send(fd, CAP_REPLY_1, strlen(CAP_REPLY_1), 0);
				getLog()->CommandSent(CAP_REPLY_1, NULL);
			}
			else if (it->find("NICK") != std::string::npos)
			{
				nick = getXWord(removeSpaces(extractLine("NICK", buffer)), 0);
				if (_server->isNicknameAvailable(nick) == false)
				{
					std::string errNick = ":localhost 433 * " + nick + " :Nickname is already in use\r\n";
					send(fd, errNick.c_str(), errNick.size(), 0);
					getLog()->CommandSent(errNick, NULL);
					nick = "";
				}
				else if (nick != "")
				{
					if (! bot && nick == "Moulinette")
					{
						memset(notice, 0, 1024);
						sprintf(notice, ERR_NICKNAMEINUSEBOT, "ft_irc", "*", nick.c_str());
						send(fd, notice, strlen(notice), 0);
						getLog()->CommandSent(notice, NULL);
						nick = "";
					}
					else
					{
						memset(notice, 0, 1024);
						sprintf(notice, MSG_NOTICE, "ft_irc", "*", "Nickname accepted");
						send(fd, notice, strlen(notice), 0);
						getLog()->CommandSent(notice, NULL);
					}
				}
			}
			else if (it->find("USER") != std::string::npos)
			{
				user = getXWord(removeSpaces(extractLine("USER", buffer)), 0);
				real = getXWord(removeSpaces(extractLine("USER", buffer)), 3);
				if (real.size() > 1)
					real = real.substr(1);
				if (user != "")
				{
					if (! bot && user == "Moulinette")
					{
						memset(notice, 0, 1024);
						sprintf(notice, ERR_NICKNAMEINUSEBOT, "ft_irc", "*", user.c_str());
						send(fd, notice, strlen(notice), 0);
						getLog()->CommandSent(notice, NULL);
						user = "";
					}
					else
					{
						memset(notice, 0, 1024);
						sprintf(notice, MSG_NOTICE, "ft_irc", "*", "Username accepted");
						send(fd, notice, strlen(notice), 0);
						getLog()->CommandSent(notice, NULL);
					}
				}
				if (real != "")
				{
					if (! bot && real == "Moulinette")
					{
						memset(notice, 0, 1024);
						sprintf(notice, MSG_NOTICE, "ft_irc", "*", "Cannot use this realname");
						send(fd, notice, strlen(notice), 0);
						getLog()->CommandSent(notice, NULL);
						real = "";
					}
					else
					{
						memset(notice, 0, 1024);
						sprintf(notice, MSG_NOTICE, "ft_irc", "*", "Realname accepted");
						send(fd, notice, strlen(notice), 0);
						getLog()->CommandSent(notice, NULL);
					}
				}
			}
			else if (it->find("PASS") != std::string::npos)
			{
				password = getXWord(removeSpaces(extractLine("PASS", buffer)), 0);
				if (_password.compare(password) != 0)
				{
					std::string errPass = ":localhost 464 * :Password incorrect\r\n";
					send(fd, errPass.c_str(), errPass.size(), 0);
					close(fd);
					getLog()->CommandSent(errPass, NULL);
					return false;
				}
				else if (password != "")
				{
					memset(notice, 0, 1024);
					sprintf(notice, MSG_NOTICE, "ft_irc", "*", "Password accepted");
					send(fd, notice, strlen(notice), 0);
					getLog()->CommandSent(notice, NULL);
				}
			}
		}
	}
	Client *newClient = new Client(user, nick, real, fd);
	_server->addClient(newClient);
	std::cout << "New client connected " << "[" << _server->getClients().size() << "] " << GREEN << "+ 1" << ENDC << std::endl;
	std::cout << "Nickname: " << GREEN << nick << ENDC << std::endl;
	std::cout << "Username: " << GREEN << user << ENDC << std::endl;
	std::cout << "Realname: " << GREEN << real << ENDC << std::endl << std::endl;
	if (bot)
	{
		_server->broadcast("Bot entered the server\r\n");
		return true;
	}
	welcomeMessage(newClient);
	CommandArgs args;
	args.user = newClient;
	args.server = _server;
	Lusers lusers(args);
	return true;
}


/**
 * @brief Reads the buffer and calls the function to handle the commands
 * 
 * @param buffer: the buffer to read
 * @param sd: the socket descriptor
*/
void	Socket::init_cmd(std::string buffer, int sd)
{
	_server->setRequestCall(_server->getClient(sd));
	std::string tmp;
	std::stringstream ss(buffer);
	while (std::getline(ss, tmp, '\n'))
	{
		if (tmp.find("\r") != std::string::npos)
			tmp.erase(tmp.find("\r"));
		if (tmp.size() > 0)
		{
			vector::string newBuffer = buildVector(tmp);
			getLog()->CommandReceived(tmp, _server->getClient(sd));
			_server->findCommand(newBuffer);
		}
	}
}


/**
 * @brief Handles the incoming connection
 * 
 * @param addrlen: the length of the address
 * @param tmp_socket: the socket descriptor
 * 
 * @return true if the connection is accepted, false otherwise
*/
bool	Socket::incomingConnection(const int &addrlen, int &tmp_socket)
{
	std::string	password;

	if ((tmp_socket = accept(_sockFd, (struct sockaddr *)&_addr, (socklen_t *)&addrlen)) < 0)
		throw std::runtime_error ("Tmp socket failed");
	if (_server->getClients().size() >= MAX_CLIENTS)
	{
		std::string errMax = ":localhost 421 * :Too many connections (max: " + std::to_string(MAX_CLIENTS) + ")" + "\r\n";
		send(tmp_socket, errMax.c_str(), errMax.size(), 0);
		close(tmp_socket);
		getLog()->CommandSent(errMax, NULL);
		return false;
	}
	if (!addUser(tmp_socket))
	{
		char tmp[1024];
		sprintf(tmp, MSG_NOTICE, "ft_irc", "*", "Connection timed out");
		send(tmp_socket, tmp, strlen(tmp), 0);
		getLog()->CommandSent(tmp, NULL);
		close(tmp_socket);
		return false;
	}
	for (int i = 0; i < MAX_CLIENTS; i++)
	{
		if (_clientSocket[i] == 0)
		{
			_clientSocket[i] = tmp_socket;
			break;
		}
	}
	return true;
}


/**
 * @brief Parses the buffer of the clients
 * 
 * @param addrlen: the length of the address
 * 
 * @return true if the buffer is parsed, false if the client is disconnected
*/
bool Socket::parseClientsBuffer(const int &addrlen, int &sd)
{
	int valread;
	char buffer[265];

	for (int i = 0; i < MAX_CLIENTS; i++)
	{
		sd = _clientSocket[i];
		if (FD_ISSET(sd, &_readFds))
		{
			if ((valread = read(sd, buffer, 254)) == 0)
			{
				getpeername(sd, (struct sockaddr *)&_addr, (socklen_t *)&addrlen);
				Client *user = _server->getClient(sd);
				vector::channel channels = _server->getChannels();
				vector::iterator::channel itChannel = channels.begin();
				while (itChannel != channels.end())
				{
					if ((*itChannel)->isClient(user))
					{
						if ((*itChannel)->isOperator(user))
							(*itChannel)->demoteClient(user);
						(*itChannel)->rmClient(user);
					}
					itChannel++;
				}
				char tmp[1024];
				sprintf(tmp, MSG_NOTICE, "ft_irc", "*", std::to_string(user->getNickname() + " has quit").c_str());
				std::cout << "Client disconnected " << "[" << _server->getClients().size() << "] " << RED << "- 1" << ENDC << std::endl;
				std::cout << "Nickname: " << RED << user->getNickname() << ENDC << std::endl;
				std::cout << "Username: " << RED << user->getUsername() << ENDC << std::endl;
				std::cout << "Realname: " << RED << user->getRealname() << ENDC << std::endl << std::endl;
				_server->rmClient(_server->getClient(sd));
				close(sd);
				_clientSocket[i] = 0;
				_server->broadcast(tmp);
			}
			else
			{
				if (valread <= 0)
					return false;
				buffer[valread] = '\0';
				std::string trimBuffer = buffer;
				for (int x = 0; trimBuffer[x] != '\0'; x++)
				{
					if (trimBuffer[x] == '\r')
					{
						trimBuffer.resize(valread - 2);
						break ;
					}
					if (trimBuffer[x] == '\n')
					{
						trimBuffer.resize(valread - 1);
						break ;
					}

				}
				init_cmd(trimBuffer, sd);
			}
		}
	}
	return true;
}


/**
 * @brief Parses the buffer of the server
 * 
 * @param flag: a flag to check if the server already typed "-> " to indicate that the user can type a command
 * 
 * @note The server will send the command to all the clients
*/
void	Socket::parseServerBuffer(bool &flag)
{
	char	c;
	std::string buffer;

	if (_server->getClients().size() > 0)
	{
		buffer.clear();
		if (flag == false)
		{
			write(STDOUT_FILENO, "-> ", 3);
			flag = true;
		}
		while (read(STDIN_FILENO, &c, 1) > 0 && c != 4)
		{
			if (c == '\b')
				continue ;
			write(STDOUT_FILENO, &c, 1);
			buffer += c;
		}
		if (!buffer.empty())
		{
			buffer += "\r\n";
			_server->broadcast(buffer);
			std::cout << std::endl << std::endl;
			flag = false;
		}
	}
}


/**
 * @brief Runs the server
 * 
 * @note The server runs in an infinite loop
 * @note It will stop when the user presses CTRL+C
 * @note sets the terminal to non-canonical mode, so that the user can type commands without pressing enter
 * @note sets the terminal to non-echo mode, so that the user can type commands without seeing them
 * @note maps the EOF character to CTRL+D
 * @note The server will check for activity in the sockets
 * @note The server will check for activity in the stdin
*/
void Socket::run()
{
    int sd, tmp_socket, addrlen = sizeof(_addr);
	bool	stdin_read, flag = false;
	struct termios term;
	tcgetattr(STDIN_FILENO, &term);
	term.c_lflag &= ~(ICANON | ECHO);
	term.c_cc[VEOF] = 4;
	tcsetattr(STDIN_FILENO, TCSANOW, &term);
    while (42)
    {
		stdin_read = false;
        FD_ZERO(&_readFds);
        FD_SET(_sockFd, &_readFds);
		FD_SET(STDIN_FILENO, &_readFds);
        _maxSd = _sockFd;
        for (int i = 0; i < MAX_CLIENTS; i++)
        {
            sd = _clientSocket[i];
            if (sd > 0 && sd < FD_SETSIZE)
                FD_SET(sd, &_readFds);
            if (sd > _maxSd)
                _maxSd = sd;
        }
        _activity = select(_maxSd + 1, &_readFds, NULL, NULL, NULL);
        if ((_activity < 0))
            throw std::runtime_error ("Select error");
        if (FD_ISSET(_sockFd, &_readFds))
        {
            if (!incomingConnection(addrlen, tmp_socket))
				continue;
        }
        if (FD_ISSET(STDIN_FILENO, &_readFds))
        {
			parseServerBuffer(flag);
			stdin_read = true;
        }
        if (stdin_read || !parseClientsBuffer(addrlen, sd))
            continue;
        _server->cleanEmptyChannels();
        _server->adjustOperators();
    }
}
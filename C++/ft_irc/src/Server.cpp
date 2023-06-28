#include "../inc/Server.hpp"


/**
 * @brief Construct a new Server:: Server object
 * 
 * @param password: The password of the server
 * 
 * @note Sets the bot to false by default because the bot is not a server.
*/
Server::Server(std::string password) : _bot(false), _password(password) { }


/**
 * @brief Set the bot presence
 * 
 * @param bot: The bot presence
*/
void	Server::setBot(bool bot) {_bot = bot; }


/**
 * @brief Get the bot presence
 * 
 * @return bool: The bot presence
*/
bool   Server::getBot() const { return _bot; }


/**
 * @brief Sets the client that sent the command.
 * 
 * @param client: The client that sent the command.
*/
void Server::setRequestCall(Client *client) { _requestCall = client; }


/**
 * @brief Returns the client that sent the command.
 * 
 * @return Client*: The client that sent the command.
*/
Client *Server::getRequestCall() const { return _requestCall; }


/**
 * @brief Returns a vector of all the clients of the server.
 * 
 * @return vector::client: A vector of all the clients of the server.
*/
vector::client Server::getClients() const { return _clients; }


/**
 * @brief Returns a vector of all the channels of the server.
 * 
 * @return vector::channel: A vector of all the channels of the server.
*/
vector::channel	Server::getChannels() const { return _channels; }


/**
 * @brief Returns the password of the server.
 * 
 * @return const std::string&: The password of the server.
*/
const std::string &Server::getPassword() const { return _password; }


/**
 * @brief Adds a client to the server.
 * 
 * @param client: The client to add.
 * 
 * @note If the client is already in the server, it will be deleted because thi fucntion is only call from the Socket::addUser() function, that creates a new client.
*/
void	Server::addClient(Client *client)
{
	if (client == NULL)
		return ;
	for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
	{
		if ((*it)->getSocket() == client->getSocket())
		{
			delete client;
			return ;
		}
	}
	_clients.push_back(client);
}


/**
 * @brief Removes a client from the server.
 * 
 * @param client: The client to remove.
 * 
 * @note If the client is not in the server, nothing will happen.
*/
void	Server::rmClient(Client *client)
{
	if (client == NULL)
		return ;
	for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
	{
		if ((*it)->getSocket() == client->getSocket())
		{
			Client *tmp = *it;
			_clients.erase(it);
			delete tmp;
			return ;
		}
	}
}


/**
 * @brief Adds a channel to the server.
 * 
 * @param channel: The channel to add.
 * 
 * @note If the channel is already in the server, it will be deleted because this function is only call from the Join command, that creates a new channel.
*/
void	Server::addChannel(Channel *channel)
{
	if (channel == NULL)
		return ;
	for (vector::iterator::channel it = _channels.begin(); it != _channels.end(); it++)
	{
		if ((*it)->getName() == channel->getName())
		{
			delete channel;
			return ;
		}
	}
	_channels.push_back(channel);
}


/**
 * @brief Removes a channel from the server.
 * 
 * @param channel: The channel to remove.
 * 
 * @note If the channel is not in the server, nothing will happen.
*/
void	Server::rmChannel(Channel *channel)
{
	if (channel == NULL)
		return ;
	for (vector::iterator::channel it = _channels.begin(); it != _channels.end(); it++)
	{
		if ((*it)->getName() == channel->getName())
		{
			Channel *tmp = *it;
			_channels.erase(it);
			delete tmp;
			return ;
		}
	}
}

/**
 * @brief Free all the memory allocated by the server. [ Server::addClient() && Server::addChannel() ]
 * 
 * @note This function is called when the server is closed by the Socket destructor.
*/
void	Server::purge()
{
	if (!_clients.empty())
	{
		for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
			delete *it;
	}
	if (!_channels.empty())
	{
		for (vector::iterator::channel it = _channels.begin(); it != _channels.end(); it++)
			delete *it;
	}
}


/**
 * @brief Returns a pointer to the client with the fd passed as argument, if it exists.
 * 
 * @param fd: The fd of the client to return.
 * 
 * @return Client*: A pointer to the client with the fd passed as argument, if it exists. Otherwise, returns NULL.
*/
Client	*Server::getClient(int fd)
{
	if (!_clients.empty())
	{
		for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
			if (fd == (*it)->getSocket())
				return (*it);
	}
	return NULL;

}


/**
 * @brief Returns a pointer to the client with the nickname passed as argument, if it exists.
 * 
 * @param nickname: The nickname of the client to return.
 * 
 * @return Client*: A pointer to the client with the nickname passed as argument, if it exists. Otherwise, returns NULL.
*/
Client	*Server::getClient(const std::string &nickname)
{
	if (!_clients.empty())
	{
		for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
			if (nickname == (*it)->getNickname())
				return (*it);
	}
	return NULL;
}

/**
 * @brief Returns a pointer to the channel with the name passed as argument, if it exists.
 * 
 * @param name: The name of the channel to return.
 * 
 * @return Channel*: A pointer to the channel with the name passed as argument, if it exists. Otherwise, returns NULL.
*/
Channel	*Server::getChannel(const std::string &name)
{
	if (!_channels.empty())
	{
		for (vector::iterator::channel it = _channels.begin(); it != _channels.end(); it++)
			if (name == (*it)->getName())
				return (*it);
	}
	return NULL;
}

/**
 * @brief Cleans the channels that have no clients.
*/
void	Server::cleanEmptyChannels()
{
	if (!_channels.empty())
	{
		for (vector::iterator::channel it = _channels.begin(); it != _channels.end(); it++)
		{
			if (_channels.empty())
				return ;
			if ((*it)->getClients().empty())
			{
				Channel *tmp = *it;
				std::cout << "Channel destroyed: [" << getChannels().size() << "] " << RED << "- 1" << ENDC << std::endl;
				std::cout << "Name: " << RED << tmp->getName() << ENDC << std::endl;
				std::cout << "Topic: " << RED << tmp->getTopic() << ENDC << std::endl << std::endl;
				_channels.erase(it);
				delete tmp;
				it = _channels.begin();
			}
		}
	}
}


/**
 * @brief Adjusts the operators of the channels.
 * 
 * @note If a channel has no operator and has at least one client, the first client of the channel will be promoted to operator.
*/
void	Server::adjustOperators()
{
	if (!_channels.empty())
	{
		for (vector::iterator::channel it = _channels.begin(); it != _channels.end(); it++)
		{
			if (!(*it)->hasOperator() && (*it)->getClients().size() > 0) 
			{
				char tmp[1024];
				memset(tmp, 0, 1024);
				map::client clients = (*it)->getClients();
				map::iterator::client it2 = clients.begin();
				Client *client = it2->first;
				sprintf(tmp, MSG_MODE, "ft_irc", (*it)->getName().c_str(), "+o", client->getNickname().c_str());
				(*it)->promoteClient(client);
				(*it)->broadcast(tmp);
				Names::broadcast((*it));
				break ;
			}
		
		} 
	}
}


/**
 * @brief Broadcasts a message to all the clients of the server.
 * 
 * @param msg: The message to broadcast.
*/
void	Server::broadcast(const std::string &msg)
{
	if (!_clients.empty())
	{
		for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
		{
			send((*it)->getSocket(), msg.c_str(), msg.size(), 0);
			getLog()->CommandSent(msg, (*it));
		}
	}
}

/**
 * @brief Finds the command to execute and executes it.
 * 
 * @param str: The command to execute.
 * 
 * @note Parses the command and sets the Command Args that will be used by The Command Classes.
 * @note If the command is not found, the server will send an error message to the client.
 */
void Server::findCommand(vector::string str)
{
	if (str.empty())
		return ;
	CommandArgs args;
	vector::iterator::string it = str.begin();
	it = str.begin();
	args.user = _requestCall;
	args.server = this;
	args.buffer = str;
	*it = std::toupper(*it);
	if (*it == "NICK")
		Nick cmd(args);
	else if (*it == "USER")
		User cmd(args);
	else if (*it == "JOIN")
		Join cmd(args);
	else if (*it == "PART")
		Part cmd(args);
	else if (*it == "NAMES")
		Names cmd(args);
	else if (*it == "LIST")
		List cmd(args);
	else if (*it == "TOPIC")
		Topic cmd(args);
	else if (*it == "INVITE")
		Invite cmd(args);
	else if (*it == "KICK")
		Kick cmd(args);
	else if (*it == "PRIVMSG")
		Privmsg cmd(args);
	else if (*it == "PING")
		Ping cmd(args);
	else if (*it == "WHO")
		Who cmd(args);
	else if (*it == "MODE")
		Mode cmd(args);
	else if (*it == "QUIT")
		Quit cmd(args);
	else if (*it == "WHOIS")
		Whois cmd(args);
	else if (*it == "LUSERS")
		Lusers cmd(args);
	else if (*it == "NOTICE")
		Notice cmd(args);
	else if (*it == "CAP" && it + 1 != str.end() && *(it + 1) != "END")
		CAP cmd(args);
	else if (*it == "CAP")
		return ;
	else
	{
		char _tmp[1024];
		sprintf(_tmp, ERR_UNKNOWNCOMMAND, _requestCall->getNickname().c_str(), _requestCall->getNickname().c_str(), (*it).c_str());
		send(_requestCall->getSocket(), _tmp, strlen(_tmp), 0);
	}
}


/**
 * @brief Checks if the nickname passed as argument is available.
 * 
 * @param nickname: The nickname to check.
 * 
 * @return bool: True if the nickname is available, false otherwise.
*/
bool	Server::isNicknameAvailable(const std::string &nickname)
{
	for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
		if ((*it)->getNickname() == nickname)
			return (false);
	return (true);
}


/**
 * @brief Checks if the channel name passed as argument is available.
 * 
 * @param name: The channel name to check.
 * 
 * @return bool: True if the channel name is available, false otherwise.
*/
bool	Server::isChannelNameAvailable(const std::string &name)
{
	for (vector::iterator::channel it = _channels.begin(); it != _channels.end(); it++)
		if ((*it)->getName() == name)
			return (false);
	return (true);
}


/**
 * @brief Returns a vector of clients that are not in any channel.
 * 
 * @return vector::client: A vector of clients that are not in any channel.
 * 
 * @note It will only be used in the Names class.
*/
vector::client Server::getUsersWithoutChannels()
{
	vector::client users;
	for (vector::iterator::client it = _clients.begin(); it != _clients.end(); it++)
	{
		bool found = false;
		for (vector::iterator::channel it2 = _channels.begin(); it2 != _channels.end(); it2++)
		{
			if ((*it2)->getClients().find(*it) != (*it2)->getClients().end())
			{
				found = true;
				break ;
			}
		}
		if (!found)
			users.push_back(*it);
	}
	return (users);
}
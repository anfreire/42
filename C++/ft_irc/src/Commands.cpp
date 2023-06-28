#include "../inc/Commands.hpp"


/**
 * @brief Send a message to a user
 * 
 * @note Write the message in the log
*/
void    Command::sendMsg(Client *user, const std::string &msg)
{
	send(user->getSocket(), msg.c_str(), msg.length(), 0);
	getLog()->CommandSent(msg, user);
}


/**
 * @brief Constructor of the Nick class
 * 
 * @note Change the nickname of the user
 * @note Protected against not enough parameters
 * @note Protected against invalid client
 * @note Protected against nickname already taken
 * @note Protected against reserved nickname "Moulinette"
*/
Nick::Nick(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "NICK");
		sendMsg(args.user, _tmp);
		return;
	}
	vector::client clients = args.server->getClients();
	for (vector::iterator::client it2 = clients.begin(); it2 != clients.end(); it2++)
	{
		if (*it == (*it2)->getNickname() && args.user != (*it2))
		{
			sprintf(_tmp, ERR_NICKNAMEINUSE, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
	}
	if ((*it) == "Moulinette")
	{
		sprintf(_tmp, ERR_NICKNAMEINUSEBOT, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	sprintf(_tmp, MSG_NICK, (*it).c_str(), (*it).c_str());
	args.user->setNickname(*it);
	sendMsg(args.user, _tmp);
}


/**
 * @brief Constructor of the User class
 * 
 * @note Change the username of the user
 * @note Protected against not enough parameters
 * @note Protected against invalid client
 * @note Protected against reserved username "Moulinette"
*/
User::User(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "USER");
		sendMsg(args.user, _tmp);
		return;
	}
	if (*it == "Moulinette")
	{
		sprintf(_tmp, ERR_NICKNAMEINUSEBOT, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	sprintf(_tmp, MSG_USER, args.user->getNickname().c_str(), (*it).c_str());
	sendMsg(args.user, _tmp);
}


/**
 * @brief Constructor of the Join class
 * 
 * @note Join a channel
 * @note If the channel doesn't exist, create it
 * @note If the channel exists and the user is already in it, send an error
 * @note Protected against already taken channel name, if the channel is being created
 * @note Protected against not enough parameters
 * @note Protected against invalid channel name
 * @note Protected against banned user, if they don't have an invite
 * @note Protected against invite only channel, if they don't have an invite
 * @note Protected against channel with a password, if they don't provide the password or if the password is incorrect
 * @note Protected against channel with a user limit, if the limit is reached
*/
Join::Join(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "JOIN");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string channelName = *it;
	if (isChannelNameValid(channelName) == false)
	{
		sprintf(_tmp, ERR_BADCHANMASK, "ft_irc", channelName.c_str(), "Invalid channel name");
		sendMsg(args.user, _tmp);
		return;
	}
	Channel *channel = args.server->getChannel(channelName);
	if (channel == NULL)
	{
		if (args.server->isChannelNameAvailable(channelName) == false)
		{
			sprintf(_tmp, ERR_CHANAMEINUSE, "ft_irc", args.user->getNickname().c_str(), channelName.c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel = new Channel(channelName);
		args.server->addChannel(channel);
		channel->addClient(args.user);
		channel->promoteClient(args.user);
		if (args.user->getNickname() == "Moulinette")
		{
			channel->setTopic("Moulinette Parlor");
			memset(_tmp, 0, 1024);
			sprintf(_tmp, MSG_TOPIC, args.user->getNickname().c_str(), channel->getName().c_str(), channel->getTopic().c_str());
			channel->broadcast(_tmp);
			Names::broadcast(channel);
		}
		Names::broadcast(channel);
		sprintf(_tmp, MSG_JOIN, args.user->getNickname().c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		std::cout << "New channel created: [" << args.server->getChannels().size() - 1 << "] " << GREEN << "+ 1" << ENDC << std::endl;
		std::cout << "Name: " << GREEN << channel->getName() << ENDC << std::endl;
		std::cout << "Topic: " << GREEN << channel->getTopic() << ENDC << std::endl << std::endl;
		return;
	}
	if (args.user->getNickname() == "Moulinette")
	{
		channel->addClient(args.user);
		map::client clients = channel->getClients();
		for (map::client::iterator it = clients.begin(); it != clients.end(); it++)
		{
			char tmp[1024];
			channel->demoteClient(it->first);
			memset(tmp, 0, 1024);
			sprintf(tmp, MSG_NOTICE, "ft_irc", "*", "You have been demoted, Bot is entering and is the only operator in this channel");
			sendMsg(it->first, tmp);
		}
		channel->promoteClient(args.user);
		channel->setTopic("Moulinette Parlor");
		memset(_tmp, 0, 1024);
		sprintf(_tmp, MSG_TOPIC, args.user->getNickname().c_str(), channel->getName().c_str(), channel->getTopic().c_str());
		channel->broadcast(_tmp);
		Names::broadcast(channel);
		memset(_tmp, 0, 1024);
		channel->setTopicRestricted(true);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "+t", "Only i can set the topic");
		channel->broadcast(_tmp);
		memset(_tmp, 0, 1024);
		sprintf(_tmp, MSG_JOIN, args.user->getNickname().c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	else if (channel->isClient(args.user))
	{
		sprintf(_tmp, ERR_USERONCHANNEL, "ft_irc", args.user->getNickname().c_str(), (channelName).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	else if (channel->isBanned(args.user))
	{
		if (channel->isInvited(args.user))
		{
			channel->uninvite(args.user);
			channel->addClient(args.user);
			sprintf(_tmp, MSG_JOIN, args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		sprintf(_tmp, ERR_BANNEDFROMCHAN, "ft_irc", args.user->getNickname().c_str(), (channelName).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	if (channel->isInviteOnly())
	{
		if (channel->isInvited(args.user) == false)
		{
			sprintf(_tmp, ERR_INVITEONLYCHAN, "ft_irc", args.user->getNickname().c_str(), (channelName).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else
			channel->uninvite(args.user);
			// The user will be added to the channel at the end of the function. needs to pass the checks below
	}
	if (channel->hasUserLimit())
	{
		if (channel->getClients().size() >= channel->getUserLimit())
		{
			sprintf(_tmp, ERR_CHANNELISFULL, "ft_irc", args.user->getNickname().c_str(), (channelName).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
	}
	if (channel->hasPassword())
	{
		it++;
		if (it == args.buffer.end())
		{
			sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), (channelName).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		std::string password = *it;
		if (password != channel->getPassword())
		{
			sprintf(_tmp, ERR_BADCHANNELKEY, "ft_irc", args.user->getNickname().c_str(), (channelName).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
	}
	channel->addClient(args.user);
	memset(_tmp, 0, 1024);
	sprintf(_tmp, MSG_JOIN, args.user->getNickname().c_str(), channel->getName().c_str());
	channel->broadcast(_tmp);
	Names::broadcast(channel);
}


/**
 * @brief Constructor of the Part class
 * 
 * @note Leave a channel
 * @note Protected against not enough parameters
 * @note Protected against channel not existing
 * @note Protected against not being in the channel
*/
Part::Part(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "PART");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string channel_ = *it;
	Channel *channel = args.server->getChannel(channel_);
	if (channel == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), channel_.c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	if (channel->isClient(args.user) == false)
	{
		sprintf(_tmp, ERR_NOTONCHANNEL, "ft_irc", args.user->getNickname().c_str(), channel_.c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	channel->rmClient(args.user);
	sprintf(_tmp, MSG_PART, args.user->getNickname().c_str(), channel->getName().c_str());
	sendMsg(args.user, _tmp);
	channel->broadcast(_tmp);
}


/**
 * @brief Constructor of the Names class
 * 
 * @note Send the list of users in a channel
 * @note Protected against recieving channel name and server name
*/
Names::Names(CommandArgs args)
{
	std::string channelName = "";
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it != args.buffer.end() && *it != "ft_irc")
	{
		channelName = *it;
		Channel *channel = args.server->getChannel(channelName);
		if (channel == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), channelName.c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else
		{
			std::string users = "";
			map::client clients = channel->getClients();
			for (map::iterator::client it = clients.begin(); it != clients.end(); it++)
			{
				if (channel->isOperator(it->first))
					users += "@";
				users += it->first->getNickname() + " ";
			}
			memset(_tmp, 0, 1024);
			sprintf(_tmp, RPL_NAMREPLY, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str(), users.c_str());
			sendMsg(args.user, _tmp);
			memset(_tmp, 0, 1024);
			sprintf(_tmp, RPL_ENDOFNAMES, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
	}
	else
	{
		vector::channel channels = args.server->getChannels();
		for (vector::iterator::channel it = channels.begin(); it != channels.end(); it++)
		{
			Channel *channel = *it;
			std::string users = "";
			map::client clients = channel->getClients();
			for (map::iterator::client it = clients.begin(); it != clients.end(); it++)
			{
				if (channel->isOperator(it->first))
					users += "@";
				users += it->first->getNickname() + " ";
			}
			memset(_tmp, 0, 1024);
			sprintf(_tmp, RPL_NAMREPLY, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str(), users.c_str());
			sendMsg(args.user, _tmp);
		}
		memset(_tmp, 0, 1024);
		sprintf(_tmp, RPL_ENDOFNAMES, "ft_irc", args.user->getNickname().c_str(), "*");
		sendMsg(args.user, _tmp);
		vector::client clients = args.server->getUsersWithoutChannels();
		std::string users = "";
		for (vector::iterator::client it = clients.begin(); it != clients.end(); it++)
		{
			users += (*it)->getNickname() + " ";
		}
		memset(_tmp, 0, 1024);
		sprintf(_tmp, RPL_NAMREPLY, "ft_irc", args.user->getNickname().c_str(), "*", users.c_str());
		sendMsg(args.user, _tmp);
		memset(_tmp, 0, 1024);
		sprintf(_tmp, RPL_ENDOFNAMES, "ft_irc", args.user->getNickname().c_str(), "*");
		sendMsg(args.user, _tmp);
	}
}


/**
 * @brief Sends the NAMES command to all user on the channel
 * 
 * @param channel The channel to broadcast the command to
*/
void Names::broadcast(Channel *channel)
{
	char _tmp[1024];
	std::string users = "";
	map::client clients = channel->getClients();
	for (map::iterator::client it = clients.begin(); it != clients.end(); it++)
	{
		if (channel->isOperator(it->first))
			users += "@";
		users += it->first->getNickname() + " ";
	}
	for (map::iterator::client it = clients.begin(); it != clients.end(); it++)
	{
		memset(_tmp, 0, 1024);
		sprintf(_tmp, RPL_NAMREPLY, "ft_irc", it->first->getNickname().c_str(), channel->getName().c_str(), users.c_str());
		send(it->first->getSocket(), _tmp, strlen(_tmp), 0);
		getLog()->CommandSent(_tmp, it->first);
		memset(_tmp, 0, 1024);
		sprintf(_tmp, RPL_ENDOFNAMES, "ft_irc", it->first->getNickname().c_str(), channel->getName().c_str());
		send(it->first->getSocket(), _tmp, strlen(_tmp), 0);
		getLog()->CommandSent(_tmp, it->first);
	}
}


/**
 * @brief Constructor of the List class
 * 
 * @note Send the list of channels
*/
List::List(CommandArgs args)
{
	vector::channel channels = args.server->getChannels();
	sprintf(_tmp, RPL_LISTSTART, "ft_irc", args.user->getNickname().c_str());
	sendMsg(args.user, _tmp);
	for (vector::iterator::channel it = channels.begin(); it != channels.end(); it++)
	{
		Channel *channel = *it;
		memset(_tmp, 0, 1024);
		sprintf(_tmp, RPL_LIST, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str(), static_cast<int>(channel->getClients().size()), channel->getTopic().c_str());
		sendMsg(args.user, _tmp);
	}
	memset(_tmp, 0, 1024);
	sprintf(_tmp, RPL_LISTEND, "ft_irc", args.user->getNickname().c_str());
	sendMsg(args.user, _tmp);
}


/**
 * @brief Constructor of the Privmsg class
 * 
 * @note Send a message to a user or a channel
 * @note Protected against not enough parameters
 * @note Protected against invalid channel
 * @note Protected against invalid user
*/
Privmsg::Privmsg(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "PRIVMSG");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string to = *it;
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "PRIVMSG");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string message = *it;
	if (message.size() > 1)
		message = message.substr(1, message.size() - 1);
	it++;
	while (it != args.buffer.end())
	{
		message += " " + *it;
		it++;
	}
	if (to[0] == '#')
	{
		Channel *channel = args.server->getChannel(to);
		if (channel == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), to.c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		map::client clients = channel->getClients();
		for (map::iterator::client it = clients.begin(); it != clients.end(); it++)
		{
			if ((*it).first == args.user)
				continue;
			memset(_tmp, 0, 1024);
			sprintf(_tmp, MSG_PRIVMSG, args.user->getNickname().c_str(), channel->getName().c_str(), message.c_str());
			sendMsg((*it).first, _tmp);
		}
	}
	else
	{
		Client *client = args.server->getClient(to);
		if (client == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), to.c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		sprintf(_tmp, MSG_PRIVMSG, args.user->getNickname().c_str(), to.c_str(), message.c_str());
		sendMsg(client, _tmp);
	}
}


/**
 * @brief Constructor of the Who class
 * 
 * @note Send the list of users in a channel
 * @note Protected against not enough parameters
 * @note Protected against invalid channel
*/
Who::Who(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "WHO");
		sendMsg(args.user, _tmp);
		return;
	}
	Channel *channel = args.server->getChannel(*it);
	if (channel == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*args.buffer.begin()).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	map::client clients = channel->getClients();
	for (map::iterator::client it = clients.begin(); it != clients.end(); it++)
	{
		memset(_tmp, 0, 1024);
		sprintf(_tmp, MSG_WHO, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str(), (*it).first->getNickname().c_str(), (*it).first->getUsername().c_str(), (*it).first->getHost().c_str(), (*it).first->getRealname().c_str());
		sendMsg(args.user, _tmp);
	}
		
}


/**
 * @brief Constructor of the Mode class
 * 
 * @note Change the mode of a channel
 * @note Protected against not enough parameters
 * @note Protected against invalid channel
 * @note Protected against invalid user
 * @note Protected against not being an operator
 * @note Protected against already having the mode
 * @note Protected against invalid mode argument
 * @note Protected against invalid mode
*/
Mode::Mode(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "MODE");
		sendMsg(args.user, _tmp);
		return;
	}
	Channel *channel = args.server->getChannel(*it);
	if (channel == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, RPL_CHANNELMODEIS, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str(), "+n");
		sendMsg(args.user, _tmp);
		return;
	}
	else if (channel->isOperator(args.user) == false)
	{
		sprintf(_tmp, ERR_NOTCHNLOPER, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	std::string mode = *it;
	Client *client;
	if (mode == "+i")
	{
		if (channel->isInviteOnly() == true)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setInviteOnly(true);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "+i", "");
		channel->broadcast(_tmp);
	}
	else if (mode == "-i")
	{
		if (channel->isInviteOnly() == false)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setInviteOnly(false);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "-i", "");
		channel->broadcast(_tmp);
	}
	else if (mode == "+t")
	{
		if (channel->isTopicRestricted() == true)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setTopicRestricted(true);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "+t", "");
		channel->broadcast(_tmp);
	}
	else if (mode == "-t")
	{
		if (channel->isTopicRestricted() == false)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setTopicRestricted(false);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "-t", "");
		channel->broadcast(_tmp);
	}
	else if (mode == "+k")
	{
		it++;
		if (it == args.buffer.end())
		{
			sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setPassword(true, *it);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "+k", (*it).c_str());
		channel->broadcast(_tmp);
	}
	else if (mode == "-k")
	{
		if (channel->hasPassword() == false)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setPassword(false, "");
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "-k", "");
		channel->broadcast(_tmp);
	}
	else if (mode == "+l")
	{
		it++;
		if (it == args.buffer.end())
		{
			sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		int userLimit = atoi((*it).c_str());
		if (userLimit <= 0 || userLimit > 8)
		{
			sprintf(_tmp, ERR_BADCHANMASK, "ft_irc", channel->getName().c_str(), "Invalid user limit");
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setUserLimit(true, atoi((*it).c_str()));
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "+l", std::to_string(channel->getUserLimit()).c_str());
		channel->broadcast(_tmp);
	}
	else if (mode == "-l")
	{
		if (channel->hasUserLimit() == false)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->setUserLimit(false, 0);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "-l", args.user->getNickname().c_str());
		channel->broadcast(_tmp);
	}
	else if (mode == "+o")
	{
		it++;
		if (it == args.buffer.end())
		{
			sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		client = args.server->getClient(*it);
		if (client == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else if (channel->isClient(client) == false)
		{
			sprintf(_tmp, ERR_USERNOTINCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*it).c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else if (channel->isOperator(client) == true)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		channel->promoteClient(client);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "+o", client->getNickname().c_str());
		channel->broadcast(_tmp);
	}
	else if (mode == "-o")
	{
		it++;
		if (it == args.buffer.end())
		{
			sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		client = args.server->getClient(*it);
		if (client == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else if (channel->isClient(client) == false)
		{
			sprintf(_tmp, ERR_USERNOTINCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*it).c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else if (channel->isOperator(client) == false)
		{
			
			sendMsg(args.user, _tmp);
			return;
		}
		channel->demoteClient(client);
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "-o", client->getNickname().c_str());
		channel->broadcast(_tmp);
	}
	else if (mode == "+b")
	{
		it++;
		if (it == args.buffer.end())
		{
			sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		client = args.server->getClient(*it);
		if (client == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else if (channel->isClient(client) == false)
		{
			sprintf(_tmp, ERR_USERNOTINCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*it).c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else if (channel->isBanned(client) == true)
		{
			sprintf(_tmp, ERR_KEYSET, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "+b", client->getNickname().c_str());
		channel->broadcast(_tmp);
		memset(_tmp, 0, 1024);
		sprintf(_tmp, MSG_KICK, args.user->getNickname().c_str(), channel->getName().c_str(), client->getNickname().c_str(), "Banned from channel");
		channel->broadcast(_tmp);
		memset(_tmp, 0, 1024);
		sprintf(_tmp, ":%s QUIT :%s", client->getNickname().c_str(), "Banned from channel");
		sendMsg(client, _tmp);
		Names::broadcast(channel);
		channel->ban(client);
		channel->rmClient(client);
		
	}
	else if (mode == "-b")
	{
		it++;
		if (it == args.buffer.end())
		{
			sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		client = args.server->getClient(*it);
		if (client == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		else if (channel->isBanned(client) == false)
		{
			
			sendMsg(args.user, _tmp);
			return;
		}
		sprintf(_tmp, MSG_MODE, args.user->getNickname().c_str(), channel->getName().c_str(), "-b", client->getNickname().c_str());
		channel->broadcast(_tmp);
		channel->unban(client);
	}
	else
	{
		sprintf(_tmp, ERR_UNKNOWNMODE, "ft_irc", args.user->getNickname().c_str(), mode.c_str());
		sendMsg(args.user, _tmp);
	}
}


/**
 * @brief Constructor of the Ping class
 * 
 * @note Respond to a ping
 * @note Protected against not enough parameters
*/
Ping::Ping(CommandArgs args)
{
	if (args.buffer.size() < 2)
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "PING");
		sendMsg(args.user, _tmp);
		return;
	}
	sprintf(_tmp, MSG_PONG, args.buffer[1].c_str());
	sendMsg(args.user, _tmp);
}


/**
 * @brief Constructor of the Kick class
 * 
 * @note Kick a user from a channel
 * @note Protected against not enough parameters
 * @note Protected against invalid channel
 * @note Protected against invalid user
 * @note Protected against not being an operator
 * @note Protected against not being on the channel
*/
Kick::Kick(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "KICK");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string channelName = *it;
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "KICK");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string toKick = *it;
	std::string reason = "";
	if (it != args.buffer.end())
		reason = *it;
	Client *client = args.server->getClient(toKick);
	if (client == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), toKick.c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	else if (client == args.user)
	{
		sprintf(_tmp, ERR_CANTKILLSERVER, "ft_irc", args.user->getNickname().c_str(), toKick.c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	Channel *channel = args.server->getChannel(channelName);
	if (channel == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), channelName.c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	if (channel->isOperator(args.user) == false)
	{
		sprintf(_tmp, ERR_NOTCHNLOPER, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	else if (channel->isClient(client) == false)
	{
		sprintf(_tmp, ERR_USERNOTINCHANNEL, "ft_irc", args.user->getNickname().c_str(), toKick.c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	sprintf(_tmp, MSG_KICK, args.user->getNickname().c_str(), channel->getName().c_str(), toKick.c_str(), reason.c_str());
	channel->broadcast(_tmp);
	channel->rmClient(client);
}



/**
 * @brief Constructor of the Invite class
 * 
 * @note Invite a user to a channel
 * @note Protected against not enough parameters
 * @note Protected against invalid channel
 * @note Protected against invalid user
*/
Invite::Invite(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "INVITE");
		sendMsg(args.user, _tmp);
		return;
	}
	Client *client = args.server->getClient(*it);
	if (client == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "INVITE");
		sendMsg(args.user, _tmp);
		return;
	}
	Channel *channel = args.server->getChannel(*it);
	if (channel == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	else if (channel->isClient(args.user) == false)
	{
		sprintf(_tmp, ERR_USERNOTINCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*it).c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	else if (channel->isOperator(args.user) == false)
	{
		sprintf(_tmp, ERR_NOTCHNLOPER, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	channel->invite(client);
	sprintf(_tmp, MSG_INVITE, args.user->getNickname().c_str(), client->getNickname().c_str(), channel->getName().c_str());
	sendMsg(args.user, _tmp);
	sendMsg(client, _tmp);
}


/**
 * @brief Constructor of the Topic class
 * 
 * @note Change the topic of a channel
 * @note Protected against not enough parameters
 * @note Protected against invalid channel
 * @note Protected being Topic restricted
*/
Topic::Topic(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "TOPIC");
		sendMsg(args.user, _tmp);
		return;
	}
	Channel *channel = args.server->getChannel(*it);
	if (channel == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, RPL_TOPIC, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	if (channel->isTopicRestricted())
	{
		if (channel->isOperator(args.user))
			sprintf(_tmp, ERR_CHANOPRIVSNEEDED, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str(), "+t");
		else
			sprintf(_tmp, ERR_TOPICRESTRICTED, "ft_irc", args.user->getNickname().c_str(), channel->getName().c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	std::string topic = "";
	while (it != args.buffer.end())
	{
		topic += *it + " ";
		it++;
	}
	if (topic.size() > 2)
		topic = topic.substr(1, topic.size() - 2);
	channel->setTopic(topic);
	sprintf(_tmp, MSG_TOPIC, args.user->getNickname().c_str(), channel->getName().c_str(), topic.c_str());
	sendMsg(args.user, _tmp);
}



//----------------------------------------------------------------------------------------------------
// QUIT

Quit::Quit(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ":%s QUIT :%s\r\n", args.user->getNickname().c_str(), "Client Quit");
		sendMsg(args.user, _tmp);
		args.server->rmClient(args.user);
		return;
	}
	std::string reason = *it;
	if (it != args.buffer.end())
	{
		if(reason.size() > 1)
			reason = reason.substr(1, reason.size() - 1);
		it++;
		while (it != args.buffer.end())
		{
			reason += " " + *it;
			it++;
		}
	}
	if (reason.find("Moulinette is leaving") != std::string::npos)
	{
		sprintf(_tmp, MSG_NOTICE, "Moulinette", "*", "Moulinette is leaving");
		args.server->broadcast(_tmp);
		args.server->setBot(false);
		return;
	}

	sprintf(_tmp, ":%s QUIT :%s\r\n", args.user->getNickname().c_str(), reason.c_str());
	sendMsg(args.user, _tmp);
}


/**
 * @brief Constructor of the CAP class
 * 
 * @note Send the list of capabilities
*/
CAP::CAP(CommandArgs args)
{
	sprintf(_tmp, CAP_REPLY_2, args.user->getNickname().c_str());
	sendMsg(args.user, _tmp);
}



/**
 * @brief Constructor of the Whois class
 * 
 * @note Send the information of a user
 * @note Protected against not enough parameters
 * @note Protected against invalid user
*/
Whois::Whois(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "WHOIS");
		sendMsg(args.user, _tmp);
		return;
	}
	Client *client = args.server->getClient(*it);
	if (client == NULL)
	{
		sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), (*it).c_str());
		sendMsg(args.user, _tmp);
		return;
	}
	sprintf(_tmp, RPL_WHOISUSER, "ft_irc", args.user->getNickname().c_str(), client->getNickname().c_str(), client->getUsername().c_str(), client->getHost().c_str(), client->getRealname().c_str());
	sendMsg(args.user, _tmp);
	sprintf(_tmp, RPL_WHOISSERVER, "ft_irc", args.user->getNickname().c_str(), client->getNickname().c_str(), "ft_irc", "ft_irc");
	sendMsg(args.user, _tmp);
	std::string channels = "";
	vector::channel chans = args.server->getChannels();
	for (vector::iterator::channel it = chans.begin(); it != chans.end(); it++)
	{
		if ((*it)->isClient(client))
			channels += (*it)->getName() + " ";
	}
	if (channels.size() > 0)
		channels = channels.substr(0, channels.size() - 1);
	sprintf(_tmp, RPL_WHOISCHANNELS, "ft_irc", args.user->getNickname().c_str(), client->getNickname().c_str(), channels.c_str());
	sendMsg(args.user, _tmp);
	sprintf(_tmp, RPL_ENDOFWHOIS, "ft_irc", args.user->getNickname().c_str(), client->getNickname().c_str());
	sendMsg(args.user, _tmp);

}



/**
 * @brief Constructor of the Lusers class
 * 
 * @note Send the number of users
*/
Lusers::Lusers(CommandArgs args)
{
	int operators = 0;
	if (args.server->getBot())
		operators = 1;
	sprintf(_tmp, RPL_LUSERCLIENT, "ft_irc", args.user->getNickname().c_str(), static_cast<int>(args.server->getClients().size()), static_cast<int>(args.server->getClients().size()), 1);
	sendMsg(args.user, _tmp);
	sprintf(_tmp, RPL_LUSEROP, "ft_irc", args.user->getNickname().c_str(), operators);
	sendMsg(args.user, _tmp);
	sprintf(_tmp, RPL_LUSERUNKNOWN, "ft_irc", args.user->getNickname().c_str(), 0);
	sendMsg(args.user, _tmp);
	sprintf(_tmp, RPL_LUSERCHANNELS, "ft_irc", args.user->getNickname().c_str(), static_cast<int>(args.server->getChannels().size()));
	sendMsg(args.user, _tmp);
	sprintf(_tmp, RPL_LUSERME, "ft_irc", args.user->getNickname().c_str(), static_cast<int>(args.server->getClients().size()), 1);
	sendMsg(args.user, _tmp);
}


/**
 * @brief Constructor of the Notice class
 * 
 * @note Send a notice to a user or a channel
 * @note Protected against not enough parameters
 * @note Protected against invalid channel
 * @note Protected against invalid user
*/
Notice::Notice(CommandArgs args)
{
	vector::iterator::string it = args.buffer.begin();
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "NOTICE");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string to = *it;
	it++;
	if (it == args.buffer.end())
	{
		sprintf(_tmp, ERR_NEEDMOREPARAMS, "ft_irc", args.user->getNickname().c_str(), "NOTICE");
		sendMsg(args.user, _tmp);
		return;
	}
	std::string message = *it;
	if (message.size() > 1)
		message = message.substr(1, message.size() - 1);
	it++;
	while (it != args.buffer.end())
	{
		message += " " + *it;
		it++;
	}
	if (to[0] == '#')
	{
		Channel *channel = args.server->getChannel(to);
		if (channel == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHCHANNEL, "ft_irc", args.user->getNickname().c_str(), to.c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		sprintf(_tmp, MSG_NOTICE, args.user->getNickname().c_str(), to.c_str(), message.c_str());
		channel->broadcast(_tmp);
	}
	else
	{
		Client *client = args.server->getClient(to);
		if (client == NULL)
		{
			sprintf(_tmp, ERR_NOSUCHNICK, "ft_irc", args.user->getNickname().c_str(), to.c_str());
			sendMsg(args.user, _tmp);
			return;
		}
		sprintf(_tmp, MSG_NOTICE, args.user->getNickname().c_str(), to.c_str(), message.c_str());
		sendMsg(client, _tmp);
	}
}
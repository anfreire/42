#ifndef SERVER_HPP
# define SERVER_HPP

# include "Headers.hpp"

class Server
{
	bool				_bot;
	Client*				_requestCall;
	std::string			_password;
	vector::client		_clients;
	vector::channel		_channels;

public:
	Server(std::string password);
	~Server() {};
	void				purge();
	void				setBot(bool bot);
	void				adjustOperators();
	void				cleanEmptyChannels();
	void				rmClient(Client *client);
	void				addClient(Client *client);
	void				rmChannel(Channel *channel);
	void				addChannel(Channel *channel);
	void				setRequestCall(Client *client);
	void				findCommand(vector::string str);
	void				broadcast(const std::string &msg);
	bool   				getBot() const;
	bool				isChannelNameAvailable(const std::string &name);
	bool				isNicknameAvailable(const std::string &nickname);
	Client				*getClient(int fd);
	Client				*getRequestCall() const;
	Client				*getClient(const std::string &nickname);
	Channel				*getChannel(const std::string &name);
	vector::client		getClients() const;
	vector::client 		getUsersWithoutChannels();
	vector::channel		getChannels() const;
	const std::string	&getPassword() const;
};

#endif

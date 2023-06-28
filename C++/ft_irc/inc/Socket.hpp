#ifndef SOCKET_HPP
# define SOCKET_HPP

# include "Headers.hpp"

class Socket
{
	int			_port;
	int			_maxSd;
	int			_sockFd;
	int			_activity;
	int			_clientSocket[MAX_CLIENTS];
	Server		*_server;
	fd_set		_readFds;
	sockaddr_in	_addr;
	std::string	_password;
	std::string	_creationTime;

public:
	Socket(int port, std::string password);
	~Socket();
	void	run();
	void	init();
	void	purge();
	void	getCreationTime();
	void	welcomeMessage(Client *user);
	void	parseServerBuffer(bool &flag);
	void	init_cmd(std::string buffer, int sd);
	bool 	addUser(int fd);
	bool 	incomingConnection(const int &addrlen, int &tmp_socket);
	bool	parseClientsBuffer(const int &addrlen, int &sd);
};

#endif

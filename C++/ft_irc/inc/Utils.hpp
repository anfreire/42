#ifndef UTILS_HPP
# define UTILS_HPP

# include "Headers.hpp"

int             check_port(char *arg);
bool	          isCommand(const std::string &buffer);
bool            isChannelNameValid(const std::string &name);
void            sighandler(int signum);
std::string     removeSpaces(std::string str);
std::string     getXWord(std::string str, int x);
std::string	    extractLine(std::string token, std::vector<std::string> buffer);
vector::string  readBuffer(int socketFd);
vector::string	buildVector(std::string str);



#endif

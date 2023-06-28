#include "../inc/Log.hpp"


/**
 * @brief Get the Log object that will be used in all the server functions
 * 
 * @return Log*
*/
Log  *getLog(void)
{
    static Log log("server");
    return &log;
}


/**
 * @brief Construct a new Log:: Log object
 * 
 * @param type: The type of the log file [Server or Bot]
*/
Log::Log(const std::string &type)
{
    time_t now = time(0);
    tm *ltm = localtime(&now);
    std::string date = std::to_string(ltm->tm_mday) + "-" + std::to_string(ltm->tm_mon) +"_" + std::to_string(ltm->tm_hour) + "-" + std::to_string(ltm->tm_min);
    _fileName = type + date + ".log";
    _file.open(_fileName.c_str(), std::ios::app);
    if (!_file.is_open())
        throw std::runtime_error("Error opening log file");
    _file.close();
}


/**
 * @brief Destroy the Log:: Log object
*/
Log::~Log() { }


/**
 * @brief Write a message in the log file
 * 
 * @param message: The message to write
*/
void    Log::writeLog(std::string message)
{
    _file.open(_fileName.c_str(), std::ios::app);
    if (!_file.is_open())
        throw std::runtime_error("Error opening log file");
    _file << message << std::endl;
    _file.close();
}


/**
 * @brief Get the current date
 * 
 * @return std::string: The current date
*/
std::string    Log::getDate(void)
{
    time_t now = time(0);
    tm *ltm = localtime(&now);
    std::stringstream ss;
    ss << "[" << std::to_string(ltm->tm_hour) << ":" << std::to_string(ltm->tm_min) << ":" << std::to_string(ltm->tm_sec) << " - " << std::to_string(ltm->tm_mday) << "/" << std::to_string(ltm->tm_mon) << "] " << std::endl;
    return ss.str();
}


/**
 * @brief Write a command received in the log file
 * 
 * @param message: The command received
 * @param client: The client that sent the command
*/
void    Log::CommandReceived(std::string command, Client *client)
{
    if (command.empty())
        return;
    std::stringstream ss;
    ss << getDate();
    ss << "[Command received" + (client != NULL ? " from " + client->getNickname() + ", socket " + std::to_string(client->getSocket()) : "") << "]" << std::endl;
    ss << command << (command[command.size() - 1] == '\n' ? "" : "\n");
    std::string message = ss.str();
    writeLog(message);
}


/**
 * @brief Write a command received in the log file
 * 
 * @param message: The command received
 * @param client: The client that sent the command
*/
void    Log::CommandReceived(vector::string command, Client *client)
{
    if (command.empty())
        return;
    bool empty = true;
    std::string newCommand;
    for (size_t i = 0; i < command.size(); i++)
    {
        if (command[i].empty())
            continue;
        newCommand += command[i] + "\n";
    }
    if (empty || newCommand.empty())
        return;
    if (newCommand.size() > 0)
        newCommand = newCommand.substr(0, newCommand.size() - 1);
    std::stringstream ss;
    ss << getDate();
    ss << "[Command received" + (client != NULL ? " from " + client->getNickname() + ", socket " + std::to_string(client->getSocket()) : "") << "]" << std::endl;
    ss << newCommand << (newCommand[newCommand.size() - 1] == '\n' ? "" : "\n");
    std::string message = ss.str();
    writeLog(message);
}


/**
 * @brief Write a command sent in the log file
 * 
 * @param message: The command sent
 * @param client: The client that sent the command
*/
void    Log::CommandSent(std::string command, Client *client)
{
    if (command.empty())
        return;
    std::stringstream ss;
    ss << getDate();
    ss << "[Command sent" + (client != NULL ? " to " + client->getNickname() + ", socket " + std::to_string(client->getSocket()) : "") << "]" << std::endl;
    ss << command << (command[command.size() - 1] == '\n' ? "" : "\n");
    std::string message = ss.str();
    writeLog(message);
}

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.cpp                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42lisboa.com    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/05 22:44:55 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/06 02:14:31 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "mylib.hpp"
#include <fstream>
#include <iostream>
#include <string>

#define MAX_LINE_SIZE 4096




std::string  replaceOcurrences(char *oldString, char *newString, std::string lineStr)
{
    std::string newLine;
    std::string oldStringConverted(oldString);
    int index = 0;
    for (int i = 0; i < (int)lineStr.length(); i++)
    {
        index = oldStringConverted.compare((size_t)0, oldStringConverted.length(), &lineStr[i], oldStringConverted.length());
        if (index == 0)
        {
            newLine += newString;
            i += oldStringConverted.length() - 1;
            index = -1;
        }
        else
            newLine += lineStr[i];
    }
    return (newLine);
}

int main(int ac, char **av)
{
    if (ac != 4)
    {
        std::cout << "Wrong number of arguments. Please enter: ./mySed <filename> <old string> <new string>" << std::endl;
        return 1;
    }
    else
    {
        std::ifstream infile;
        infile.open(av[1]);
        if (infile.is_open())
        {
            char            data[MAX_LINE_SIZE];
            int             lines = 0;
            std::string     line;
            while (std::getline(infile, line))
                lines++;
            infile.clear();
            infile.seekg(0, std::ios::beg);
            std::string outfileName = av[1];
            outfileName = outfileName.substr(0, outfileName.find_last_of('.'));
            outfileName += ".replace";
            std::ofstream outfile (outfileName.c_str());
            if (!outfile.is_open())
            {
                std::cout << "Error opening the output file." << std::endl;
                return 1;
            }
            for (int i = 0; i < lines; i++)
            {
                infile.getline(data, MAX_LINE_SIZE);
                std::string newString = replaceOcurrences(av[2], av[3], data);
                outfile << newString << std::endl;
            }
            outfile.close();
            infile.close();
        }
        else
            std::cout << "Error opening the file." << std::endl;
    }
    
            
    
    return 0;
}
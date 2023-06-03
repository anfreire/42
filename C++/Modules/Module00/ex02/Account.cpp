/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Account.cpp                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anfreire <anfreire@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/03/03 01:19:15 by anfreire          #+#    #+#             */
/*   Updated: 2023/03/10 16:12:42 by anfreire         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "Account.hpp"

std::string ft_itoa(int nbr)
{
	std::string	newString;

	if (nbr < 0)
	{
		newString = "-";
		nbr *= -1;
	}
	if (nbr >= 10)
		newString += ft_itoa(nbr / 10);
	newString += (nbr % 10) + '0';
	return newString;
}

int	Account::getNbAccounts(void)
{
	return Account::_totalAmount;
}

int	Account::getTotalAmount(void)
{
	return Account::_totalAmount;
}

int	Account::getNbDeposits(void)
{
	return Account::_totalNbDeposits;
}

int	Account::getNbWithdrawals(void)
{
	return Account::_totalNbWithdrawals;
}

void	Account::displayAccountsInfos(void)
{
	Account::_displayTimestamp();
		std::cout  << " accounts:" << Account::_nbAccounts << ";total:" << Account::_totalAmount << ";deposits:" << Account::_totalNbDeposits << ";withdrawals:" << Account::_totalNbWithdrawals << std::endl;
}

Account::Account(int inital_deposit)
{
	this->_accountIndex = Account::_nbAccounts;
	this->_amount = inital_deposit;
	Account::_displayTimestamp();
		std::cout  << " index:" << this->_accountIndex << ";amount:" << this->_amount << ";created" << std::endl;
	this->_nbDeposits = 0;
	this->_nbWithdrawals = 0;
	Account::_totalAmount += inital_deposit;
	Account::_nbAccounts++;
}

Account::~Account(void)
{
	Account::_displayTimestamp();
		std::cout  << " index:" << this->_accountIndex << ";amount:" << this->_amount << ";closed" << std::endl;
	Account::_totalAmount -= this->_amount;
	Account::_nbAccounts--;
}

void	Account::makeDeposit(int deposit)
{
	this->_amount += deposit;
	this->_nbDeposits++;
	Account::_totalNbDeposits++;
	Account::_totalAmount += deposit;
	Account::_displayTimestamp();
		std::cout  << " index:" << this->_accountIndex << ";p_amount:" << this->_amount - deposit << ";deposit:" << deposit << ";amount:" << this->_amount << ";nb_deposits:" << this->_nbDeposits << std::endl;
}

bool	Account::makeWithdrawal(int withdrawal)
{
	if (withdrawal <= this->_amount)
	{
		this->_amount -= withdrawal;
		this->_nbWithdrawals++;
		Account::_totalNbWithdrawals++;
		Account::_totalAmount -= withdrawal;
		Account::_displayTimestamp();
		std::cout  << " index:" << this->_accountIndex <<  ";p_amount:" << this->_amount + withdrawal << ";withdrawal:" << withdrawal << ";amount:" << this->_amount << ";nb_withdrawals:" << this->_nbWithdrawals << std::endl;  
		return true;	
	}
	else
	{
		Account::_displayTimestamp();
		std::cout  << " index:" << this->_accountIndex << ";p_amount:" << this->_amount << ";withdrawal:refused" << std::endl;
		return false;
	}
}

int	Account::checkAmount(void) const
{
	return this->_amount;
}

void	Account::displayStatus(void) const
{
	Account::_displayTimestamp();
	std::cout  << " index:" << this->_accountIndex << ";amount:" << this->_amount << ";deposits:" << this->_nbDeposits << ";withdrawals:" << this->_nbWithdrawals << std::endl;
}

int	Account::_nbAccounts = 0;
int	Account::_totalAmount = 0;
int	Account::_totalNbWithdrawals = 0;
int	Account::_totalNbDeposits = 0;

void	Account::_displayTimestamp(void)
{
	time_t	t = time(0);
	tm*		now = localtime(&t);
	std::string	year = ft_itoa(now->tm_year + 1900);
	std::string	month = ft_itoa(now->tm_mon + 1);
	if (month.length() == 1)
		month = "0" + month;
	std::string	day = ft_itoa(now->tm_mday);
	if (day.length() == 1)
		day = "0" + day;
	std::string	hour = ft_itoa(now->tm_hour);
	if (hour.length() == 1)
		hour = "0" + hour;
	std::string	minutes = ft_itoa(now->tm_min);
	if (minutes.length() == 1)
		minutes = "0" + minutes;
	std::string	seconds = ft_itoa(now->tm_sec);
	if (seconds.length() == 1)
		seconds = "0" + seconds;
	 std::cout << "[" + year + month + day + "_" + hour + minutes + seconds + "]";
}

Account::Account(void)
{
	Account::_accountIndex = 0;
	Account::_amount = 0;
	Account::_nbDeposits = 0;
	Account::_amount = 0;
}
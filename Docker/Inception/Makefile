# Status Prints
OK=\033[1;32mOK\033[0m:
FAIL=\033[1;31mFAILED\033[0m:
WARN=\033[1;33mWARNING\033[0m:
# Colors
WHITE=\033[1;37m
RED=\033[1;31m
GREEN=\033[1;32m
YELLOW=\033[1;33m
BLUE=\033[1;34m
RESET=\033[0m
# Output
SILENCE_BOTH=2> /dev/null > /dev/null
# Directories
SRC_DIR=/home/anfreire/Inception/srcs
# Colors
RESET=\033[0m

all:
	@clear
	@echo "$(BLUE)Running containers:$(RESET)"
	@docker ps --format '{{.Names}}' $(SILENCE_STDERR)
	@echo
	@echo "$(BLUE)All containers:$(RESET)"
	@docker ps -a --format '{{.Names}}'
	@echo
	@echo "$(BLUE)All Images:$(RESET)"
	@docker images --format '{{.Repository}}:{{.Tag}}'
	@echo
	@echo "$(BLUE)All volumes:$(RESET)"
	@docker volume ls --format '{{.Name}}'
	@echo
	@echo "$(BLUE)All networks:$(RESET)"
	@docker network ls --format '{{.Name}}'
	@echo
	@echo
	@echo -n "$(WHITE)3$(RESET)"
	@sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; 
	@echo -n "$(WHITE)2$(RESET)"
	@sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.';
	@echo -n "$(WHITE)1$(RESET)"
	@sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.'; sleep 0.2; echo -n '.';
	@echo -n "$(WHITE)0$(RESET)"
	@sleep 0.05
	@clear
	@echo "What do you want to do?"
	@echo "1) Build"
	@echo "2) Run"
	@echo "3) Stop"
	@echo "4) Clean"
	@echo "5) Purge"
	@echo
	@read choice; \
	case $$choice in \
		1) make build;; \
		2) make run;; \
		3) make stop;; \
		4) make clean;; \
		5) make purge;; \
		*) echo "$(FAIL) $(WHITE)Invalid option$(RESET)";; \
	esac

build:
	@clear
	@mkdir -p /home/anfreire/data/wordpress /home/anfreire/data/mariadb
	@docker-compose -f $(SRC_DIR)/docker-compose.yaml --env-file $(SRC_DIR)/.env build --no-cache
	@echo "$(OK) $(WHITE)All images built$(RESET)"
	@echo

run:
	@clear
	@echo
	@mkdir -p /home/anfreire/data/wordpress /home/anfreire/data/mariadb
	@docker-compose -f $(SRC_DIR)/docker-compose.yaml --env-file $(SRC_DIR)/.env up -d
	@echo "$(OK) $(WHITE)All containers up$(RESET)"
	@echo

stop:
	@clear
	@echo
	@docker-compose -f $(SRC_DIR)/docker-compose.yaml --env-file $(SRC_DIR)/.env down
	@echo "$(OK) $(WHITE)All containers down$(RESET)"
	@echo

clean:
	@clear
	@echo
	@sudo rm -rf /home/anfreire/data
	@-docker system prune --all --force $(SILENCE_BOTH)
	@echo "$(OK) $(WHITE)All stopped containers removed$(RESET)"
	@echo "$(OK) $(WHITE)All unused networks removed$(RESET)"
	@echo "$(OK) $(WHITE)All unused images removed$(RESET)"
	@echo "$(OK) $(WHITE)Cache removed$(RESET)"
	@echo

purge:
	@clear
	@sudo rm -rf /home/anfreire/data
	@echo
	@-if [ $$(docker ps -q | wc -l) -gt 0 ]; then \
		docker stop $$(docker ps -q) $(SILENCE_BOTH); \
		echo "$(OK) $(WHITE)All containers stopped$(RESET)"; \
	fi
	-@docker system prune --all --force $(SILENCE_BOTH)
	@-if [ $$(docker ps -a -q | wc -l) -gt 0 ]; then \
		docker rm $$(docker ps -a -q) $(SILENCE_BOTH); \
	fi
	@echo "$(OK) $(WHITE)All containers removed$(RESET)"
	@-if [ $$(docker images -q | wc -l) -gt 0 ]; then \
		docker rmi $$(docker images -q) $(SILENCE_BOTH); \
	fi
	@echo "$(OK) $(WHITE)All images removed$(RESET)"
	-@docker volume prune --force $(SILENCE_BOTH)
	@echo "$(OK) $(WHITE)All volumes removed$(RESET)"
	-@docker network prune --force $(SILENCE_BOTH)
	@echo "$(OK) $(WHITE)All networks removed$(RESET)"
	-@docker builder prune --force $(SILENCE_BOTH)
	@echo "$(OK) $(WHITE)Cache removed$(RESET)"
	@echo

re: stop purge build run

.PHONY: all build run stop clean purge re
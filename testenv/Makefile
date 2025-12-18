CC = gcc
CFLAGS = -Wall -Wextra -std=c11

all: clean assertions runtests

BOARD_OBJS = $(BOARD_SRCS:.c=.o)

assertions: clean $(BOARD_OBJS) assertions.c
	$(CC) $(CFLAGS) assertions.c $(BOARD_OBJS) -o assertions

%.o: %.c %.h
	$(CC) $(CFLAGS) -c $< -o $@

runtests: assertions
	./assertions

clean:
	rm -f main.o format.o assertions.o assertions board.o
	rm -f visual/main.o visual/format.o

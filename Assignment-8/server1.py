

#Library imports
import time
import zmq

context = zmq.Context() #creating context object
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555") #binding socket to port 5555

while True:
    # Wait for request from client
    message = socket.recv()
    print("Recieved request for  :", message)

    time.sleep(1)
    words = message.split()

    socket.send(words[2]) #sending message to client

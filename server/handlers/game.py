# encoding: utf-8
"""
游戏服务器
@author Yuriseus
@create 2017-12-19 13:49
"""
from protopy.user_pb2 import *
import tornado.websocket


class GameHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True
    
    def open(self):
        pass
    
    def on_message(self, message):
        # msg = message.decode()
        user = User()
        user.ParseFromString(message)
        print("receive:" + user.username)
        self.write_message(user.SerializeToString(), True)
    
    def on_close(self):
        pass

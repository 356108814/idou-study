# encoding: utf-8
import json
from .base import BaseHandler


class LoginHandler(BaseHandler):
    def get(self):
        username = self.get_argument("username")
        password = self.get_argument("password")
        self.write_response(username)
        
    def post(self):
        param = json.loads(self.request.body.decode('utf-8'))
        self.write_response(param)

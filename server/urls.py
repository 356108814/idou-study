# encoding: utf-8
"""
url路由配置
@author Yuriseus
@create 2016-8-3 14:36
"""
from tornado.web import StaticFileHandler

import settings
from handlers.index import IndexHandler
from handlers.login import LoginHandler
from handlers.game import GameHandler

handlers = [
    (r'/?', GameHandler),
    (r'/login/?', LoginHandler),
    (r'/game/?', GameHandler),
    (r"/(favicon\.ico)", StaticFileHandler, dict(path=settings.STATIC_PATH)),
]
